/**
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
    
    this.cornucopia = 0;
}

module.exports = Oxygen;