/**
 * A automat to execute cellular tasks
 */

class Automat {
    /**
     * @constructor
     * @param {Cell[]} elements - Initialized cells
     * @param {Room} room - Room object to use
     */
    constructor(elements, room) {
        this.elements = new Set(); /** @private */
        this.room = room /** @private */
        
        this.fill(elements);
    }
    
    /**
     * @function
     * @name Automat.fill
     * @param {Cell[]} cells - The cells we deal with?
     * @todo Only 2D is currently supported
     */
    fill(cells) {
        var rows = this.room.findTriangle(cells.length);
        let i = 0; // This is WTF. Apparently there's no useful array iterator (such as .next) without prototyping. Well.
        
        // TODO: OUTSOURCE THIS FUNCTIONALITY
        for (var x = rows[0]; x > 0; x--) {
            for (var y = rows[1]; y > 0; y--) {
                if (y > x ) continue; 
                let coordinate = [x, y]; // needs a placeholder variable since weakly shared keys are garbaged otherwise                
                this.room.push(coordinate, cells[i]);
                this.elements.add(coordinate);
                i++;
            }
        }
    };
    
    /**
     * Loops over all elements in the room
     * This is used for living costs
     * @function
     * @name Automat.loop
     */
    loop() {
        let self = this;
        
        this.elements.forEach(function(element) {
            self.room.apply(element, function(cell) {
                cell.live();
            });
        });
    }
}

module.exports = Automat;