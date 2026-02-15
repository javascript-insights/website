window.addEventListener("load", function () {
    // Register main service worker for Application panel demonstration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Main Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }

    // Populate demo data so Application panel has content to explore
    // LocalStorage — visible in Application > Local Storage
    localStorage.setItem('app_theme', 'dark');
    localStorage.setItem('app_language', 'en');
    localStorage.setItem('app_version', '3.0.0');
    localStorage.setItem('last_visit', new Date().toISOString());
    localStorage.setItem('user_settings', JSON.stringify({
        notifications: true,
        autoSync: false,
        fontSize: 16
    }));

    // SessionStorage — visible in Application > Session Storage
    sessionStorage.setItem('session_id', Math.random().toString(36).slice(2));
    sessionStorage.setItem('session_start', new Date().toISOString());
    sessionStorage.setItem('page_views', '1');

    // Cookies — visible in Application > Cookies
    document.cookie = 'user_preference=devtools_fan; path=/; max-age=31536000; SameSite=Lax';
    document.cookie = 'demo_cookie=theoretical_3; path=/; max-age=31536000; SameSite=Lax';
    document.cookie = 'theme=dark; path=/; max-age=86400; SameSite=Strict';

    // IndexedDB — visible in Application > IndexedDB
    const dbRequest = indexedDB.open('DemoDatabase', 1);
    dbRequest.onupgradeneeded = function(event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('notes')) {
            const store = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
            store.createIndex('title', 'title', { unique: false });
            store.createIndex('date', 'date', { unique: false });
        }
    };
    dbRequest.onsuccess = function(event) {
        const db = event.target.result;
        const tx = db.transaction('notes', 'readwrite');
        const store = tx.objectStore('notes');
        store.put({ id: 1, title: 'Welcome to Application Panel', content: 'Explore storage, service workers, and background services!', date: new Date().toISOString() });
        store.put({ id: 2, title: 'DevTools Tip', content: 'Click on any storage type in the sidebar to inspect its contents.', date: new Date().toISOString() });
        store.put({ id: 3, title: 'Background Services', content: 'Use the record button to capture background events.', date: new Date().toISOString() });
        console.log('IndexedDB demo data populated');
    };

    console.log('Application panel demo data initialized! Check:\n  - Local Storage\n  - Session Storage\n  - Cookies\n  - IndexedDB\n  - Cache Storage (after SW activates)\n  - Service Workers');
});