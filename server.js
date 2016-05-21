/**
 * A websocket that delivers Ice2JS
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

var ws = require('nodejs-websocket');

//Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
        console.log("Received "+str)
        conn.sendText(str.toUpperCase()+"!!!")
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
}).listen(argv.port, argv.host);
    