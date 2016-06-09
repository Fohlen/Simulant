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

var cluster = require('cluster');
const uuid = require('uuid');
const util = require('./src/util');

/**
 * Automat logic
 * - initialise 100 cells
 */
const Rule = require('./src/Attributes/Rules/Default');
var Oxygen = require('./src/Attributes/Oxygen');
var Simulant = require('./src'); // Full library include

var ox = new Oxygen(Rule);
var cell = new Simulant.Cell([ox]);
var room = new Simulant.Room(2);
let cells = Array(9).fill(cell);
var automat = new Simulant.Automat(cells, room);

// Application sessions
var sessions = new Array();

// The master proccess does the automat, the slaves serve the webSockets
if(cluster.isMaster) {
    let numWorkers = require('os').cpus().length;

    //console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

} else {
    /**
     * WebSocket implementation that follows this schemata
     * 
     * - handshake a client with a unique UUID
     *  - when a fresh handshake is delivered, spread all the cells
     * - TODO: send update notifications using Cell/Event-API
     */
    var WebSocketServer = require('ws').Server;
    //const TTL = 600000; // 10 minutes
    
    wss = new WebSocketServer({ port: argv.port, host: argv.host });

    // Handshaking functionality
    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            message = JSON.parse(message); // Decode the message
         
            if (message.type == 'uuid') {
                if (!sessions.includes(message.data)) {
                    let id = uuid.v4();
                    sessions.push(id);
                    ws.send(util.prepareMessage('uuid', id));
                    util.synchronize(automat, ws);
                } else {
                    ws.send(util.prepareMessage('uuid', message.data));
                }
            }       
     });
 });
}


