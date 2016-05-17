// Add attribute
var defaultRule = require('./Attributes/Rules/Default');
var Oxygen = require('./Attributes/Oxygen')(new defaultRule);

Oxygen.cornucopia = 1; // Set to 100%

var Cell = require('./Cell')([Oxygen]);
var Room = require('./Room')(2);

var elements = [];

// Do a 2-dimensional simulation for 100 cells
for (var i = 0; i < 100; i++) {
    elements.push[Cell];
}

var automat = require('./Automat')(elements, Room);
automat.loop();
