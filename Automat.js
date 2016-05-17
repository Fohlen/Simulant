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
     * @param {int} size - How many cells do we deal with?
     */
    this.fill = function(size) {

    };
    
    // Call the constructor
    this.fill(elements.length);
    
    /**
     * Loops over all elements in the room
     * This is used for living costs
     * @function
     * @name Automat.loop
     */
    this.loop = function() {
        this.elements.forEach();
    }
}