/**
 * @typedef Coordinate
 * @type array
 * @property {int} x
 * @property {int} y
 * @property {int} z
 * 
 * @example
 * var a = [2, 4]; // Represents x = 2, y = 4
 * var b = [1, 5, 7]; // Represents x = 1, y = 5, z = 7
 */

/**
 * The virtual room created to simulate cells
 * @class
 * @name Room
 * 
 */

var Room = class {
    /**
     * @constructor
     * @param {int} dimension - How many dimension should we operate at? Currently 2 simulation are supported.
     */
    constructor(dimensions) {
        /** 
         * @member
         * @name Room.dimensions
         * @type {int}
         */
        this.dimensions = dimensions;
        this.registry = new WeakMap(); /** @private */
    }
    
    /**
     * Push a Cell to the Room
     * @function
     * @name Room.push
     * @param {Coordinate} coordinate
     * @param {Cell} cell
     */
    push(coordinate, cell) {
        this.registry.set(coordinate, cell);
    }
    
    /**
     * Apply's a callback for the given cell
     * @function
     * @name Room.apply
     * @param {Coordinate} Coordinate
     * @param {function} callback
     * @return Returns undefined if no cell exists at the given coordinate
     */
    apply(coordinate, callback) {
        var cell = this.registry.get(coordinate);
        if (cell === undefined) {
            // Nothing is done here
            return undefined;
        } else {
            cell = callback(cell);
            this.registry.set(coordinate, cell);
        }
    }
    
    /**
     * Discover the neighbours of the given cell
     * @function
     * @name Room.neighbours
     * @param {Coordinate} coordinate
     * @return {Coordinate[]}
     */
    neighbours(coordinate) {
        // This is mathematically to be described as
        // P(p¹/p²) +- 1
        // P(p¹/p²/p³) +- 1
        
        var coordinates = [];
        
        // Use step size 2 so we interpolate the actual coordinate
        // TODO: This could probably be done in one loop
        // Anyhow I'm not sure if it'd be less performant
        if (this.dimensions == 2) {
            for (var i = coordinate[0] - 1; i < coordinate[0] + 1; i += 2) {
                for (var j = coordinate[1] - 1; j < coordinate[1] +1; j += 2) {
                    var c = this.registry.get([i, j]);

                    if (c !== undefined && c.alive) {
                        coordinates.push([i, j]);
                    }
                }
            }
        } else if (this.dimensions == 3) {
            for (var i = coordinate[0] -1; i < coordinate[0] + 1; i += 2) {
                for (var j = coordinate[1] - 1; j < coordinate[1] + 1; j += 2) {
                    for (var k = coordinate[2] - 1; k < coordinate[2] + 1; k += 2) {
                        var c = this.registry.get([i, j, k]);
                        
                        if (c !== undefined && c.alive) {
                            coordinates.push([i,j,k]);
                        }
                    }
                }
            }
        }
    }
    
    
   /**
    * @private
    * Following function describes a mathematical sequence to find
    * triangles in a infinite rectangle (x and y axis).
    * For example
    * -
    * --
    * ---
    * ----
    * (4x4 rows)
    * And returns it's amount of 1x1 boxes
    * 
    * a(n) = a(n – 1) + (n + 1) with a(1) = 3
    */
    sequence2D(n) {
        if (n > 1) {
            return this.sequence2D(n - 1) + (n + 1);
        } else if (n == 1) {
            return 3;
        } else {
            throw new RangeError("A sequence operates on positive numbers.");
        }
    }
    
    /**
     * Find a combination of rows that fits a triangle (for initialization).
     * For instance
     * x
     * xx
     * xxx
     * is a 2-dimensional field of 3x3 rows
     * 
     * @function
     * @name Room.findTriangle
     * @param {int} size - How many cells we want to use
     * @return {int[]} Returns x/y/z row max 
     * 
     * @todo Currently only 2D is supported
     * @todo Such functionality should be outsourced probably
     */
    
    findTriangle(size) {
        if (this.dimensions == 2) {
            let A = 1;
            let n = 0;

            do {
                A = this.sequence2D(n + 1);
                n++;
            } while (size > A);
            
            console.log(n);
            
            // If the modulus of product and size equal zero
            // there is no leftover ..
            // Otherwise add 1 more row to x
            var x = (A % size) > 0 ? n + 1 : n;
            
            return [x, n];
        }
    }
}


module.exports = Room;
