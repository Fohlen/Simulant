/**
 * Represents a cell.
 * TODO: Add an evented API
 */
var Cell = class {
    /**
     * @constructor
     * @param {Attribute[]} attributes
     */
    constructor(attributes) {
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
            } else {
                this.alive = false; // Kill the cell
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
            res.push(spillover[1]);
        });
    }
}

module.exports = Cell;