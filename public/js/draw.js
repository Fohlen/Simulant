var svg = d3.select('svg');

/**
 * Returns all cells from indexedDB
 * @function
 * @name loadCells
 * @return {Promise.object[]}
 */
function loadCells() {
    return new Promise(function(resolve, reject) {
        openDB('readonly').then(function(objectStore) {
            let items = [];
            let cursorRequest = objectStore.openCursor().onsuccess = function(event) {
                let cursor = event.target.result;
                if (cursor) {
                    items.push(cursor.key);
                    cursor.continue();
                } else {
                    resolve(items);
                }
            }
         });
    });
}

/**
 * Returns the color of a given cell
 * @function
 * @name loadCellColor
 * @return {string}
 */
function loadCellColor(coordinate) {
    return new Promise(function(resolve, reject) {
        openDB('readonly').then(function(objectStore) {
           let request = objectStore.get(coordinate);
           
           request.onsuccess = function(event) {
               resolve(event.target.result);
           }
           
           request.onerror = function(event) {
               reject(event);
           }
        });
    }); 
}

window.addEventListener('load', function(event) {
    loadCells().then(function(items) {
        var circle = svg.selectAll('circle').data(items, function(d) { return d; });
        circle.enter().append('circle')
            .attr('cx', function(d) { return d[0]; })
            .attr('cy', function(d) { return d[1]; })
            .attr('r', 1);
        
        
        d3.selectAll('circle').style('fill', function(d) {
            let self = this;
            loadCellColor(d).then(function(color) {
               d3.select(self).style('fill', color); 
            });            
        });
    })
});



window.addEventListener('item', function(event) {
    openDB('readonly').then(function(objectStorage) {  
        var circle = svg.selectAll('circle').filter(function(d) { return d == event.coordinate } );
        
        objectStorage.get(coordinate).onsuccess = function(event) {
            circle.style('fill', event.target.result);
        }
    });
});

