document.addEventListener('DOMContentLoaded', () => {

});

// Initialize IndexedDB
const dbName = 'ZooDB';
const request = indexedDB.open(dbName, 1);

request.onerror = (event) => console.error("Database error:", event.target.error);

request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains('animals')) {
        db.createObjectStore('animals', { keyPath: 'id', autoIncrement: true });
    }
};

function addAnimal(name, emoji) {
    const request = indexedDB.open(dbName);
    request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['animals'], 'readwrite');
        const store = transaction.objectStore('animals');
        store.add({ name: name, emoji: emoji, added: new Date() });
    };
}