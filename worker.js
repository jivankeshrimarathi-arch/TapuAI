
const DAILY_LIMIT = 30; // प्रत्येक user ला दिवसाला किती मेसेज (IP आधारित)
const MAX_TOKENS = 1000;

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(env) });
    }

    if (request.method !== "POST") {
      return json({ error: "Only POST allowed" }, 405, env);
    }

    // --- Rate limiting (per IP, per day) ---
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const today = new Date().toISOString().slice(0, 10);
    const limitKey = `limit:${ip}:${today}`;

    if (env.TAPUAI_LIMITS) {
      const used = parseInt((await env.TAPUAI_LIMITS.get(limitKey)) || "0", 10);
      if (used >= DAILY_LIMIT) {
        return json(
          { error: `आजची मोफत मर्यादा (${DAILY_LIMIT} मेसेज) संपली. उद्या पुन्हा प्रयत्न करा.` },
          429,
          env
        );
      }
      await env.TAPUAI_LIMITS.put(limitKey, String(used + 1), { expirationTtl: 60 * 60 * 26 });
    }

    // --- Parse request from TapuAI frontend ---
    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400, env);
    }

    const { messages, system, useSearch } = payload;
    if (!Array.isArray(messages)) {
      return json({ error: "messages array required" }, 400, env);
    }

    const body = {
      model: "claude-sonnet-4-6",
      max_tokens: MAX_TOKENS,
      system: system || "You are TapuAI, a helpful trilingual assistant.",
      messages,
    };
    if (useSearch) {
      // max_uses lets Claude run several searches in one turn if the question needs it
      body.tools = [{ type: "web_search_20250305", name: "web_search", max_uses: 5 }];
    }

    // --- Call Anthropic with the server-side secret key ---
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      return json({ error: data.error?.message || "Upstream error" }, upstream.status, env);
    }

    const text = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n\n");

    const sources = extractSources(data.content || []);

    return json({ reply: text, sources }, 200, env);
  },
};

// Pulls unique {title, url} source links out of Claude's web-search citations
function extractSources(blocks) {
  const seen = new Map();
  for (const block of blocks) {
    if (block.type === "text" && Array.isArray(block.citations)) {
      for (const c of block.citations) {
        if (c.url && !seen.has(c.url)) {
          seen.set(c.url, { title: c.title || c.url, url: c.url });
        }
      }
    }
    if (block.type === "web_search_tool_result" && Array.isArray(block.content)) {
      for (const r of block.content) {
        if (r.url && !seen.has(r.url)) {
          seen.set(r.url, { title: r.title || r.url, url: r.url });
        }
      }
    }
  }
  return Array.from(seen.values()).slice(0, 6);
}

function corsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(obj, status, env) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(env) },
  });
}
