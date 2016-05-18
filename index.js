var Cell = require('./Cell');
var Room = require('./Room');
var Automat = require('./Automat');

//Add attribute
var defaultRule = require('./Attributes/Rules/Default');
var Oxygen = require('./Attributes/Oxygen');

var ox = new Oxygen(defaultRule);
ox.cornucopia = 1; // Set to 100%

var c = new Cell([ox]);
var r = new Room(2);

var elements = [];

// Do a 2-dimensional simulation for 100 cells
for (var i = 0; i < 100; i++) {
    elements.push(c);
}

var auto = new Automat(elements, r);
auto.loop();
