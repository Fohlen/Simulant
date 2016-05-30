// Use yargs for easy command-line handling
var argv = require('yargs')
    .usage('$0 [options]')
    .option('h', {
        alias: 'host',
        describe: 'The host to listen on',
        default: 'localhost'
    })
    .option('p', {
        alias: 'port',
        describe: 'Specify the server port',
        default: 8080
    })
    .help('help')
    .argv

/**
 * WebSocket implementation that follows this schemata
 * 
 * - handshake a client with a unique UUID
 *  - when a fresh handshake is delivered, spread all the cells
 * - TODO: send update notifications using Cell/Event-API
 */
var WebSocketServer = require('ws').Server;
const uuid = require('uuid');
//const TTL = 600000; // 10 minutes
var sessions = new Array(); // Don't enable caching yet

/**
 * Synchronizes all cells to the given webSocket/client
 * @function
 * @name synchronize
 * @param automat
 * @param webSocket
 * @returns
 */
function synchronize(stream) {
    
}

/**
 * Returns a JSON-encoded message
 * @function
 * @param type
 * @param data
 * @returns
 */
function prepareMessage(type, data) {
    return JSON.stringify({type: type, data: data});
}

wss = new WebSocketServer({ port: argv.port, host: argv.host });

// Handshaking functionality
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        message = JSON.parse(message); // Decode the message
        
        if (message.type == 'uuid') {
            if (!sessions.includes(message.data)) {
                let id = uuid.v4();
                sessions.push(id);
                ws.send(prepareMessage('uuid', id));
                // synchronize(ws);
            } else {
                ws.send(prepareMessage('uuid', message.data));
            }
        }       
    });
});