let db;
let dbReady;

function openDB() {
  if (dbReady) return dbReady;   // ✅ reuse same promise

  dbReady = new Promise((resolve, reject) => {
    const req = indexedDB.open("health-tracker-db", 2);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;

      if (!db.objectStoreNames.contains("entries")) {
        db.createObjectStore("entries", {
          keyPath: "id",
          autoIncrement: true
        });
      }

      if (!db.objectStoreNames.contains("config")) {
        db.createObjectStore("config");
      }
    };

    req.onsuccess = (e) => {
      db = e.target.result;

      // ✅ Critical: handle version changes safely
      db.onversionchange = () => {
        db.close();
      };

      resolve(db);
    };

    req.onerror = reject;
  });

  return dbReady;
}
