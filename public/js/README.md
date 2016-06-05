This is a brief explanation of how things work:

 * When a WebSocket is opened we handshake the server by sending the current UUID from the sessionStorage
 * The server distributes UUID's with a limited TTL
 * When a UUID is unknown or expired we re-deliver the current Automat
 
Contents are stored by the following scheme
 * An event listener checks for onMessage on our webSocket
 * When a new item is retrieved it will be saved to indexedDB in the following format
 
```
[Coordinate] = rgb(colorcode)
// Wheras colors are mixed from the Cell's base color(s) on server side
```
which allows for a visual representation with d3.js
d3 however is bound to update events of IndexedDB and will update accordingly if something happens.
*TADA:* cellular automatum in the browser
