/**
 * Represents a cell.
 * @constructor
 * @param {Attribute[]} attributes
 */
function Cell(attributes) {
    this.attributes = {}; /* @private attributes */
    attributes.forEach(function(element) {
        this.attributes[element.name] = element; // name = attribute
    });
    
    this.alive = true; /* @member alive - A cell dies if one of it's attribute equals zero */
    
    /**
     * Spend the living costs for each attribute according to it's rule set.
     * @function
     * @name Cell.live
     */
    this.live = function() {
        this.attributes.forEach(function(element, index) {
            var cornucopia = this.attributes[index].cornucopia

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
    this.absorb = function(soak) {
        var res = {};
        
        attributes.forEach(function(element) {
            var spillover = this.attributes[element.name].Rule.absorb(element, element.cornucopia);
            this.attribute[element.name].cornucopia = this.attribute[element.name].cornucopia + spillover[0];
            res.push(spillover[1]);
        });
    }
    
}

module.exports = Cell;