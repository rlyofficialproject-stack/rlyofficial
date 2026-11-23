const SUPABASE_URL = 'https://supabase.co';
const SUPABASE_KEY = 'sb_publishable_fc9vD9qiZyJ_AQhEUZpo-g_oNbhaOLE';
const RLY_CASHFREE_URL = 'https://cashfree.com';
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
  const d = RLY_DEPARTMENTS.find(x => x.id === item._deptId) || RLY_DEPARTMENTS[2];
  const title = encodeURIComponent((item.company_name || 'RLY').slice(0, 16));
  return `data:image/svg+xml;utf8,<svg xmlns="http://w3.org" viewBox="0 0 320 200"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23181c28"/><stop offset="100%" stop-color="%23090a0f"/></linearGradient></defs><rect width="320" height="200" fill="url(%23bg)"/><circle cx="160" cy="85" r="46" fill="%2311131a" stroke="%23ffd700" stroke-width="2.5"/><text x="160" y="102" font-size="44" text-anchor="middle">${d.icon}</text><text x="160" y="158" fill="%23ffd700" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">${title}</text><text x="160" y="178" fill="%23a1a1aa" font-family="sans-serif" font-size="11" text-anchor="middle">RLY VERIFIED HD CATALOG</text></svg>`;
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
    const comp = item.company_name || 'RLY Verified';
    const mrpHtml = item.mrp ? `<span class="rly-prod-mrp">₹${item.mrp}</span>` : '';
    const badge = item.offer_tag || 'मिल रेट';
    const safeName = String(item.name || '').replace(/'/g, "\\'");
    return `<div class="rly-prod-card"><div class="rly-prod-img-wrap"><img src="${img}" alt="${item.name}" class="rly-prod-img" loading="lazy"><span class="rly-prod-badge">🔥 ${badge}</span></div><div class="rly-prod-body"><div><div class="rly-prod-comp">${comp}</div><div class="rly-prod-title">${item.name}</div></div><div><div class="rly-prod-price-row"><span class="rly-prod-price">₹${item.price}</span>${mrpHtml}</div><button type="button" class="rly-add-cart-btn" onclick="rlyAddToCart('${safeName}', ${Number(item.price) || 0})">+ टोकरी में जोड़ें</button></div></div></div>`;
  }).join('');
}

function rlyEnterDept(deptId) {
  activeDept = RLY_DEPARTMENTS.find(d => d.id === deptId);
  if (!activeDept) return;
  document.getElementById('rlyHomeLobby').style.display = 'none';
  document.getElementById('rlyDeptStoreView').style.display = 'block';
  document.getElementById('rlyActiveDeptIcon').innerText = activeDept.icon;
  document.getElementById('rlyActiveDeptTitle').innerText = `${activeDept.id}. ${activeDept.name}`;
  document.getElementById('rlyActiveDeptSub').innerText = `${activeDept.sub} — सभी कंपनियों के उत्पाद एक ही स्थान पर`;
  document.getElementById('rlyDeptSearchInput').value = '';
  document.getElementById('rlyDeptAiTrigger').onclick = () => rlyOpenAI(activeDept.name);
  const deptItems = allProducts.filter(p => p._deptId === activeDept.id);
  document.getElementById('rlyDeptProductGrid').innerHTML = buildProductCards(deptItems);
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
  const filtered = !query ? deptItems : deptItems.filter(p => `${p.name} ${p.company_name}`.toLowerCase().includes(query));
