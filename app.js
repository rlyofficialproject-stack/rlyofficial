const SUPABASE_URL = 'https://' + 'mikqaarjhtdtvmrvntau' + '.supabase.co';
const SUPABASE_KEY = 'sb_publishable_fc9vD9qiZyJ_AQhEUZpo-g_oNbhaOLE';
const RLY_CASHFREE_URL = 'https://payments.' + 'cashfree.com' + '/forms?code=lyomnimart';
const rlyDB = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const RLY_DEPARTMENTS = [
  { id: 1, icon: '🌅', name: 'सुबह की शुरुआत व डेयरी', sub: 'दूध, दही, मक्खन, चाय, ब्रेड', kw: /दूध|दही|मक्खन|पनीर|ब्रेड|चाय|कॉफ़ी|शहद|ओट्स|डेयरी|milk|tea|amul/i },
  { id: 2, icon: '🪥', name: 'बाथरूम व ओरल केयर', sub: 'साबुन, टूथपेस्ट, शैम्पू, रेज़र', kw: /साबुन|टूथपेस्ट|ब्रश|शैम्पू|फेस|शेविंग|तौलिया|soap|lux|dove|colgate/i },
  { id: 3, icon: '🌾', name: 'राशन, आटा व चावल', sub: 'बासमती चावल, आटा, दाल, चीनी, मेवे', kw: /चावल|बासमती|आटा|दाल|चीनी|नमक|गेहूं|मेवे|राशन|rice|atta|dal/i },
  { id: 4, icon: '🛢️', name: 'खाद्य तेल व शुद्ध घी', sub: 'सरसों तेल, रिफ़ाइंड, देसी घी', kw: /तेल|सरसों|घी|रिफ़ाइंड|oil|ghee|fortune/i },
  { id: 5, icon: '🌶️', name: 'मसाले, अचार व सॉस', sub: 'हल्दी, मिर्च, गरम मसाला, मैगी, सॉस', kw: /मसाला|हल्दी|मिर्च|धनिया|अचार|सॉस|मैगी|पापड़|spice|masala/i },
  { id: 6, icon: '🍪', name: 'बिस्किट, नमकीन व मिठाई', sub: 'बिस्किट, चिप्स, चॉकलेट, मिठाई', kw: /बिस्किट|नमकीन|चिप्स|चॉकलेट|मिठाई|नाश्ता|biscuit|parle|haldiram/i },
  { id: 7, icon: '🥤', name: 'कोल्ड ड्रिंक्स व जूस', sub: 'जूस, एनर्जी ड्रिंक, शरबत, पानी', kw: /जूस|कोल्ड|ड्रिंक|शरबत|पानी|juice|drink|pepsi|real/i },
  { id: 8, icon: '🧼', name: 'घर की सफ़ाई व डिटर्जेंट', sub: 'सर्फ़, बर्तन लिक्विड, फ़िनाइल, झाड़ू', kw: /सर्फ़|डिटर्जेंट|फ़िनाइल|क्लीनर|झाड़ू|vim|surf|harpic/i },
  { id: 9, icon: '🍳', name: 'बर्तन व रसोई उपकरण', sub: 'स्टील-तांबा बर्तन, कुकर, चूल्हा, थर्मस', kw: /बर्तन|कुकर|चूल्हा|थर्मस|तवा|डिनर|जार|जग|steel|cooker|prestige/i },
  { id: 10, icon: '👔', name: 'पुरुषों के वस्त्र (Men)', sub: 'शर्ट, टी-शर्ट, जींस, पैंट, कुर्ता', kw: /शर्ट|टी-शर्ट|जींस|पैंट|कुर्ता|लोअर|सूट|shirt|pant|men|raymond/i },
  { id: 11, icon: '👗', name: 'महिलाओं के वस्त्र (Women)', sub: 'साड़ी, सलवार सूट, कुर्ती, लहंगा', kw: /साड़ी|कुर्ती|लहंगा|दुपट्टा|सलवार|saree|kurti|women/i },
  { id: 12, icon: '🧸', name: 'बच्चों के कपड़े व खिलौने', sub: 'बच्चों के कपड़े, डायपर, खिलौने', kw: /बच्चों|डायपर|खिलौने|बेबी|kids|baby|toy|diaper/i },
  { id: 13, icon: '👟', name: 'जूते, चप्पल व बैग्स', sub: 'स्पोर्ट्स शूज़, सैंडल, बैग, बेल्ट-पर्स', kw: /जूते|चप्पल|सैंडल|बैग|बेल्ट|पर्स|वॉलेट|shoe|sandal|bata|campus/i },
  { id: 14, icon: '💄', name: 'सौंदर्य व कॉस्मेटिक्स', sub: 'क्रीम, लोशन, परफ़्यूम, हेयर ऑयल', kw: /क्रीम|लोशन|परफ़्यूम|हेयर|लिपस्टिक|cream|beauty|lakme|nivea/i },
  { id: 15, icon: '🩺', name: 'स्वास्थ्य व आयुर्वेद', sub: 'च्यवनप्राश, प्रोटीन, विटामिन, मशीन', kw: /च्यवनप्राश|प्रोटीन|आयुर्वेद|दवा|बीपी|शुगर|health|dabur|patanjali/i },
  { id: 16, icon: '🪔', name: 'पूजा सामग्री व आध्यात्मिक', sub: 'अगरबत्ती, धूप, कपूर, पीतल मूर्ति, थाली', kw: /पूजा|अगरबत्ती|धूप|कपूर|मूर्ति|हवन|दीया|puja|agarbatti/i },
  { id: 17, icon: '📱', name: 'मोबाइल, लैपटॉप व गैजेट्स', sub: 'स्मार्टफोन, लैपटॉप, घड़ी, चार्जर', kw: /मोबाइल|स्मार्टफोन|लैपटॉप|घड़ी|चार्जर|ईयरफ़ोन|mobile|phone|samsung|vivo|oppo|oneplus/i },
  { id: 18, icon: '⚡', name: 'इलेक्ट्रॉनिक्स व बिजली सामान', sub: 'टीवी, फ्रिज, पंखे, मिक्सर, LED लाइट', kw: /टीवी|फ्रिज|पंखा|मिक्सर|आयरन|बल्ब|led|स्विच|tv|fan|havells|bajaj/i },
  { id: 19, icon: '🔋', name: 'इनवर्टर, बैटरी व सोलर', sub: 'स्मार्ट इनवर्टर, बैटरी, सोलर पैनल', kw: /इनवर्टर|बैटरी|सोलर|स्टेबलाइज़र|inverter|battery|solar|luminous/i },
  { id: 20, icon: '🛋️', name: 'घर सजावट, फर्नीचर व तिजोरी', sub: 'बेडशीट, पर्दे, कुर्सी-मेज़, तिजोरी', kw: /तिजोरी|लॉकर|बेडशीट|पर्दे|सोफ़ा|कुर्सी|झूमर|सजावट|safe|godrej|decor/i },
  { id: 21, icon: '🚗', name: 'वाहन, बाइक व ऑटो पार्ट्स', sub: 'कार, बाइक, टायर, इंजन ऑयल, हेलमेट', kw: /कार|बाइक|स्कूटर|टायर|हेलमेट|वैक्स|कोटिंग|ऑटो|scorpio|fortuner|car|bike/i },
  { id: 22, icon: '🚜', name: 'कृषि, सिंचाई व किसान यंत्र', sub: 'स्प्रे पंप, पाइप, मोटर पंप, खाद-बीज', kw: /कृषि|किसान|स्प्रे|पंप|पाइप|सिंचाई|खाद|बीज|ट्रैक्टर|agri|pump|pipe/i },
  { id: 23, icon: '🛠️', name: 'हार्डवेयर, पेंट व औज़ार', sub: 'ड्रिल, कटर मशीन, पेंट, ताले, फिटिंग', kw: /कटर|ड्रिल|मशीन|पेंट|ताले|हार्डवेयर|औज़ार|bosch|tool|paint/i },
  { id: 24, icon: '🌙', name: 'रात का आराम व मच्छर सुरक्षा', sub: 'मच्छर कॉइल/लिक्विड, मच्छरदानी, गद्दे', kw: /मच्छर|कॉइल|मच्छरदानी|गद्दे|नाइट|रूम|night|mosquito|mattress/i }
];

let allProducts = [];
let activeDept = null;
let rlyCart = [];
let currentAiContext = 'मुख्य स्टोर';

function rlyAlert(msg) {
  const m = document.getElementById('rlyAlertMsg');
  const w = document.getElementById('rlyAlertModal');
  if (m && w) { m.innerHTML = msg; w.style.display = 'flex'; }
}
function rlyOpenModal(id) { const el = document.getElementById(id); if (el) el.style.display = 'flex'; }
function rlyCloseModal(id) { const el = document.getElementById(id); if (el) el.style.display = 'none'; }

function assignDeptId(item) {
  if (item.dept_id && Number(item.dept_id) >= 1 && Number(item.dept_id) <= 24) return Number(item.dept_id);
  const text = `${item.category || ''} ${item.name || ''} ${item.company_name || ''}`;
  for (const d of RLY_DEPARTMENTS) {
    if (d.kw.test(text)) return d.id;
  }
  return 3;
}

function getProductImage(item) {
  if (item.image_url && item.image_url.startsWith('http')) return item.image_url;
  return "";
}

 function getProductImage(item) {
  if (item.image_url && item.image_url.startsWith('http')) return item.image_url;
  const d = RLY_DEPARTMENTS.find(x => x.id === item._deptId) || RLY_DEPARTMENTS[0];
  const comp = encodeURIComponent((item.company_name || 'RLY').slice(0, 18));
   return "";
 
}
 

function renderDepartments() {
  const grid = document.getElementById('rlyDeptGrid');
  const sel = document.getElementById('admDeptSelect');
  if (grid) {
    grid.innerHTML = RLY_DEPARTMENTS.map(d => {
      const count = allProducts.filter(p => p._deptId === d.id).length;
      return `<div class="rly-dept-card" onclick="rlyEnterDept(${d.id})"><span class="rly-dept-icon">${d.icon}</span><div class="rly-dept-name">${d.id}. ${d.name}</div><div class="rly-dept-sub">${d.sub}</div><div style="margin-top:6px;font-size:11px;color:#22c55e;font-weight:bold;">${count} उत्पाद →</div></div>`;
    }).join('');
  }
  if (sel) {
    sel.innerHTML = RLY_DEPARTMENTS.map(d => `<option value="${d.id}">${d.id}. ${d.name}</option>`).join('');
  }
}

function buildProductCards(list) {
  if (!list || list.length === 0) {
    return '<div style="grid-column:1/-1;text-align:center;padding:24px;color:#a1a1aa;background:#11131a;border-radius:12px;border:1px dashed #d4af37;">इस खांचे में अभी उत्पाद लोड हो रहे हैं। ऊपर स्वामी कक्ष से नए उत्पाद तुरंत जोड़ें।</div>';
  }
  return list.slice(0, 120).map(item => {
    const img = getProductImage(item);
    const d = RLY_DEPARTMENTS.find(x => x.id === item._deptId) || RLY_DEPARTMENTS;
    const mediaHtml = img
      ? `<img src="${img}" alt="${item.name}" class="rly-prod-img" loading="lazy">`
      : `<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#181c28,#090a0f);"><span style="font-size:48px;">${d.icon}</span><span style="font-size:10px;color:#ffd700;margin-top:4px;font-weight:bold;">RLY VERIFIED HD</span></div>`;
    const comp = item.company_name || 'RLY Verified';
    const mrpHtml = item.mrp ? `<span class="rly-prod-mrp">₹${item.mrp}</span>` : '';
    const badge = item.offer_tag || 'मिल रेट';
    const safeName = String(item.name || '').replace(/'/g, "\\'");
    return `<div class="rly-prod-card"><div class="rly-prod-img-wrap">${mediaHtml}<span class="rly-prod-badge">🔥 ${badge}</span></div><div class="rly-prod-body"><div><div class="rly-prod-comp">${comp}</div><div class="rly-prod-title">${item.name}</div></div><div><div class="rly-prod-price-row"><span class="rly-prod-price">₹${item.price}</span>${mrpHtml}</div><button type="button" class="rly-add-cart-btn" onclick="rlyAddToCart('${safeName}', ${Number(item.price) || 0})">+ टोकरी में जोड़ें</button></div></div></div>`;
  }).join('');
}
function rlyEnterDept(deptId) {

  activeDept = RLY_DEPARTMENTS.find(d => d.id === deptId);
  if (!activeDept) return;
  document.getElementById('rlyHomeLobby').style.display = 'none';
  document.getElementById('rlyDeptStoreView').style.display = 'block';
  document.getElementById('rlyActiveDeptIcon').innerText = activeDept.icon;
  document.getElementById('rlyActiveDeptTitle').innerText = `${activeDept.id}. ${activeDept.name}`;
  document.getElementById('rlyActiveDeptSub').innerText = `${activeDept.sub} — सभी कंपनियों के उत्पाद`;
  document.getElementById('rlyDeptSearchInput').value = '';
  document.getElementById('rlyDeptAiTrigger').onclick = () => rlyOpenAI(activeDept.name);
  document.getElementById('rlyDeptProductGrid').innerHTML = buildProductCards(allProducts.filter(p => p._deptId === activeDept.id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function rlyGoHome() {
  activeDept = null;
  document.getElementById('rlyDeptStoreView').style.display = 'none';
  document.getElementById('rlyHomeLobby').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function rlyGlobalFilter(q) {
  const query = q.toLowerCase().trim();
  const filtered = !query ? allProducts : allProducts.filter(p => `${p.name} ${p.company_name} ${p.category}`.toLowerCase().includes(query));
  document.getElementById('rlyHomeProductGrid').innerHTML = buildProductCards(filtered);
}

function rlyDeptFilter(q) {
  if (!activeDept) return;
  const query = q.toLowerCase().trim();
  const deptItems = allProducts.filter(p => p._deptId === activeDept.id);
  document.getElementById('rlyDeptProductGrid').innerHTML = buildProductCards(!query ? deptItems : deptItems.filter(p => `${p.name} ${p.company_name}`.toLowerCase().includes(query)));
}

function rlyStartVoice(mode) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return rlyAlert('🎤 कृपया सर्च बॉक्स में लिखकर खोजें।');
  const rec = new SR();
  rec.lang = 'hi-IN';
  rlyAlert('🎤 <b>सुन रहा हूँ...</b> उत्पाद का नाम बोलें...');
  rec.onresult = (e) => {
    const text = e.results.transcript;
    rlyCloseModal('rlyAlertModal');
    if (mode === 'dept' && activeDept) { document.getElementById('rlyDeptSearchInput').value = text; rlyDeptFilter(text); }
    else if (mode === 'ai') { document.getElementById('rlyAiUserInput').value = text; rlySendAiQuery(); }
    else { document.getElementById('rlyGlobalSearch').value = text; rlyGlobalFilter(text); }
  };
  rec.onerror = () => rlyAlert('⚠️ आवाज़ साफ़ नहीं मिली, पुनः प्रयास करें।');
  rec.start();
}

function rlyOpenAI(contextName) {
  currentAiContext = contextName;
  document.getElementById('rlyAiModalTitle').innerText = `🤖 RLY AI — ${contextName}`;
  document.getElementById('rlyAiChatBox').innerHTML = `<div style="color:#ffd700;margin-bottom:6px;"><b>RLY AI:</b> नमस्ते! आप अभी <b>${contextName}</b> में हैं। आप क्या ढूँढ रहे हैं?</div>`;
  rlyOpenModal('rlyAiModal');
}

function rlySendAiQuery() {
  const inp = document.getElementById('rlyAiUserInput');
  const box = document.getElementById('rlyAiChatBox');
  const q = inp.value.trim();
  if (!q) return;
  box.innerHTML += `<div style="color:#fff;margin:4px 0;"><b>आप:</b> ${q}</div>`;
  inp.value = '';
  const matches = allProducts.filter(p => `${p.name} ${p.company_name}`.toLowerCase().includes(q.toLowerCase())).slice(0, 3);
  const reply = matches.length > 0
    ? `ये विकल्प उपलब्ध हैं:<br>` + matches.map(m => `• <b>${m.name}</b> — <b>₹${m.price}</b>`).join('<br>')
    : `<b>${currentAiContext}</b> में सभी कंपनियों के उत्पाद मिल रेट पर उपलब्ध हैं। ऊपर सर्च या माइक (🎤) का उपयोग करें।`;
  box.innerHTML += `<div style="color:#ffd700;margin:4px 0 8px 0;"><b>RLY AI:</b> ${reply}</div>`;
  box.scrollTop = box.scrollHeight;
}

function rlyAddToCart(name, price) {
  rlyCart.push({ name, price: Number(price) || 0 });
  document.getElementById('rlyCartBadge').innerText = rlyCart.length;
  rlyAlert(`✅ <b>${name}</b> टोकरी में जोड़ दिया गया है!`);
}

function rlyOpenCart() {
  const list = document.getElementById('rlyCartItemsList');
  const totalEl = document.getElementById('rlyCartTotalText');
  if (rlyCart.length === 0) { list.innerHTML = 'टोकरी खाली है।'; totalEl.innerText = 'कुल: ₹0'; }
  else {
    let sum = 0;
    list.innerHTML = rlyCart.map((it, i) => { sum += it.price; return `<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #222;"><span>${i + 1}. ${it.name}</span><b style="color:#ffd700;">₹${it.price}</b></div>`; }).join('');
    totalEl.innerText = `कुल देय राशि: ₹${sum}`;
  }
  rlyOpenModal('rlyCartModal');
}

async function rlySubmitOrder() {
  const name = document.getElementById('rlyCustName').value.trim();
  const phone = document.getElementById('rlyCustPhone').value.trim();
  const addr = document.getElementById('rlyCustAddress').value.trim();
  if (!rlyCart.length || !name || !phone || !addr) return rlyAlert('⚠️ टोकरी, नाम, फ़ोन और पता भरें।');
  const total = rlyCart.reduce((s, it) => s + it.price, 0);
    const { data: inserted } = await rlyDB.from('orders').insert([{ customer_name: name, phone, address: addr, items: JSON.stringify(rlyCart), total_amount: total }]).select().single();
  rlyCart = [];
  document.getElementById('rlyCartBadge').innerText = '0';
  rlyCloseModal('rlyCartModal');
  rlyAlert(`⏳ <b>₹${total}</b> का सुरक्षित फिक्स्ड पेमेंट गेटवे खुल रहा है...`);
  const { data: cfData } = await rlyDB.functions.invoke('create-cashfree-order', { body: { amount: total, customer_name: name, phone, order_id: inserted?.id || Date.now() } });
  if (cfData?.link_url) { window.location.href = cfData.link_url; }
  else { window.location.href = RLY_CASHFREE_URL; }

}

async function rlyTrackMyOrders() {
  const phone = document.getElementById('rlyTrackPhoneInput').value.trim();
  const box = document.getElementById('rlyTrackResults');
  if (phone.length < 10) return rlyAlert('⚠️ 10 अंकों का मोबाइल नंबर डालें।');
  box.innerHTML = '⏳ जाँच हो रही है...';
  const { data } = await rlyDB.from('orders').select('*').eq('phone', phone).order('created_at', { ascending: false }).limit(5);
  box.innerHTML = (!data || !data.length) ? 'कोई ऑर्डर नहीं मिला।' : data.map((o, i) => `<div style="padding:6px;border-bottom:1px solid #2b2e3d;"><b>#${i + 1} ${o.customer_name}</b> — ₹${o.total_amount || 0}<br>${o.address}</div>`).join('');
}

async function rlyOpenAdminGate() {
  rlyOpenModal('rlyAdminModal');
  const { data: { session } } = await rlyDB.auth.getSession();
  if (session) { document.getElementById('rlyAdminAuthBox').style.display = 'none'; document.getElementById('rlyAdminDashboard').style.display = 'block'; }
}

async function rlyLoginAdmin() {
  const email = document.getElementById('rlyAdminEmail').value.trim();
  const password = document.getElementById('rlyAdminPass').value.trim();
  const { error } = await rlyDB.auth.signInWithPassword({ email, password });
  if (error) return rlyAlert('❌ सही एडमिन ईमेल व पासवर्ड डालें।');
  document.getElementById('rlyAdminAuthBox').style.display = 'none';
  document.getElementById('rlyAdminDashboard').style.display = 'block';
}

async function rlyUploadSingleProduct() {
  const dept_id = Number(document.getElementById('admDeptSelect').value);
  const company_name = document.getElementById('admComp').value.trim() || 'RLY Partner';
  const name = document.getElementById('admName').value.trim();
  const image_url = document.getElementById('admImgUrl').value.trim();
  const price = Number(document.getElementById('admPrice').value) || 0;
  const mrp = Number(document.getElementById('admMrp').value) || null;
  const offer_tag = document.getElementById('admOfferTag').value.trim() || 'मिल रेट';
  if (!name || price <= 0) return rlyAlert('⚠️ उत्पाद का नाम और रेट भरें।');
  const { error } = await rlyDB.from('products').insert([{ company_name, name, category: RLY_DEPARTMENTS[dept_id - 1].name, price, mrp, description: offer_tag, image_url, dept_id, offer_tag }]);
  if (error) return rlyAlert('⚠️ अपलोड विफल: Supabase कॉलम व लॉगिन जाँचें।');
  rlyAlert(`✅ <b>${name}</b> लाइव हो गया!`);
  loadAllCatalog();
}

async function rlyUploadBulkProducts() {
  const raw = document.getElementById('admBulkText').value.trim();
  if (!raw) return;
  const rows = raw.split('\n').map(l => l.split('|').map(x => x.trim())).filter(p => p.length >= 4);
  const records = rows.map(p => ({ dept_id: Number(p) || 3, company_name: p || 'RLY', name: p, category: (RLY_DEPARTMENTS[(Number(p) || 3) - 1] || RLY_DEPARTMENTS).name, price: Number(p) || 0, mrp: p ? Number(p) : null, image_url: p || '' }));
  await rlyDB.from('products').insert(records);
  rlyAlert(`🚀 ${records.length} उत्पाद लाइव!`);
  loadAllCatalog();
}

async function rlyViewAdminOrders() {
  const box = document.getElementById('admOrdersList');
  const { data } = await rlyDB.from('orders').select('*').order('id', { ascending: false }).limit(20);
box.innerHTML = (!data || !data.length) ? 'कोई ऑर्डर नहीं।' : data.map((o, i) => { let list = ''; try { list = JSON.parse(o.items || '[]').map(x => `${x.name} (₹${x.price})`).join(', '); } catch(e) { list = o.items || ''; } const dt = o.created_at ? new Date(o.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }) : 'समय उपलब्ध नहीं'; return `<div style="padding:8px 5px;border-bottom:1px solid #2b2e3d;line-height:1.5;"><b style="color:#ffd700;">${i + 1}. ${o.customer_name}</b> (${o.phone}) — <b style="color:#22c55e;">₹${o.total_amount || 0}</b><br><span style="color:#38bdf8;font-size:12px;">🕒 तारीख व समय: ${dt}</span><br><span style="color:#e4e4e7;">📍 पता: ${o.address || 'उपलब्ध नहीं'}</span><br><span style="color:#a1a1aa;font-size:12px;">🛒 सामान: ${list}</span></div>`; }).join('');


}

let currentRlyLang = 'hi';

const RLY_LANGUAGES = [
  { code: 'hi', label: '🇮🇳 हिंदी (Hindi)', locale: 'hi-IN', head: '🏛️ सुबह से रात तक — २४ स्टोर खांचे', offer: 'महा-त्योहार व शादी सीज़न ऑफ़र: २,०००+ अंतर्राष्ट्रीय व भारतीय कंपनियों के सामान पर सीधा मिल रेट | 0% विज्ञापन | सुरक्षित होम डिलीवरी' },
  { code: 'en', label: '🌐 English (Global)', locale: 'en-IN', head: '🏛️ Morning to Night — 24 Store Departments', offer: 'Grand Festival & Wedding Season Offer: Direct Mill Rate on 2,000+ International & Indian Brands | 0% Ads | Safe Home Delivery' },
  { code: 'bho', label: '🇮🇳 भोजपुरी (Bhojpuri)', locale: 'hi-IN', head: '🏛️ बिहान से रात ले — २४ गो खांचा', offer: 'महा-तिहार आ शादी सीज़न ऑफ़र: २,०००+ देसी आ विदेशी कंपनी के सामान पर सीधा मिल रेट | 0% प्रचार | सुरक्षित होम डिलीवरी' },
  { code: 'mr', label: '🇮🇳 मराठी (Marathi)', locale: 'mr-IN', head: '🏛️ सकाळपासून रात्रीपर्यंत — २४ विभाग', offer: 'महा-सण आणि लग्नसराई ऑफर: २,०००+ आंतरराष्ट्रीय व भारतीय कंपन्यांच्या मालावर थेट मिल रेट | 0% जाहिरात | सुरक्षित होम डिलिव्हरी' },
  { code: 'gu', label: '🇮🇳 ગુજરાતી (Gujarati)', locale: 'gu-IN', head: '🏛️ સવારથી રાત સુધી — ૨૪ વિભાગો', offer: 'મહા-તહેવાર અને લગ્ન સીઝન ઑફર: ૨,૦૦૦+ આંતરરાષ્ટ્રીય અને ભારતીય કંપનીઓના સામાન પર સીધો મિલ રેટ | 0% જાહેરાત | સુરક્ષિત હોમ ડિલિવરી' },
  { code: 'pa', label: '🇮🇳 ਪੰਜਾਬੀ (Punjabi)', locale: 'pa-IN', head: '🏛️ ਸਵੇਰ ਤੋਂ ਰਾਤ ਤੱਕ — 24 ਸਟੋਰ ਵਿਭਾਗ', offer: 'ਮਹਾਂ-ਤਿਉਹਾਰ ਅਤੇ ਵਿਆਹ ਸੀਜ਼ਨ ਆਫ਼ਰ: 2,000+ ਅੰਤਰਰਾਸ਼ਟਰੀ ਅਤੇ ਭਾਰਤੀ ਕੰਪਨੀਆਂ ਦੇ ਸਮਾਨ \'ਤੇ ਸਿੱਧਾ ਮਿੱਲ ਰੇਟ | 0% ਇਸ਼ਤਿਹਾਰ | ਸੁਰੱਖਿਅਤ ਹੋਮ ਡਿਲੀਵਰੀ' },
  { code: 'bn', label: '🇮🇳 বাংলা (Bengali)', locale: 'bn-IN', head: '🏛️ সকাল থেকে রাত — ২৪টি স্টোর বিভাগ', offer: 'মহা-উৎসব ও বিয়ের মরসুম অফার: ২,০০০+ আন্তর্জাতিক ও ভারতীয় কোম্পানির পণ্যে সরাসরি মিল রেট | ০% বিজ্ঞাপন | নিরাপদ হোম ডেলিভারি' },
  { code: 'ta', label: '🇮🇳 தமிழ் (Tamil)', locale: 'ta-IN', head: '🏛️ காலை முதல் இரவு வரை — 24 கடை பிரிவுகள்', offer: 'மாபெரும் திருவிழா & திருமண சீசன் சலுகை: 2,000+ சர்வதேச & இந்திய நிறுவன பொருட்களுக்கு நேரடி மில் விலை | 0% விளம்பரம் | பாதுகாப்பான ஹோம் டெலிவரி' },
  { code: 'te', label: '🇮🇳 తెలుగు (Telugu)', locale: 'te-IN', head: '🏛️ ఉదయం నుండి రాత్రి వరకు — 24 స్టోర్ విభాగాలు', offer: 'మహా పండుగ & పెళ్లిళ్ల సీజన్ ఆఫర్: 2,000+ అంతర్జాతీయ & భారతీయ కంపెనీల వస్తువులపై నేరుగా మిల్లు ధర | 0% ప్రకటనలు | సురక్షిత హోమ్ డెలివరీ' },
  { code: 'kn', label: '🇮🇳 ಕನ್ನಡ (Kannada)', locale: 'kn-IN', head: '🏛️ ಬೆಳಿಗ್ಗೆಯಿಂದ ರಾತ್ರಿಯವರೆಗೆ — 24 ವಿಭಾಗಗಳು', offer: 'ಮಹಾ ಹಬ್ಬ ಮತ್ತು ಮದುವೆ ಸೀಸನ್ ಆಫರ್: 2,000+ ಅಂತರರಾಷ್ಟ್ರೀಯ ಮತ್ತು ಭಾರತೀಯ ಕಂಪನಿಗಳ ವಸ್ತುಗಳ ಮೇಲೆ ನೇರ ಮಿಲ್ ದರ | 0% ಜಾಹೀರಾತು | ಸುರಕ್ಷಿತ ಹೋಮ್ ಡೆಲಿವರಿ' },
  { code: 'ml', label: '🇮🇳 മലയാളം (Malayalam)', locale: 'ml-IN', head: '🏛️ രാവിലെ മുതൽ രാത്രി വരെ — 24 വിഭാഗങ്ങൾ', offer: 'മഹാ ഉത്സവ & വിവാഹ സീസൺ ഓഫർ: 2,000+ അന്താരാഷ്ട്ര & ഇന്ത്യൻ കമ്പനികളുടെ ഉൽപ്പന്നങ്ങൾക്ക് നേരിട്ട് മിൽ നിരക്ക് | 0% പരസ്യം | സുരക്ഷിത ഹോം ഡെലിവറി' },
  { code: 'or', label: '🇮🇳 ଓଡ଼ିଆ (Odia)', locale: 'or-IN', head: '🏛️ ସକାଳୁ ରାତି ପର୍ଯ୍ୟନ୍ତ — ୨୪ଟି ବିଭାଗ', offer: 'ମହା-ପର୍ବ ଓ ବିବାହ ସିଜନ୍ ଅଫର୍: ୨,୦୦୦+ ଆନ୍ତର୍ଜାତୀୟ ଓ ଭାରତୀୟ କମ୍ପାନୀ ସାମଗ୍ରୀ ଉପରେ ସିଧା ମିଲ୍ ଦର | 0% ବିଜ୍ଞାପନ | ସୁରକ୍ଷିତ ହୋମ୍ ଡେଲିଭରି' },
  { code: 'as', label: '🇮🇳 অসমীয়া (Assamese)', locale: 'as-IN', head: '🏛️ ৰাতিপুৱাৰ পৰা ৰাতিলৈ — ২৪টা বিভাগ', offer: 'মহা-উৎসৱ আৰু বিবাহৰ বতৰৰ অফাৰ: ২,০০০+ আন্তঃৰাষ্ট্ৰীয় আৰু ভাৰতীয় কোম্পানীৰ সামগ্ৰীত পোনপটীয়া মিলৰ দাম | ০% বিজ্ঞাপন | সুৰক্ষিত হোম ডেলিভাৰী' },
  { code: 'ur', label: '🇮🇳 اردو (Urdu)', locale: 'ur-IN', head: '🏛️ صبح سے رات تک — 24 اسٹور شعبہ جات', offer: 'عظیم تہوار اور شادی سیزن آفر: 2,000+ بین الاقوامی اور ہندوستانی کمپنیوں کے سامان پر براہ راست مل ریٹ | 0% اشتہارات | محفوظ ہوم ڈیلیوری' },
  { code: 'ne', label: '🇳🇵 नेपाली (Nepali)', locale: 'ne-NP', head: '🏛️ बिहानदेखि रातिसम्म — २४ स्टोर विभागहरू', offer: 'महा-चाडपर्व र विवाह सिजन अफर: २,०००+ अन्तर्राष्ट्रिय र भारतीय कम्पनीका सामानमा सिधा मिल रेट | ०% विज्ञापन | सुरक्षित होम डेलिभरी' },
  { code: 'ar', label: '🇦🇪 العربية (Arabic)', locale: 'ar-SA', head: '🏛️ من الصباح إلى الليل — 24 قسم متجر', offer: 'عرض المهرجانات وموسم الزفاف: أسعار المصنع مباشرة على أكثر من 2,000 علامة تجارية عالمية وهندية | 0% إعلانات | توصيل منزلي آمن' },
  { code: 'es', label: '🇪🇸 Español (Spanish)', locale: 'es-ES', head: '🏛️ De la mañana a la noche — 24 Departamentos', offer: 'Gran Oferta de Festivales y Bodas: Precio directo de fábrica en más de 2,000 marcas internacionales e indias | 0% Anuncios | Entrega segura' },
  { code: 'fr', label: '🇫🇷 Français (French)', locale: 'fr-FR', head: '🏛️ Du matin au soir — 24 Départements', offer: 'Grande Offre Festivals & Mariages : Prix direct usine sur plus de 2 000 marques internationales et indiennes | 0% Publicité | Livraison à domicile sûre' },
  { code: 'de', label: '🇩🇪 Deutsch (German)', locale: 'de-DE', head: '🏛️ Von morgens bis abends — 24 Abteilungen', offer: 'Großes Festival- & Hochzeitsangebot: Direkter Fabrikpreis auf über 2.000 internationale & indische Marken | 0% Werbung | Sichere Lieferung' },
  { code: 'ru', label: '🇷🇺 Русский (Russian)', locale: 'ru-RU', head: '🏛️ С утра до ночи — 24 отдела магазина', offer: 'Большая праздничная и свадебная акция: прямые цены фабрик на 2 000+ мировых и индийских брендов | 0% рекламы | Безопасная доставка' },
  { code: 'zh', label: '🇨🇳 中文 (Chinese)', locale: 'zh-CN', head: '🏛️ 从早到晚 — 24个商店部门', offer: '盛大节日与婚庆季特惠：2,000+国际及印度品牌工厂直供价 | 0%广告 | 安全送货上门' },
  { code: 'ja', label: '🇯🇵 日本語 (Japanese)', locale: 'ja-JP', head: '🏛️ 朝から夜まで — 24のストア部門', offer: 'グランドフェスティバル＆ウェディングセール：2,000以上の国際・インドブランドが工場直送価格 | 広告0% | 安全な宅配便' },
  { code: 'ko', label: '🇰🇷 한국어 (Korean)', locale: 'ko-KR', head: '🏛️ 아침부터 밤까지 — 24개 매장 부서', offer: '대축제 및 웨딩 시즌 특가: 2,000개 이상의 글로벌 및 인도 브랜드 공장 직거래가 | 광고 0% | 안전한 홈 딜리버리' },
  { code: 'pt', label: '🇧🇷 Português (Portuguese)', locale: 'pt-BR', head: '🏛️ De manhã à noite — 24 Departamentos', offer: 'Grande Oferta de Festivais e Casamentos: Preço direto de fábrica em mais de 2.000 marcas internacionais e indianas | 0% Anúncios' },
  { code: 'it', label: '🇮🇹 Italiano (Italian)', locale: 'it-IT', head: '🏛️ Dalla mattina alla sera — 24 Reparti', offer: 'Grande Offerta Festival e Matrimoni: Prezzo diretto di fabbrica su oltre 2.000 marchi internazionali e indiani | 0% Pubblicità' },
  { code: 'tr', label: '🇹🇷 Türkçe (Turkish)', locale: 'tr-TR', head: '🏛️ Sabahtan Geceye — 24 Mağaza Bölümü', offer: 'Büyük Festival ve Düğün Sezonu Fırsatı: 2.000+ Uluslararası ve Hint Markasında Doğrudan Fabrika Fiyatı | %0 Reklam | Güvenli Teslimat' },
  { code: 'fa', label: '🇮🇷 فارسی (Persian)', locale: 'fa-IR', head: '🏛️ از صبح تا شب — ۲۴ بخش فروشگاه', offer: 'پیشنهاد ویژه جشنواره‌ها و فصل عروسی: قیمت مستقیم کارخانه برای بیش از ۲۰۰۰ برند بین‌المللی و هندی | ۰٪ تبلیغات | تحویل ایمن درب منزل' },
  { code: 'id', label: '🇮🇩 Bahasa Indonesia', locale: 'id-ID', head: '🏛️ Pagi hingga Malam — 24 Departemen Toko', offer: 'Promo Besar Festival & Musim Pernikahan: Harga Langsung Pabrik untuk 2.000+ Merek Internasional & India | 0% Iklan | Pengiriman Aman' },
  { code: 'th', label: '🇹🇭 ไทย (Thai)', locale: 'th-TH', head: '🏛️ เช้าจรดค่ำ — 24 แผนกร้านค้า', offer: 'ข้อเสนอพิเศษเทศกาลและฤดูแต่งงาน: ราคาตรงจากโรงงานกว่า 2,000 แบรนด์ชั้นนำ | โฆษณา 0% | จัดส่งถึงบ้านอย่างปลอดภัย' },
  { code: 'vi', label: '🇻🇳 Tiếng Việt (Vietnamese)', locale: 'vi-VN', head: '🏛️ Từ sáng đến đêm — 24 Gian hàng', offer: 'Ưu đãi Lớn Mùa Lễ hội & Cưới hỏi: Giá gốc trực tiếp từ nhà máy cho hơn 2.000 thương hiệu quốc tế & Ấn Độ | 0% Quảng cáo' },
  { code: 'sw', label: '🇰🇪 Kiswahili (Swahili)', locale: 'sw-KE', head: '🏛️ Asubuhi hadi Usiku — Idara 24 za Duka', offer: 'Ofa Kuu ya Sikukuu na Harusi: Bei ya Moja kwa Moja ya Kiwandani kwa Chapa 2,000+ za Kimataifa na India | 0% Matangazo' }
];

function renderRlyLangMenu() {
  const box = document.getElementById('rlyLangDropdown');
  if (!box) return;
  box.innerHTML = RLY_LANGUAGES.map(l =>
    `<div onclick="rlyChangeLang('${l.code}')" style="padding:7px 10px; color:${l.code === currentRlyLang ? '#000' : '#ffd700'}; background:${l.code === currentRlyLang ? '#ffd700' : 'transparent'}; font-weight:bold; font-size:12.5px; border-radius:6px; cursor:pointer; border-bottom:1px solid #1e2230;">${l.label}</div>`
  ).join('');
}

function rlyToggleLangList() {
  const box = document.getElementById('rlyLangDropdown');
  if (!box) return;
  renderRlyLangMenu();
  box.style.display = (box.style.display === 'none' || !box.style.display) ? 'block' : 'none';
}

function updateRlyHeadlineAndClock() {
  const now = new Date();
  const langObj = RLY_LANGUAGES.find(x => x.code === currentRlyLang) || RLY_LANGUAGES[0];

  const timeStr = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const engDateStr = now.toLocaleDateString(langObj.locale, { timeZone: 'Asia/Kolkata', weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  let panchangStr = '';
  try {
    panchangStr = new Intl.DateTimeFormat(langObj.locale + '-u-ca-indian', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'long', year: 'numeric' }).format(now);
  } catch (e) { panchangStr = 'भारतीय पंचांग'; }

  const cEl = document.getElementById('rlyLiveClock');
  const dEl = document.getElementById('rlyEngDate');
  const pEl = document.getElementById('rlyIndianPanchang');
  if (cEl) cEl.innerText = `🕒 ${timeStr} IST`;
  if (dEl) dEl.innerText = `📅 ${engDateStr}`;
  if (pEl) pEl.innerText = `🪔 ${panchangStr}`;

  const banner = document.getElementById('rlyFestivalBanner');
  if (banner) banner.innerText = `🎉 ${langObj.offer}`;
}

function rlyChangeLang(lang) {
  currentRlyLang = lang;
  const langObj = RLY_LANGUAGES.find(x => x.code === lang) || RLY_LANGUAGES[0];

  const parts = langObj.label.split(' ');
  const btn = document.getElementById('rlyLangBtn');
  if (btn) btn.innerText = `${parts[0]} ${parts[1]} ▾`;

  const box = document.getElementById('rlyLangDropdown');
  if (box) box.style.display = 'none';

  const hEl = document.getElementById('rlyDeptHeading');
  if (hEl) hEl.innerText = langObj.head;

  updateRlyHeadlineAndClock();
}

async function loadAllCatalog() {
  renderDepartments();
  try {
    const { count } = await rlyDB.from('products').select('*', { count: 'exact', head: true });
    const { data } = await rlyDB.from('products').select('*').order('id', { ascending: false }).range(0, 2499);
    if (data) {
      allProducts = data.map(item => ({ ...item, _deptId: assignDeptId(item) }));
      const total = (typeof count === 'number' && count > allProducts.length) ? count : allProducts.length;
      document.getElementById('rlyLiveCounter').innerText = `🟢 2,000+ ब्रांड्स | ${total.toLocaleString('en-IN')}+ लाइव उत्पाद`;
      renderDepartments();
      document.getElementById('rlyHomeProductGrid').innerHTML = buildProductCards(allProducts);
    }
  } catch (e) {}
}

window.addEventListener('DOMContentLoaded', () => {
  renderRlyLangMenu();
  updateRlyHeadlineAndClock();
  setInterval(updateRlyHeadlineAndClock, 1000);
  loadAllCatalog();
});
