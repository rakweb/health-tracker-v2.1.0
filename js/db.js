const DB_NAME = "health-tracker-db";
const STORE = "entries";
let db;

/* ✅ OPEN DB */
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("health-tracker-db", 2); // ✅ bump version

    req.onupgradeneeded = (e) => {
      const db = e.target.result;

      // ✅ Create store ONLY if missing
      if (!db.objectStoreNames.contains("entries")) {
        db.createObjectStore("entries", {
          keyPath: "id",
          autoIncrement: true
        });
      }
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
