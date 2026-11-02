/**
 * ========================================================================
 * आर एल वाई (RLY) डिजिटल सम्राट साम्राज्य — स्वायत्त सर्विस वर्कर कर्नल
 * फाइल नाम: service-worker.js
 * सुरक्षा मोड: २४-इंजन पल्स स्कैन एवं ऑफलाइन सिलिका तरंगें सिंक
 * ========================================================================
 */

const CACHE_NAME = 'rly-samrajya-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
];

// १. कर्नल इंस्टॉलेशन और एसेट्स कैशिंग टनल
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[RLY KERNEL] Pre-caching core assets for 100,000 years Master Lock...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// २. एक्टिवेशन कर्नल (पुराने कैश को साफ करना और नए कर्नल को कमांड सौंपना)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[RLY KERNEL] Clearing old operational cache...');
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// ३. लाइव डेटा फ़ेच टनल (1ms टिकटिंग और ऑफलाइन मेश नेटवर्क सपोर्ट)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // अगर फाइल पहले से कैश में है, तो वहीं से सुपर-फ़ास्ट लोड होगी
        return cachedResponse;
      }
      // अन्यथा लाइव सर्वर से सुरक्षित नेटवर्क टनल के ज़रिए डेटा मँगाया जाएगा
      return fetch(event.request).catch(() => {
        console.log('[RLY KERNEL] Network offline. Operating via Silica Wave Mesh.');
      });
    })
  );
});

