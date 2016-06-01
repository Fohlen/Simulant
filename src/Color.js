/**
 * Takes a cell and creates a color based upon it's attributes
 * @function
 * @name Color
 * @param {Cell}
 * @return {string}
 * @requires sumi-color
 */

var Palette = require('sumi-color').Palette;

function Color(cell) {
    let colors = [], 
    ratios = [];
    
    for (var value of cell.attributes.values()) {
        colors.push(value.color);
        ratios.push(value.cornucopia);
    }
    
    let p = new Palette(colors, ratios);
    return p.css();
}

module.exports = Color;