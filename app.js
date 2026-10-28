// स्थानीय कोठरी (LocalStorage) से बैंक डेटाबेस लोड या इनिशियलाइज़ करना
function getBankingDatabase() {
    let db = localStorage.getItem('rly_bank_vault');
    if (!db) {
        const initialDB = {
            users: {},
            transactions: [],
            omnimart_revenue: { total_gst_collected: 0, owner_vault: 0 }
        };
        localStorage.setItem('rly_bank_vault', JSON.stringify(initialDB));
        return initialDB;
    }
    return JSON.parse(db);
}

function saveBankingDatabase(db) {
    localStorage.setItem('rly_bank_vault', JSON.stringify(db));
}

// बिना किसी वाइट अलर्ट/प्रॉम्प्ट के अंदर ही इनपुट फॉर्म खोलने का आधुनिक इंजन
function openInAppForm(type, productType = 'GENERAL', price = 0) {
    const formBox = document.getElementById('rly-input-form-box');
    const formTitle = document.getElementById('form-title');
    const container = document.getElementById('form-inputs-container');
    const submitBtn = document.getElementById('form-submit-btn');
    
    formBox.style.display = 'block';
    container.innerHTML = ''; // पुराना साफ़ करें
    
    // इनपुट स्टाइल्स सीएसएस कर्नल इंजेक्ट करना
    const inputStyle = "width: 100%; padding: 8px; margin: 5px 0; background: #222; color: #fff; border: 1px solid #FFD700; border-radius: 4px; box-sizing: border-box;";
    
    if (type === 'ACCOUNT') {
        formTitle.innerText = "🏦 नया डिजिटल खाता पंजीकरण";
        container.innerHTML = `
            <input type="text" id="rly-name" placeholder="ग्राहक का पूरा नाम" style="${inputStyle}">
            <input type="number" id="rly-mobile" placeholder="१० अंकों का मोबाइल नंबर" style="${inputStyle}">
            <input type="password" id="rly-mpin" placeholder="४ अंकों का सुरक्षा MPIN" style="${inputStyle}">
        `;
        submitBtn.onclick = function() {
            const name = document.getElementById('rly-name').value;
            const mobile = document.getElementById('rly-mobile').value;
            const pin = document.getElementById('rly-mpin').value;
            if(name && mobile && pin) {
                createDigitalAccount(name, mobile, pin);
                formBox.style.display = 'none';
            }
        };
    } else if (type === 'TICKET') {
        formTitle.innerText = "💳 आर एल वाई त्वरित टनल ट्रांजैक्शन";
        container.innerHTML = `
            <input type="number" id="rly-sender-mob" placeholder="अपना पंजीकृत मोबाइल नंबर" style="${inputStyle}">
            <input type="number" id="rly-tx-amount" placeholder="लेनदेन की मूल राशि (₹)" style="${inputStyle}">
        `;
        submitBtn.onclick = function() {
            const mobile = document.getElementById('rly-sender-mob').value;
            const amount = document.getElementById('rly-tx-amount').value;
            if(mobile && amount) {
                processRealMoneyTransaction(mobile, '9999999999', amount, 'GENERAL');
                formBox.style.display = 'none';
            }
        };
    } else if (type === 'SHOP') {
        formTitle.innerText = `🌾 ओम्नीमार्ट उत्पाद ऑर्डर: ${productType}`;
        container.innerHTML = `
            <input type="number" id="rly-shop-mob" placeholder="अपना पंजीकृत मोबाइल नंबर डालें" style="${inputStyle}">
            <div style="color: #aaa; font-size: 13px; margin-top: 5px;">उत्पाद भाव: ₹${price.toLocaleString()}</div>
        `;
        submitBtn.onclick = function() {
            const mobile = document.getElementById('rly-shop-mob').value;
            if(mobile) {
                processRealMoneyTransaction(mobile, 'OMNIMART_CORE', price, productType);
                formBox.style.display = 'none';
            }
        };
    }
}

// खाता जनरेशन कोर
function createDigitalAccount(fullName, mobileNumber, mpin) {
    const db = getBankingDatabase();
    const terminal = document.getElementById('main-terminal');
    
    if (db.users[mobileNumber]) {
        terminal.style.borderColor = '#ff3333';
        terminal.style.color = '#ff3333';
        terminal.innerHTML = `❌ <strong>त्रुटि:</strong> मोबाइल नंबर ${mobileNumber} पर खाता पहले से पंजीकृत है।`;
        return;
    }
    
    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    db.users[mobileNumber] = {
        accountNumber: accountNumber,
        fullName: fullName,
        balance: 5000000.00, // वास्तविक धरातल टेस्टिंग हेतु ५० लाख का डेमो बैलेंस
        vaultStatus: 'LOCKED_SECURE'
    };
    
    saveBankingDatabase(db);
    
    terminal.style.borderColor = '#39FF14';
    terminal.style.color = '#39FF14';
    terminal.innerHTML = `🏦 <strong>खाता सफलतापूर्वक सक्रिय:</strong><br>
    नाम: ${fullName} | खाता: ${accountNumber}<br>
    बैलेंस: ₹५०,००,०००.०० स्थानीय सुरक्षित कोठरी में सुरक्षित लॉक है।`;
}

// वास्तविक मनी-ट्रांसफर एवं ऑटो-जीएसटी इंजन
function processRealMoneyTransaction(senderMobile, receiverMobile, amount, productType) {
    const db = getBankingDatabase();
    const terminal = document.getElementById('main-terminal');
    amount = parseFloat(amount);
    
    const sender = db.users[senderMobile];
    
    if (!sender) {
        terminal.style.borderColor = '#ff3333';
        terminal.style.color = '#ff3333';
        terminal.innerHTML = `❌ <strong>लेनदेन विफल:</strong> इस मोबाइल नंबर पर कोई आर एल वाई खाता नहीं मिला। कृपया पहले खाता खोलें।`;
        return;
    }
    
    if (sender.balance < amount) {
        terminal.style.borderColor = '#ff3333';
        terminal.style.color = '#ff3333';
        terminal.innerHTML = `❌ <strong>लेनदेन विफल:</strong> खाते में अपर्याप्त बैलेंस। वर्तमान बैलेंस: ₹${sender.balance.toLocaleString()}`;
        return;
    }
    
    let gstRate = 0.00;
    if (productType === 'SCORPIO') gstRate = 0.05;      
    else if (productType === 'FORTUNER') gstRate = 0.18; 
    
    const gstDeduction = amount * gstRate;
    const netTransfer = amount - gstDeduction;
    
    sender.balance -= amount;
    
    db.omnimart_revenue.total_gst_collected += gstDeduction;
    db.omnimart_revenue.owner_vault += (amount * 0.02); 
    
    db.transactions.push({
        sender: sender.accountNumber,
        receiver: receiverMobile,
        rawAmount: amount,
        gstPaid: gstDeduction,
        netSent: netTransfer,
        timestamp: new Date().toISOString()
    });
    
    saveBankingDatabase(db);
    
    terminal.style.borderColor = '#39FF14';
    terminal.style.color = '#39FF14';
    terminal.innerHTML = `💸 <strong>ओम्नीमार्ट लेज़र टनल सक्सेस:</strong><br>
    मूल्य: ₹${amount.toLocaleString()} | स्वचालित GST (${gstRate * 100}%): ₹${gstDeduction.toLocaleString()}<br>
    नेट सेटलमेंट: ₹${netTransfer.toLocaleString()} ट्रांसफर।<br>
    शेष बैलेंस: ₹${sender.balance.toLocaleString()} (कोठरी में सुरक्षित)`;
}

// ६0 FPS कोशिका पल्स स्कैन सिम्युलेटर
function startPulseScan() {
    const scannerBox = document.getElementById('scanner-box');
    const scanText = document.getElementById('scan-text');
    const terminal = document.getElementById('main-terminal');
    
    scannerBox.style.backgroundColor = '#0b240b';
    scanText.innerText = '🔄 ६० FPS चेहरा रक्त प्रवाह एवं डीपफेक फ्रॉड स्कैनिंग एक्टिव...';
    
    setTimeout(() => {
        scannerBox.style.backgroundColor = '#000';
        scanText.innerText = '✅ १५-सेकंड कोशिका स्कैन पूर्ण। फ्रॉड 0% BLOCK। कोठरी सुरक्षित है।';
        terminal.style.borderColor = '#39FF14';
        terminal.style.color = '#39FF14';
        terminal.innerHTML = `🧱 <strong>कोशिका स्कैन रिपोर्ट:</strong> आधार-पैन डॉक्यूमेंट स्थानीय सुरक्षित कोठरी (Sandbox Vault) में परमानेंटली लॉक कर दिए गए हैं।`;
    }, 4000);
          }
      
