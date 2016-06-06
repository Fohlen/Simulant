var svg = d3.select('svg');

function loadItems() {
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


window.addEventListener('load', function(event) {
    loadItems().then(function(items) {
        var circle = svg.selectAll('circle').data(items, function(d) { return d; });
        circle.enter().append('circle')
            .attr('cx', function(d) { return d[0]; })
            .attr('cy', function(d) { return d[1]; })
            .attr('r', function(d) { return 1; })
            .style('fill', function(d) { return 'blue'; });
    })
});



window.addEventListener('item', function(event) {
    openDB('readonly').then(function(objectStorage) {  
        
    });
});

