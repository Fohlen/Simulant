/**
 * This function takes an IDBCursor, waits for the message and yields it's results
 * 
 * @function
 * @getItem
 * @type generator
 * @param IDBCursor
 * 
 * @example
 * let data = [];
 * cursor = ...
 * 
 * iterator = getItem(cursor);
 * while (!iterator.current().done) {
 *  data.push(iterator.current().value);
 *  iterator.next();
 * }
 * 
 * 
function* getItem(cursor) {
    
}
 */
