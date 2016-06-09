const Color = require('./index').Color;

/**
 * Synchronizes all cells to the given webSocket/client
 * @function
 * @name synchronize
 * @param {Automat}
 * @param {webSocket}
 */
exports.synchronize = function (automat, stream) {
    for (var value of automat.elements) {
        // Find the cell
        var c = automat.room.registry.get(value);
        stream.send(this.prepareMessage('item', [value, Color(c)]));
    }
}

/**
 * Returns a JSON-encoded message
 * @function
 * @param {string} type
 * @param {array|mixed} data 
 * @returns
 */
exports.prepareMessage = function(type, data) {
    // Instead objects we should use variadic functions!
    return JSON.stringify({type: type, data: data});
}