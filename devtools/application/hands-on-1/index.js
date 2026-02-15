document.addEventListener('DOMContentLoaded', () => {

});

// Initialize IndexedDB
const dbName = 'ZooDB';
let db;
const request = indexedDB.open(dbName, 1);

request.onerror = (event) => console.error("Database error:", event.target.error);

request.onsuccess = (event) => {
    db = event.target.result;
};

request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains('animals')) {
        db.createObjectStore('animals', { keyPath: 'id', autoIncrement: true });
    }
};

function addAnimal(name, emoji) {
    const transaction = db.transaction(['animals'], 'readwrite');
    const store = transaction.objectStore('animals');
    store.add({ name: name, emoji: emoji, added: new Date() });
}