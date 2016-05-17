/**
 * @name Oxygen
 * @ŧype Attribute
 * 
 * @constructor
 * @type {Rule} Rule - the rule to use for Oxygen
 */

function Oxygen(rule) {
    this.rule = rule;
    this.name = 'Oxygen';
    this.max = 1.2;
    
    this.cornucopia = 0;
}

module.exports = Oxygen(rule);