// This could be read from a config file (JSON)
// one could use default arguments for openWebSocket
// but it would require additional polyfilling (ES6 support)
var url = 'ws://localhost:8080';

/**
 * Returns an objectStore object. The underlaying transaction object has READWRITE flags.
 * @function
 * @name openDB
 * @return Promise.{IDBobjectStore}
 */
function openDB() {
    return new Promise(function(resolve, reject) {
       var request = window.indexedDB.open('Simulant', 1);
       
       // Might be used in future to do migrations
       request.onupgradeneeded = function(event){
           if(!event.target.result.objectStoreNames.contains('cells')){
               store = window.db.createObjectStore('cells', {
                   multiEntry: true,
                   unique: true
               });
           }
       };
       
       request.onsuccess = function(event) {
           let transaction = event.target.result.transaction(['cells'], 'readwrite');
           let objectStorage = transaction.objectStore('cells');
           resolve(objectStorage); // Return the objectStorage object whom we can work with
           // Is this correct with the W3C standards?
           // TODO: Check for TransactionInactiveError
       };
       
       request.onerror = function() {
           reject(Error('Database initialisation failed'));
       };
    });
}


// NOTE: This could be done in a class/function design but it get's really messy
let webSocket = new WebSocket(url);

webSocket.onopen = function() {
    // This certainly ALWAYS work's without error tracing (since UUID/NULL is still valid JSON)
    var msg = { type: 'uuid', data: sessionStorage.getItem('uuid')};
    webSocket.send(JSON.stringify(msg));
}

webSocket.onerror = function(error) {
    throw error;
}

/**
 * Handles message processing for the webSocket
 * @function
 * @name webSocket.onmessage
 * @param event
 */
webSocket.onmessage = function(event) {
    let message = JSON.parse(event.data);
    console.log(message);
    
    // TODO: Add error proccessing
    if (message.type == 'uuid') {
        openDB().then(function(objectStore) {
            window.sessionStorage.setItem('uuid', message.data);
            let objectStoreRequest = objectStore.clear(); // Clear the indexedDB storage on handshake 
        });
    } else if (message.type == 'item') {
        openDB().then(function(objectStore) {
            let itemRequest = objectStore.put(message.data[1], message.data[0]);
        });
    }
}
