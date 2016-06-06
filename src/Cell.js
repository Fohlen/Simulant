var EventEmitter = require('events');
/**
 * Represents a cell.
 */
class Cell extends EventEmitter {
    /**
     * @constructor
     * @param {Attribute[]} attributes
     */
    constructor(attributes) {
        super(); // Make this an eventEmitter
        this.attributes = new Map();
        this.alive = true;
        let self = this;
        
        attributes.forEach(function(element) {
           self.attributes.set(element.name, element); 
        });
        
    }
    
    /**
     * @member Cell.attributes
     * @type {Map.<string, Attribute>}
     */
    
    /**
     * Spend the living costs for each attribute according to it's rule set.
     * @function
     * @name Cell.live
     */
    live() {
        this.attributes.forEach(function(element, index) {
            var cornucopia = this.attributes[index].cornucopia;

            var spending = this.attributes[index].Rule.live(element);
            if (cornucopia > 0 && spending < cornucopia) {
                this.attributes[index].cornucopia = cornucopia - spending; // Reduce cornucopia
                this.emit('change', {attribute: index, cornucopia: this.attributes[index].cornucopia });
            } else {
                this.alive = false; // Kill the cell
                this.emit('dead');
            }
        });
    };
    
    /**
     * The cell absorbs the given attribute(s).
     * In case there is a spill-over the cell will automatically distribute it's goods. 
     * @function
     * @name Cell.absorb
     * @param {Attribute[]} attributes
     * @return {float[]}  Returns an array of spill-over's in the order of attributes given
     */
    absorb(soak) {
        var res = {};
        
        attributes.forEach(function(element) {
            var spillover = this.attributes[element.name].Rule.absorb(element, element.cornucopia);
            this.attribute[element.name].cornucopia = this.attribute[element.name].cornucopia + spillover[0];
            this.emit('change', {attribute: element.name, cornucopia: this.attributes[element.name].cornucopia });
            res.push(spillover[1]);
        });
        
        this.emit('spillover', {res});
    }
}

module.exports = Cell;