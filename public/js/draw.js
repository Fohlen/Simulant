let transaction = window.db.transaction(['cells'], 'readonly');
let objectStore = transaction.objectStore('cells');
let range = IDBKeyRange.lowerBound(0); // All entries
let cursorRequest = objectStore.openCursor(range);

var data = [];

cursorRequest.onsuccess = function(event){
    console.log(event.target);
    data.push(event.target.result);
};


var svg = d3.select('svg');
var circle = svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
        .attr('r', 1)
        .attr('cy', function(d, i) { return 1 })
        .attr('cx', function(d, i) { return 2 })
        .attr('style', function(d, i) { return 'fill:steelblue' })