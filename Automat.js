/**
 * A automat to execute cellular tasks
 * @name Automat
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
        
        while (i < cells.length) {
            for (var y = 0; y < rows[1]; y++) {
                for (var x = rows[0]; x > 0; x--) {
                    this.room.push([x, y], cells[i]);
                    this.elements.add([x, y]);
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