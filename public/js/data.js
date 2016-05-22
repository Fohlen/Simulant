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
// Define a default URL -> need a way for this in production
var url = 'ws://localhost:8080';
var webSocket = new WebSocket(url);

webSocket.onopen = function(event) {
    var msg = { type: 'uuid', data: sessionStorage.getItem('uuid')};
    webSocket.send(JSON.stringify(msg));
};

webSocket.addEventListener("message", function(event) {
    message = JSON.parse(event.data);
    if (message.type == 'uuid') sessionStorage.setItem('uuid', message.uuid);
});

window.globals = {
    socket: webSocket
}
