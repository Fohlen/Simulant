/**
 * The default attribute (for testing). Base color is blue
 * @name Oxygen
 * @type Attribute
 * 
 * @constructor
 * @param {Rule} rule - the rule to use for Oxygen
 */

var Oxygen = function(rule) {
    this.rule = rule;
    this.name = 'Oxygen';
    this.max = 1.2;
    this.color = 'blue';
    
    this.cornucopia = 1;
}

module.exports = Oxygen;