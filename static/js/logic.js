// Creating a map object.
// var myMap = L.map("map", {
   //  center: [14.716677, -17.467686],
   // zoom: 2.2
 // });
  
  // Adding a tile layer.
 // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
 // }).addTo(myMap);
  
  var url = "http://127.0.0.1:5000/get_data"
  
  // Promise Pending
  const dataPromise = d3.json(url);
  console.log("Data Promise: ", dataPromise);

// Get the data for the selected city.
function getData(city) {
  return dataPromise.then(function(data) {
    return data.filter(function(d) {
      return d.city === city;
    });
  });
}

// Update the line plot.
function updatePlot(city) {
  getData(city).then(function(data) {
    // Format the date.
    var parseDate = d3.timeParse("%a, %d %b %Y %H:%M:%S %Z");
    data.forEach(function(d) {
      d.date = parseDate(d.date);
    });

    // Set the dimensions of the plot.
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = 600 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    // Create the scales.
    var xScale = d3.scaleTime().range([0, width]);
    var yScale = d3.scaleLinear().range([height, 0]);

    // Create the axes.
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // Create the line functions.
    var tempLine = d3.line()
      .x(function(d) { return xScale(d.date); })
      .y(function(d) { return yScale(d.temperature_2m_deg_c); });
    var humLine = d3.line()
      .x(function(d) { return xScale(d.date); })
      .y(function(d) { return yScale(d.relativehumidity_2m_perc); });
    var windLine = d3.line()
      .x(function(d) { return xScale(d.date); })
      .y(function(d) { return yScale(d.windspeed_10m_kmh); });

    // Create the SVG element.
    var svg = d3.select("#plot")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Set the domains of the scales.
    xScale.domain(d3.extent(data, function(d) { return d.date; }));
    yScale.domain([0, d3.max(data, function(d) {
      return Math.max(d.temperature_2m_deg_c, d.relativehumidity_2m_perc, d.windspeed_10m_kmh);
    })]);

    // Add the temperature line.
    svg.append("path")
      .datum(data)
      .attr("class", "line temp-line")
      .attr("d", tempLine);

 // Add the humidity line.
 svg.append("path")
 .datum(data)
 .attr("class", "line hum-line")
 .attr("d", humLine);

// Add the wind speed line.
svg.append("path")
 .datum(data)
 .attr("class", "line wind-line")
 .attr("d", windLine);

// Add the x-axis.
svg.append("g")
 .attr("class", "axis x-axis")
 .attr("transform", "translate(0," + height + ")")
 .call(xAxis);

// Add the y-axis.
svg.append("g")
 .attr("class", "axis y-axis")
 .call(yAxis);

// Add the axis labels.
svg.append("text")
 .attr("class", "axis-label")
 .attr("transform", "rotate(-90)")
 .attr("y", 0 - margin.left)
 .attr("x", 0 - (height / 2))
 .attr("dy", "1em")
 .style("text-anchor", "middle")
 .text("Temperature, Humidity, Wind Speed");

svg.append("text")
 .attr("class", "axis-label")
 .attr("y", height + margin.bottom - 5)
 .attr("x", width / 2)
 .style("text-anchor", "middle")
 .text("Date");
});
}

// Set the initial city.
var city = "Beijing";

// Update the plot when the city is changed.
d3.select("#city-select").on("change", function() {
city = d3.select(this).property("value");
d3.selectAll(".line").remove();
updatePlot(city);
});

// Update the plot for the initial city.
updatePlot(city);
  
  // Performing a GET request to the query URL/
  //d3.json(url).then(function (data){
    // Once we get a response, sending the data.features object to the getFeatures function.
    //getFeatures(data.features);
  //});
  
  //function getFeatures(earthquakeData) {
    // Defining a functions that we want to run once for each feature in the features array.
    //markerSize(earthquakeData);
    // Defining a markerSize() function that will give each earthquake feature a different radius based on its magnitude.
    //function markerSize(mag) {
      //return mag * 50000;
    //}
    //Creating a gradient color palette (function to be called later), using ColorBrewer2.org
    //function getColor(d) {
      //return d > 150 ? '#49006a' :
             //d > 90 ? '#7a0177' :
             //d > 70 ? '#ae017e' :
             //d > 50 ? '#dd3497' :
             //d > 30 ? '#f768a1' :
             //d > 20 ? '#fa9fb5' :
             //d > 10 ? '#fcc5c0' :
             //d > 0  ? '#fde0dd' :
                      //'#fff7f3';                 
    //}
    
    //Looping through the earthquakeData to get parameters needed such as coordinates, magnitude and depth
    //for (var i = 0; i < earthquakeData.length; i++) {
      //console.log(earthquakeData[i]);
      //L.circle([earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0]], {
        //fillOpacity: 1,
        //color: "white",
        // Setting our circle's color to equal the output of our getColor() function:
        //fillColor: getColor(earthquakeData[i].geometry.coordinates[2]),
        // Setting our circle's radius to equal the output of our markerSize() function:
        //radius: markerSize(earthquakeData[i].properties.mag)
      //}).bindPopup(`<h3>${earthquakeData[i].properties.place}</h3><hr><p>Earthquake of ${earthquakeData[i].properties.mag.toLocaleString()} magnitude and ${earthquakeData[i].properties.sig.toLocaleString()} out of 1000 significance</p>`).addTo(myMap);
    //}
  
    // Setting up the legend
    //let legend = L.control({position: 'bottomright'});
    //legend.onAdd = function (map) {
  
        //let div = L.DomUtil.create('div', 'info legend'),
        //grades = [0, 10, 20, 30, 50, 70, 90, 150],
        //labels = [];
  
        // loop through our density intervals and generate a label with a colored square for each interval
        //for (var i = 0; i < grades.length; i++) {
        //div.innerHTML +=
         
          //"<i style=\"background-color:" + getColor(grades[i] + 1) + "\"></i>" +
            //grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
          
        //}
        //div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        //return div;
    //};
    // Adding the Legend to the map
    //legend.addTo(myMap);
  
  //}
  
  
  
