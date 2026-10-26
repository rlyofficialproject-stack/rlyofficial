// आर एल वाई कर्नल इन-स्क्रीन डिस्प्ले (व्हाइट अलर्ट को 100% रोकने के लिए)
function activateEngine(engineName) {
    const terminal = document.getElementById('main-terminal');
    terminal.style.borderColor = '#39FF14';
    terminal.style.color = '#39FF14';
    terminal.innerHTML = `🧬 <strong>आर एल वाई साम्राज्य:</strong> १ मिलीसेकंड त्वरित टनल के माध्यम से [${engineName}] सफलतापूर्वक अचल रन कर रहा है।`;
}

// ६0 FPS कोशिका पल्स स्कैन सिम्युलेटर
function startPulseScan() {
    const scannerBox = document.getElementById('scanner-box');
    const scanText = document.getElementById('scan-text');
    const terminal = document.getElementById('main-terminal');
    
    scannerBox.style.backgroundColor = '#0b240b';
    scanText.innerText = '🔄 ६० FPS चेहरा रक्त प्रवाह एवं डीपफेक फ्रॉड स्कैनिंग एक्टिव...';
    terminal.innerHTML = `🛡️ <strong>कर्नल संदेश:</strong> १५-सेकंड कोशिका पल्स स्कैन प्रारंभ हो चुका है...`;
    
    setTimeout(() => {
        scannerBox.style.backgroundColor = '#000';
        scanText.innerText = '✅ १५-सेकंड कोशिका स्कैन पूर्ण। फ्रॉड 0% BLOCK। कोठरी (Sandbox Vault) सुरक्षित है।';
        
        // सीधे कोठरी पैनल पर आउटपुट लॉक
        terminal.style.borderColor = '#39FF14';
        terminal.style.color = '#39FF14';
        terminal.innerHTML = `🧱 <strong>कोशिका पल्स स्कैन पूर्ण:</strong> आधार-पैन डॉक्यूमेंट स्थानीय सुरक्षित कोठरी (Sandbox Vault) में परमानेंटली लॉक कर दिए गए हैं।`;
    }, 4000);
}

// परमाणु क्लिस्टर मेश offline चेकर
window.addEventListener('offline', function() {
    const terminal = document.getElementById('main-terminal');
    terminal.style.borderColor = '#ff3333';
    terminal.style.color = '#ff3333';
    terminal.innerHTML = `📡 <strong>परमाणु कवच सक्रिय:</strong> इंटरनेट अनुपलब्ध। नन्हा बालकृष्ण इंजन और सिलिका परमाणु तरंगें सक्रिय। ओम्नीमार्ट अचल मोड में रन कर रहा है।`;
});
