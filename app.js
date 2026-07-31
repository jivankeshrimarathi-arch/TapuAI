/* TapuAI — by Prasad Technology Pvt Ltd
   Static PWA chat client. Brings its own API key (Anthropic or OpenAI-compatible),
   OR — if you deploy the included Cloudflare Worker — users need NO key at all.
*/

// Paste your deployed Cloudflare Worker URL here (see worker/worker.js).
// Example: "https://tapuai.yourname.workers.dev"
// Leave empty ("") to keep the manual "bring your own key" flow.
const WORKER_ENDPOINT = "";

// ---------------- i18n ----------------
const I18N = {
  mr: {
    newChat: "नवीन संभाषण",
    settings: "सेटिंग्स",
    madeBy: "निर्माता",
    heroSub: "मराठी, हिंदी किंवा इंग्रजी — तुम्हाला हवं त्या भाषेत बोला. मी ऐकतोय.",
    webSearch: "वेब शोध",
    searchOn: "वेब शोध सुरू",
    searchOff: "वेब शोध बंद",
    placeholder: "TapuAI ला काहीही विचारा…",
    composerHint: "TapuAI चुका करू शकतो. महत्त्वाची माहिती नेहमी पडताळून पहा.",
    settingsTitle: "सेटिंग्स",
    providerLabel: "AI Provider",
    apiKeyLabel: "API Key",
    keyNote: "Key ऐच्छिक आहे. Key न टाकल्यास TapuAI मोफत Wikipedia शोधाद्वारे उत्तर देईल. जास्त हुशार, संभाषणात्मक उत्तरं हवी असतील तरच इथे स्वतःची Anthropic/OpenAI key टाका — ती फक्त तुमच्या ब्राउझरमध्ये (localStorage) साठवली जाते.",
    save: "जतन करा",
    greetCycle: ["नमस्कार, मी TapuAI!", "बोला, काय मदत करू?", "आजचा दिवस कसा आहे?"],
    suggestions: [
      "मराठीत एक छोटी कविता लिहून दे",
      "Kumbh Mela 2027 बद्दल थोडक्यात सांग",
      "C++ मधलं implicit type conversion समजाव",
      "आजची महत्त्वाची बातमी शोधून सांग"
    ],
    needKey: "आधी सेटिंग्समध्ये जाऊन तुमची API key टाका.",
    thinking: "विचार करतोय…",
    errorPrefix: "काहीतरी चूक झाली",
    you: "तुम्ही",
    searching: "वेबवर शोधतोय…",
    proxyNote: "TapuAI इथे मोफत सर्व्हरमार्फत चालतंय — तुम्हाला कुठलीही API key टाकायची गरज नाही. गैरवापर टाळण्यासाठी दिवसाला मेसेजची एक मर्यादा आहे.",
    noFreeResult: "यावर मला Wikipedia वर काही सापडलं नाही. जरा वेगळ्या शब्दांत विचारून बघा, किंवा खालच्या Google link वर तपासा.",
    freeModeBadge: "मोफत Wikipedia शोध (key नाही)"
  },
  hi: {
    newChat: "नई बातचीत",
    settings: "सेटिंग्स",
    madeBy: "निर्माता",
    heroSub: "मराठी, हिंदी या अंग्रेज़ी — जिस भाषा में चाहें बोलें। मैं सुन रहा हूँ।",
    webSearch: "वेब सर्च",
    searchOn: "वेब सर्च चालू",
    searchOff: "वेब सर्च बंद",
    placeholder: "TapuAI से कुछ भी पूछें…",
    composerHint: "TapuAI गलतियाँ कर सकता है। ज़रूरी जानकारी हमेशा जांच लें।",
    settingsTitle: "सेटिंग्स",
    providerLabel: "AI Provider",
    apiKeyLabel: "API Key",
    keyNote: "Key वैकल्पिक है। बिना key के TapuAI मुफ़्त Wikipedia खोज से जवाब देगा। ज़्यादा समझदार, बातचीत जैसे जवाब चाहिए तो ही यहां अपनी Anthropic/OpenAI key डालें — यह सिर्फ़ आपके ब्राउज़र (localStorage) में सेव होती है।",
    save: "सेव करें",
    greetCycle: ["नमस्ते, मैं TapuAI हूँ!", "बोलिए, क्या मदद करूं?", "आज का दिन कैसा है?"],
    suggestions: [
      "हिंदी में एक छोटी कविता लिखो",
      "Kumbh Mela 2027 के बारे में बताओ",
      "C++ में implicit type conversion समझाओ",
      "आज की बड़ी खबर खोज कर बताओ"
    ],
    needKey: "पहले सेटिंग्स में जाकर अपनी API key डालें।",
    thinking: "सोच रहा हूँ…",
    errorPrefix: "कुछ गड़बड़ हुई",
    you: "आप",
    searching: "वेब पर खोज रहा हूँ…",
    proxyNote: "TapuAI यहां एक मुफ़्त सर्वर के ज़रिए चल रहा है — आपको कोई API key डालने की ज़रूरत नहीं। दुरुपयोग रोकने के लिए रोज़ाना एक संदेश सीमा है।",
    noFreeResult: "इस पर मुझे Wikipedia पर कुछ नहीं मिला। कृपया अलग शब्दों में पूछें, या नीचे दिए Google link पर देखें।",
    freeModeBadge: "मुफ़्त Wikipedia खोज (key नहीं)"
  },
  en: {
    newChat: "New chat",
    settings: "Settings",
    madeBy: "Made by",
    heroSub: "Marathi, Hindi, or English — speak whichever you like. I'm listening.",
    webSearch: "Web search",
    searchOn: "Web search on",
    searchOff: "Web search off",
    placeholder: "Ask TapuAI anything…",
    composerHint: "TapuAI can make mistakes. Please double-check important info.",
    settingsTitle: "Settings",
    providerLabel: "AI Provider",
    apiKeyLabel: "API Key",
    keyNote: "The key is optional. Without one, TapuAI answers using free Wikipedia search. Only add your own Anthropic/OpenAI key here if you want smarter, conversational answers — it's stored only in your browser (localStorage).",
    save: "Save",
    greetCycle: ["Hi, I'm TapuAI!", "What can I help with?", "How's your day going?"],
    suggestions: [
      "Write a short poem in English",
      "Tell me briefly about Kumbh Mela 2027",
      "Explain implicit type conversion in C++",
      "Search the web for today's top news"
    ],
    needKey: "Add your API key in Settings first.",
    thinking: "Thinking…",
    errorPrefix: "Something went wrong",
    you: "You",
    searching: "Searching the web…",
    proxyNote: "TapuAI is running through a free shared server here — you don't need to add any API key. There's a daily message limit per person to prevent abuse.",
    noFreeResult: "I couldn't find anything on Wikipedia for that. Try different words, or check the Google link below.",
    freeModeBadge: "Free Wikipedia search (no key)"
  }
};

let lang = localStorage.getItem("tapuai_lang") || "mr";

function t(key){ return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key; }

function updateModeUI(){
  const settings = currentSettings();
  const usingWorker = !!WORKER_ENDPOINT;
  const usingAiKey = !usingWorker && settings.key;
  const badge = document.getElementById("searchState");
  const toggle = els.webSearchToggle;
  if (usingWorker || usingAiKey){
    badge.textContent = webSearchOn ? t("searchOn") : t("searchOff");
    toggle.style.display = "";
    toggle.disabled = false;
  } else {
    badge.textContent = t("freeModeBadge");
    toggle.style.display = "none"; // free mode always searches — toggle is redundant
  }
}

function applyI18n(){
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.getElementById("searchState").textContent = webSearchOn ? t("searchOn") : t("searchOff");
  updateModeUI();
  renderSuggestions();
  cycleGreeting(true);
}

// ---------------- State ----------------
let conversations = JSON.parse(localStorage.getItem("tapuai_convs") || "[]");
let activeId = null;
let webSearchOn = true;
let sending = false;

const els = {
  sidebar: document.getElementById("sidebar"),
  sidebarOverlay: document.getElementById("sidebarOverlay"),
  menuBtn: document.getElementById("menuBtn"),
  sidebarClose: document.getElementById("sidebarClose"),
  convList: document.getElementById("convList"),
  newChatBtn: document.getElementById("newChatBtn"),
  messages: document.getElementById("messages"),
  emptyState: document.getElementById("emptyState"),
  chatArea: document.getElementById("chatArea"),
  form: document.getElementById("composerForm"),
  input: document.getElementById("promptInput"),
  sendBtn: document.getElementById("sendBtn"),
  webSearchToggle: document.getElementById("webSearchToggle"),
  langSwitch: document.getElementById("langSwitch"),
  heroGreet: document.getElementById("heroGreet"),
  suggestionGrid: document.getElementById("suggestionGrid"),
  settingsOverlay: document.getElementById("settingsOverlay"),
  openSettings: document.getElementById("openSettings"),
  closeSettings: document.getElementById("closeSettings"),
  saveSettings: document.getElementById("saveSettings"),
  providerSelect: document.getElementById("providerSelect"),
  apiKeyInput: document.getElementById("apiKeyInput"),
  openaiExtra: document.getElementById("openaiExtra"),
  baseUrlInput: document.getElementById("baseUrlInput"),
  modelInput: document.getElementById("modelInput"),
};

// ---------------- Conversations ----------------
function saveConvs(){
  localStorage.setItem("tapuai_convs", JSON.stringify(conversations));
}

function newConversation(){
  const conv = { id: "c" + Date.now(), title: null, messages: [] };
  conversations.unshift(conv);
  activeId = conv.id;
  saveConvs();
  renderConvList();
  renderMessages();
}

function getActive(){
  return conversations.find(c => c.id === activeId);
}

function renderConvList(){
  els.convList.innerHTML = "";
  conversations.forEach(c=>{
    const item = document.createElement("div");
    item.className = "conv-item" + (c.id === activeId ? " active" : "");
    item.setAttribute("role","listitem");
    const title = document.createElement("span");
    title.className = "conv-title";
    title.textContent = c.title || t("newChat");
    const del = document.createElement("button");
    del.className = "conv-del";
    del.textContent = "✕";
    del.setAttribute("aria-label","Delete");
    del.onclick = (e)=>{
      e.stopPropagation();
      conversations = conversations.filter(x=>x.id !== c.id);
      if (activeId === c.id){
        activeId = conversations[0] ? conversations[0].id : null;
        if (!activeId) newConversation(); else renderMessages();
      }
      saveConvs();
      renderConvList();
    };
    item.onclick = ()=>{ activeId = c.id; renderConvList(); renderMessages(); closeSidebarMobile(); };
    item.append(title, del);
    els.convList.appendChild(item);
  });
}

// ---------------- Rendering ----------------
function escapeHtml(str){
  return str.replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
}

// very small markdown-ish renderer: code blocks, inline code, bold, paragraphs
function renderMarkdown(text){
  let escaped = escapeHtml(text);
  escaped = escaped.replace(/```([\s\S]*?)```/g, (m, code)=>`<pre><code>${code.trim()}</code></pre>`);
  escaped = escaped.replace(/`([^`]+)`/g, "<code>$1</code>");
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  const paras = escaped.split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g,"<br>")}</p>`).join("");
  return paras;
}

function renderMessages(){
  const conv = getActive();
  els.messages.innerHTML = "";
  if (!conv || conv.messages.length === 0){
    els.emptyState.style.display = "block";
    return;
  }
  els.emptyState.style.display = "none";
  conv.messages.forEach(m=>{
    els.messages.appendChild(buildMsgEl(m));
  });
  els.chatArea.scrollTop = els.chatArea.scrollHeight;
}

function buildMsgEl(m){
  const wrap = document.createElement("div");
  wrap.className = "msg " + m.role + (m.error ? " error" : "");
  const av = document.createElement("div");
  av.className = "msg-avatar";
  av.textContent = m.role === "user" ? "T" : "🪔";
  const body = document.createElement("div");
  body.className = "msg-body";
  const roleLbl = document.createElement("div");
  roleLbl.className = "msg-role";
  roleLbl.textContent = m.role === "user" ? t("you") : "TapuAI";
  const content = document.createElement("div");
  content.className = "msg-content";
  if (m.usedSearch){
    const chip = document.createElement("div");
    chip.className = "search-chip";
    chip.textContent = "🔎 " + t("searchOn");
    content.appendChild(chip);
  }
  const textDiv = document.createElement("div");
  textDiv.innerHTML = renderMarkdown(m.content || "");
  content.appendChild(textDiv);
  if (m.sources && m.sources.length){
    const srcWrap = document.createElement("div");
    srcWrap.className = "sources-wrap";
    m.sources.forEach(s=>{
      const a = document.createElement("a");
      a.className = "source-chip";
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      let host = s.url;
      try { host = new URL(s.url).hostname.replace(/^www\./,""); } catch(e){}
      a.textContent = "🔗 " + host;
      a.title = s.title || s.url;
      srcWrap.appendChild(a);
    });
    content.appendChild(srcWrap);
  }
  body.append(roleLbl, content);
  wrap.append(av, body);
  return wrap;
}

function renderSuggestions(){
  els.suggestionGrid.innerHTML = "";
  t("suggestions").forEach(s=>{
    const card = document.createElement("button");
    card.type = "button";
    card.className = "suggestion-card";
    card.textContent = s;
    card.onclick = ()=>{ els.input.value = s; els.input.focus(); autoResize(); };
    els.suggestionGrid.appendChild(card);
  });
}

let greetTimer = null;
function cycleGreeting(reset){
  const list = t("greetCycle");
  if (reset && greetTimer) { clearInterval(greetTimer); greetTimer = null; }
  let i = 0;
  els.heroGreet.textContent = list[0];
  if (greetTimer) clearInterval(greetTimer);
  greetTimer = setInterval(()=>{
    i = (i + 1) % list.length;
    els.heroGreet.style.opacity = 0;
    setTimeout(()=>{ els.heroGreet.textContent = list[i]; els.heroGreet.style.opacity = 1; }, 220);
  }, 3200);
  els.heroGreet.style.transition = "opacity .22s ease";
}

// ---------------- Sidebar (mobile) ----------------
function openSidebarMobile(){
  els.sidebar.classList.add("open");
  els.sidebarOverlay.classList.add("open");
}
function closeSidebarMobile(){
  els.sidebar.classList.remove("open");
  els.sidebarOverlay.classList.remove("open");
}

// ---------------- Settings ----------------
function loadSettings(){
  const manualFields = document.getElementById("manualKeyFields");
  const proxyNote = document.getElementById("proxyModeNote");
  if (WORKER_ENDPOINT){
    if (manualFields) manualFields.classList.add("hidden");
    if (proxyNote) proxyNote.classList.remove("hidden");
    return;
  } else {
    if (manualFields) manualFields.classList.remove("hidden");
    if (proxyNote) proxyNote.classList.add("hidden");
  }
  const provider = localStorage.getItem("tapuai_provider") || "anthropic";
  const key = localStorage.getItem("tapuai_key") || "";
  const baseUrl = localStorage.getItem("tapuai_baseurl") || "https://api.openai.com/v1";
  const model = localStorage.getItem("tapuai_model") || "gpt-4o-mini";
  els.providerSelect.value = provider;
  els.apiKeyInput.value = key;
  els.baseUrlInput.value = baseUrl;
  els.modelInput.value = model;
  els.openaiExtra.classList.toggle("hidden", provider !== "openai");
}

function currentSettings(){
  return {
    provider: localStorage.getItem("tapuai_provider") || "anthropic",
    key: localStorage.getItem("tapuai_key") || "",
    baseUrl: localStorage.getItem("tapuai_baseurl") || "https://api.openai.com/v1",
    model: localStorage.getItem("tapuai_model") || "gpt-4o-mini",
  };
}

// ---------------- API calls ----------------
function systemPrompt(){
  const langName = { mr: "Marathi", hi: "Hindi", en: "English" }[lang];
  return `You are TapuAI, a friendly trilingual AI assistant built by Prasad Technology Pvt Ltd. ` +
    `Reply primarily in ${langName} unless the user writes in a different language, in which case follow their language. ` +
    `You can mix in Hinglish/Marathi-English naturally the way locals do, matching the user's tone. Keep answers clear and helpful. ` +
    `You are aware of events and information up to 2026.`;
}

async function callAnthropic(messages, key, useSearch){
  const body = {
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    system: systemPrompt(),
    messages: messages.map(m=>({role: m.role, content: m.content})),
  };
  if (useSearch){
    body.tools = [{ type: "web_search_20250305", name: "web_search", max_uses: 5 }];
  }
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify(body)
  });
  if (!res.ok){
    const errText = await res.text();
    throw new Error(`(${res.status}) ${errText.slice(0,300)}`);
  }
  const data = await res.json();
  const textParts = (data.content || []).filter(b=>b.type === "text").map(b=>b.text);
  const sources = extractSources(data.content || []);
  return { text: textParts.join("\n\n"), sources };
}

function extractSources(blocks){
  const seen = new Map();
  for (const block of blocks){
    if (block.type === "text" && Array.isArray(block.citations)){
      for (const c of block.citations){
        if (c.url && !seen.has(c.url)) seen.set(c.url, { title: c.title || c.url, url: c.url });
      }
    }
    if (block.type === "web_search_tool_result" && Array.isArray(block.content)){
      for (const r of block.content){
        if (r.url && !seen.has(r.url)) seen.set(r.url, { title: r.title || r.url, url: r.url });
      }
    }
  }
  return Array.from(seen.values()).slice(0, 6);
}

async function callViaWorker(messages, useSearch){
  const res = await fetch(WORKER_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: messages.map(m=>({role: m.role, content: m.content})),
      system: systemPrompt(),
      useSearch
    })
  });
  const data = await res.json();
  if (!res.ok){
    throw new Error(data.error || `(${res.status}) request failed`);
  }
  return { text: data.reply || "", sources: data.sources || [] };
}

// ---------------- Free, keyless web search (no API key needed) ----------------
// Uses Wikipedia's public search API (free, no key, CORS-enabled via origin=*).
// This is the default mode when the user hasn't added any AI key / worker.
function wikiHost(){
  return { mr: "mr.wikipedia.org", hi: "hi.wikipedia.org", en: "en.wikipedia.org" }[lang] || "en.wikipedia.org";
}

async function performFreeSearch(query){
  const host = wikiHost();
  const searchUrl = `https://${host}/w/api.php?action=query&format=json&origin=*&list=search&srlimit=3&srsearch=${encodeURIComponent(query)}`;
  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();
  const results = searchData?.query?.search || [];

  if (results.length === 0){
    const gUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    return {
      text: t("noFreeResult"),
      sources: [{ title: "Google Search", url: gUrl }]
    };
  }

  const top = results[0];
  const extractUrl = `https://${host}/w/api.php?action=query&format=json&origin=*&prop=extracts&exintro=true&explaintext=true&pageids=${top.pageid}`;
  const extractRes = await fetch(extractUrl);
  const extractData = await extractRes.json();
  const page = extractData?.query?.pages?.[top.pageid];
  let extract = (page?.extract || "").trim();
  if (extract.length > 1200) extract = extract.slice(0, 1200).trim() + "…";
  if (!extract) extract = (top.snippet || "").replace(/<[^>]+>/g, "");

  const sources = results.slice(0, 3).map(r => ({
    title: r.title,
    url: `https://${host}/wiki/${encodeURIComponent(r.title.replace(/ /g, "_"))}`
  }));

  return { text: extract || t("noFreeResult"), sources };
}

async function callOpenAICompatible(messages, key, baseUrl, model){
  const res = await fetch(`${baseUrl.replace(/\/$/,"")}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: "system", content: systemPrompt() }, ...messages.map(m=>({role:m.role, content:m.content}))],
      max_tokens: 1500
    })
  });
  if (!res.ok){
    const errText = await res.text();
    throw new Error(`(${res.status}) ${errText.slice(0,300)}`);
  }
  const data = await res.json();
  return { text: data.choices?.[0]?.message?.content || "", sources: [] };
}

// ---------------- Send flow ----------------
async function handleSend(e){
  e.preventDefault();
  if (sending) return;
  const text = els.input.value.trim();
  if (!text) return;

  const settings = currentSettings();
  const usingWorker = !!WORKER_ENDPOINT;
  const usingAiKey = !usingWorker && settings.key;

  let conv = getActive();
  if (!conv){ newConversation(); conv = getActive(); }
  if (!conv.title) conv.title = text.slice(0, 40);

  conv.messages.push({ role: "user", content: text });
  saveConvs();
  renderConvList();
  renderMessages();
  els.input.value = "";
  autoResize();

  // typing indicator
  sending = true;
  els.sendBtn.disabled = true;
  const typingEl = document.createElement("div");
  typingEl.className = "msg assistant";
  typingEl.innerHTML = `<div class="msg-avatar">🪔</div><div class="msg-body"><div class="msg-role">TapuAI</div><div class="msg-content"><span class="typing-dots"><span></span><span></span><span></span></span></div></div>`;
  els.messages.appendChild(typingEl);
  els.chatArea.scrollTop = els.chatArea.scrollHeight;

  try{
    let result;
    let usedSearch = false;
    if (usingWorker){
      result = await callViaWorker(conv.messages, webSearchOn);
      usedSearch = webSearchOn;
    } else if (usingAiKey && settings.provider === "anthropic"){
      result = await callAnthropic(conv.messages, settings.key, webSearchOn);
      usedSearch = webSearchOn;
    } else if (usingAiKey){
      result = await callOpenAICompatible(conv.messages, settings.key, settings.baseUrl, settings.model);
    } else {
      result = await performFreeSearch(text);
      usedSearch = true;
    }
    conv.messages.push({ role: "assistant", content: result.text || "…", usedSearch, sources: result.sources || [] });
  } catch(err){
    conv.messages.push({ role: "assistant", content: `${t("errorPrefix")}: ${err.message}`, error: true });
  }

  saveConvs();
  renderConvList();
  renderMessages();
  sending = false;
  els.sendBtn.disabled = false;
}

function autoResize(){
  els.input.style.height = "auto";
  els.input.style.height = Math.min(els.input.scrollHeight, 160) + "px";
}

// ---------------- Event wiring ----------------
els.form.addEventListener("submit", handleSend);
els.input.addEventListener("input", autoResize);
els.input.addEventListener("keydown", (e)=>{
  if (e.key === "Enter" && !e.shiftKey){
    e.preventDefault();
    els.form.requestSubmit();
  }
});

els.newChatBtn.addEventListener("click", ()=>{ newConversation(); closeSidebarMobile(); });
els.menuBtn.addEventListener("click", openSidebarMobile);
els.sidebarClose.addEventListener("click", closeSidebarMobile);
els.sidebarOverlay.addEventListener("click", closeSidebarMobile);

els.webSearchToggle.addEventListener("click", ()=>{
  webSearchOn = !webSearchOn;
  els.webSearchToggle.setAttribute("aria-pressed", String(webSearchOn));
  document.getElementById("searchState").textContent = webSearchOn ? t("searchOn") : t("searchOff");
});

els.langSwitch.addEventListener("click", (e)=>{
  const btn = e.target.closest(".lang-btn");
  if (!btn) return;
  lang = btn.dataset.lang;
  localStorage.setItem("tapuai_lang", lang);
  document.querySelectorAll(".lang-btn").forEach(b=>{
    b.classList.toggle("active", b === btn);
    b.setAttribute("aria-selected", String(b === btn));
  });
  applyI18n();
  renderConvList();
});

els.openSettings.addEventListener("click", ()=>{ loadSettings(); els.settingsOverlay.classList.add("open"); });
els.closeSettings.addEventListener("click", ()=> els.settingsOverlay.classList.remove("open"));
els.settingsOverlay.addEventListener("click", (e)=>{ if (e.target === els.settingsOverlay) els.settingsOverlay.classList.remove("open"); });

els.providerSelect.addEventListener("change", ()=>{
  els.openaiExtra.classList.toggle("hidden", els.providerSelect.value !== "openai");
});

els.saveSettings.addEventListener("click", ()=>{
  localStorage.setItem("tapuai_provider", els.providerSelect.value);
  localStorage.setItem("tapuai_key", els.apiKeyInput.value.trim());
  localStorage.setItem("tapuai_baseurl", els.baseUrlInput.value.trim());
  localStorage.setItem("tapuai_model", els.modelInput.value.trim());
  els.settingsOverlay.classList.remove("open");
  updateModeUI();
});

// ---------------- Init ----------------
function init(){
  els.webSearchToggle.setAttribute("aria-pressed", String(webSearchOn));
  document.querySelectorAll(".lang-btn").forEach(b=>{
    const active = b.dataset.lang === lang;
    b.classList.toggle("active", active);
    b.setAttribute("aria-selected", String(active));
  });
  applyI18n();
  loadSettings();

  if (conversations.length === 0){
    newConversation();
  } else {
    activeId = conversations[0].id;
    renderConvList();
    renderMessages();
  }

  if ("serviceWorker" in navigator){
    window.addEventListener("load", ()=>{
      navigator.serviceWorker.register("sw.js").catch(()=>{});
    });
  }
}

init();
