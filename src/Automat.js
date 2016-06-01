/**
 * A automat to execute cellular tasks
 */

var Automat = class {
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
        var i = 0;
        
        // TODO: This is broken (doesn't arrange propperly)
        // TODO: OUTSOURCE THIS FUNCTIONALITY
        for (var y = 1; y < rows[1]; y++) {
            for (var x = rows[0]; x > 0; x--) {
                if (i < cells.length) {
                    let coordinate = [x, y]; // this placeholder is really important
                    this.room.push(coordinate, cells[i]);
                    this.elements.add(coordinate);
                    i++;  
                }
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