// Creating a map object.
var myMap = L.map("map", {
  center: [14.716677, -17.467686],
  zoom: 2.2
});

// Adding a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var url = "http://127.0.0.1:5000/get_data"

// Promise Pending
d3.json(url)
  .then(function(data) {
    // Process and use the data here
    console.log("Data: ", data);
  })
 