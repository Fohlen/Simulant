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
    
// Prepare a http.server object to use with http sessions before upgrade
var util = require('util');
var WebSocketServer = require('ws').Server;
var uuid = require('uuid');

wss = new WebSocketServer({ port: argv.port, host: argv.host });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log(message);
        message = JSON.parse(message);
        if (message.type == 'uuid') {
            ws.send(JSON.stringify({type:'uuid',uuid:uuid.v4()}));
        }
    });
});

wss.on('message', function(data, flags) {
    
});