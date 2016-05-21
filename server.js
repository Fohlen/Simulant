/**
 * Following is a web server that serves our simulations
 * @todo Static file handling could be done using nginx - only use server.js for websocket
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
        default: 3000
    })
    .help('help')
    .argv
    
var express = require('express');
var app = express();

// Serve all the files from public (this is where our PaperJS application resides)
app.use(express.static(__dirname + '/public'));

app.listen(argv.port, argv.host, function () {
    console.log('Simulant server running on port ' + argv.port);
});
