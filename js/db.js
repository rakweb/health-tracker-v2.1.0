const DB_NAME = "health-tracker-db";
const STORE = "entries";
let db;

/* ✅ OPEN DB */
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);

    req.onupgradeneeded = (e) => {
      db = e.target.result;
      db.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
    };

    req.onsuccess = (e) => {
      db = e.target.result;
      resolve(db);
    };

    req.onerror = reject;
  });
}

/* ✅ ADD ENTRY */
function addEntry(entry) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).add(entry);
    tx.oncomplete = resolve;
    tx.onerror = reject;
  });
}

/* ✅ GET ALL */
function getEntries() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).getAll();

    req.onsuccess = () => resolve(req.result);
    req.onerror = reject;
  });
}

/* ✅ CLEAR */
function clearEntries() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).clear();
    tx.oncomplete = resolve;
    tx.onerror = reject;
  });
}
