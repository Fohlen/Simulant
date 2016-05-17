/**
 * A automat to execute cellular tasks
 * @name Automat
 * @constructor
 * @param {Cell[]} elements - Initialized cells
 * @param {Room} room - Room object to use
 */

function Automat(elements, room) {
    this.elements = []; /** @private */
    this.room = room /** @private */
    
    /**
     * @function
     * @name Automat.fill
     * @param {Cell[]} cells - The cells we deal with?
     * @todo Only 2D is currently supported
     */
    this.fill = function(cells) {
        var rows = this.room.findRows(cells.length);
        var i = 0;
        
        while (i < size) {
            for (var y = 0; y < room[1]; y++) {
                for (var x = room[0]; x > 0; x--) {
                    this.room.push([x, y], cells[i]);
                    i++;
                }
            }
        }
    };
    
    // Call the constructor
    this.fill(elements);
    
    /**
     * Loops over all elements in the room
     * This is used for living costs
     * @function
     * @name Automat.loop
     */
    this.loop = function() {
        this.elements.forEach(function(element) {
            element.live();
        });
    }
}

module.exports = Automat();