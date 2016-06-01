/**
 * This is a brief explanation of how things work
 * When a WebSocket is opened we "handshake" with the server checking for a UUID in
 * the current sessionStorage. These are distributed by the server and stored with
 * a short TTL on server-side (to identify "unique" sessions).
 * When a fresh UUID is assigned the current simulation storage is cleared and
 * re-delivered by the server, being saved into IndexedDB (this can happen
 * asynchronously).
 * The webSocket.onmessage event is then bound to our PaperScript scope
 * whereas it is re-drawn with the Animation API.
 * The client comes with a minified representation of the Simulant framework
 * [Coordinate] = [condition]
 * on which a condition is likely a nested Array<float> represented using colors on our simulantCanvas.
 * -> TADA: visual representation of a complex cellular automatum
 */

var request = window.indexedDB.open('Simulant', 1);
request.onupgradeneeded = function(event){
    window.db = event.target.result;
    if(!window.db.objectStoreNames.contains('cells')){
        store = window.db.createObjectStore('cells', {
            multiEntry: true,
            unique: true
        });
    }
};

request.onsuccess = function(event) {
    window.db = event.target.result; // Use the global scope
    
    let transaction = window.db.transaction(['cells'], 'readonly');
    let objectStore = transaction.objectStore('cells');
    let cursorRequest = objectStore.openCursor();

    var data = new Array();

    cursorRequest.onsuccess = function(event){
        if (event.target.result != null) {
            data.push({key: event.target.result.key, value: event.target.result.value});
            event.target.result.continue();
        }
    };
    
    var svg = d3.select('svg');
    var circle = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
            .attr('r', 1)
            .attr('cx', function(d) { return d.key[0] })
            .attr('cy', function(d) { return d.key[1] })
            .attr('style', function(d) { return 'fill:' + d.value })
};

//Define a default URL -> need a way for this in production
var url = 'ws://localhost:8080';
var webSocket = new WebSocket(url);

webSocket.onerror = function(event) {
    // Do some error magic here
};

webSocket.onopen = function(event) {
    var msg = { type: 'uuid', data: sessionStorage.getItem('uuid')};
    webSocket.send(JSON.stringify(msg));
};

webSocket.addEventListener('message', function(event) {
    try {
        message = JSON.parse(event.data);
    } finally {
        switch (message.type) {
            case 'uuid':
                let id = sessionStorage.getItem('uuid');
                if (id != message.data) {
                    sessionStorage.setItem('uuid', message.data);
                    let transaction = window.db.transaction(['cells'], 'readwrite');
                    let objectStore = transaction.objectStore('cells');
                    let objectStoreRequest = objectStore.clear();
                }
                break;
            case 'item':
                let transaction = window.db.transaction(['cells'], 'readwrite');
                let objectStore = transaction.objectStore('cells');
                // This should be handled with variadic messages
                // Currently hardcoded: Coordinate, color
                let request = objectStore.add(message.data[1], message.data[0]);
                break;
        }
    }
});
