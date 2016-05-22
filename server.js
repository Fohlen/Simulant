/**
 * A websocket that delivers Simulant
 */

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

var WebSocketServer = require('ws').Server, wss = new WebSocketServer({ port: argv.port, host: argv.host });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    ws.send('something');
});