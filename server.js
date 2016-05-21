/**
 * Following is a web server that serves our simulations
 */

var express = require('express');
var app = express();

// Serve all the files from public (this is where our PaperJS application resides)
app.use(express.static(__dirname + '/public'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
