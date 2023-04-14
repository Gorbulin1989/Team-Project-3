// URLs for that contains the data.

var url3 = "http://127.0.0.1:5000/pollutants/";

/////////////////////////////////////////// Histogram ////////////////////////////////////////

function init() {
  let pollutants = [
    "aqi",
    "co",
    "nh3",
    "no",
    "no2",
    "o3",
    "pm2_5",
    "pm10",
    "so2",
  ];
  let dropdown = d3.select("#selDataset");
  for (i = 0; i < pollutants.length; i++) {
    dropdown
      .append("option")
      .text(pollutants[i])
      .property("value", pollutants[i]);
  }

  charts(pollutants[0]);
  drawmap();
}

// Writing a function to build the charts (the argument of the function is an element of the pollutants array)
function charts(pollutant) {
  // Creating a url variable to take in the an element of the pollutants array so that the values of that pollutants loads when selected
  let p_url = url3 + pollutant;
  // use d3.json to access the data from the url
  d3.json(p_url).then((data) => {
    console.log(data);
    // Mapping for the city and pollutant from the D3 response
    let cities = data.map((obj) => obj.city);
    let pollutants = data.map((obj) => obj.qty);
    // Creating our horizontal histogram
    let histdata = [
      {
        x: pollutants,
        y: cities,
        text: pollutant,
        type: "bar",
        marker: {
          color: [
            "#66c2a5",
            "#fc8d62",
            "#8da0cb",
            "#e78ac3",
            "#a6d854",
            "#ffd92f",
            "#e5c494",
            "#b3b3b3",
          ], // "rgba(255, 100, 102, 0.7)",
          autocolorscale: true,
        },
        opacity: 0.75,
        orientation: "h",
      },
    ];

    var layout = {
      //bargap: 0.05,
      //bargroupgap: 0.2,
      //barmode: "overlay",
      title: "Cities Pollutant levels",
      xaxis: { title: "Levels" },
      //yaxis: {title: "Count"}
    };

    Plotly.newPlot("hbar", histdata, layout);
  });
}

///////////////////////////////////////// Map ////////////////////////////////////////

function drawmap() {
  // Creating a map object.
  var myMap = L.map("map", {
    center: [12.1348, 15.0557],
    zoom: 2.49,
  });

  // Adding a tile layer.
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);

  var url = "http://127.0.0.1:5000/yearly_avg";

  // Performing a GET request to the query URL/
  d3.json(url).then(function (data) {
    console.log(data);
    // Once we get a response, sending the data object to the getData function.
    getData(data);
  });

  function getData(data) {
    // Defining a functions that we want to run once for each obj in the data array.
    markerSize(data);

    // Defining a markerSize() function that will give each earthquake feature a different radius based on its magnitude.
    function markerSize(population) {
      return population * 0.02;
    }
    //Creating a gradient color palette (function to be called later), using ColorBrewer2.org
    function getColor(d) {
      return d > 5
        ? "#d73027"
        : d > 4
        ? "#fc8d59"
        : d > 3
        ? "#fee08b"
        : d > 2
        ? "#d9ef8b"
        : d > 1
        ? "#91cf60"
        : "#1a9850";
    }

    //Looping through the Data to get parameters needed such as coordinates and AQI
    for (var i = 0; i < data.length; i++) {
      L.circle([data[i].latitude, data[i].longitude], {
        fillOpacity: 1,
        color: "white",
        // Setting our circle's color to equal the output of our getColor() function:
        fillColor: getColor(data[i].avg_aqi),
        // Setting our circle's radius to equal the output of our markerSize() function:
        radius: markerSize(data[i].population),
      })
        .bindPopup(
          `<h3>${data[i].city}</h3><hr><p>Population of ${data[
            i
          ].population.toLocaleString()} and air quality index of${data[
            i
          ].avg_aqi.toLocaleString()}</p>`
        )
        .addTo(myMap);
    }

    // Setting up the legend
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function (map) {
      let div = L.DomUtil.create("div", "infolegend"),
        grades = [1, 2, 3, 4, 5],
        labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background-color:' +
          getColor(grades[i] + 1) +
          '"></i>' +
          grades[i] +
          (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };
    // Adding the Legend to the map
    legend.addTo(myMap);
  }
}
// Calling a function that will fetch new data each time a new sample is selected
function optionChanged(pollutant) {
  charts(pollutant);
}

init();

//////////////////////////////////////////// Gauges //////////////////////////////////////////////

const dataPromise = d3.json("http://127.0.0.1:5000/daily_avg").then((data) => {
  // Calculate the average AQI value for each city
  const cities = Array.from(new Set(data.map((d) => d.city))); // Get unique city names
  const cityAqis = cities.map((city) => {
    const cityData = data.filter((d) => d.city === city);
    const cityAqi =
      cityData.reduce((acc, curr) => acc + curr.aqi, 0) / cityData.length;
    return { city, aqi: cityAqi };
  });
  // Sort the cities by average AQI in ascending order
  const sortedCities = cityAqis.sort((a, b) => a.aqi - b.aqi);
  // Split the sorted cities into three groups based on their average AQI
  const groupSize = Math.floor(sortedCities.length / 3);
  const groups = [
    sortedCities.slice(0, groupSize),
    sortedCities.slice(groupSize, groupSize * 2),
    sortedCities.slice(groupSize * 2),
  ];
  // Create a div element for each chart and append it to the charts container
  d3.select("#charts-container")
    .selectAll(".chart-container")
    .data(groups)
    .enter()
    .append("div")
    .attr("class", "gauge-container col-md-4")
    .each(function (d, i) {
      d3.select(this).attr("id", `chart-group-${i + 1}`);
    });
  // Loop through each group and create a gauge chart for each city in the group
  groups.forEach((group, i) => {
    group.forEach((city) => {
      // Get the data for the city
      const cityData = data.filter((d) => d.city === city.city);
      // Create an array of city name and AQI value
      const chartData = [
        {
          name: city.city,
          y: city.aqi,
        },
      ];
      // Create the gauge chart using Highcharts
      Highcharts.chart(`chart-group-${i + 1}`, {
        chart: {
          type: "gauge",
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false,
        },
        title: {
          text: `${city.city} AQI`,
        },
        pane: {
          startAngle: -150,
          endAngle: 150,
          background: [
            {
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                  [0, "#FFF"],
                  [1, "#333"],
                ],
              },
              borderWidth: 0,
              outerRadius: "109%",
              innerRadius: "107%",
            },
          ],
        },
        // Set the max value of the gauge based on the highest AQI value
        yAxis: {
          min: 0,
          max: 5,
          minorTickInterval: "auto",
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: "inside",
          minorTickColor: "#666",
          tickPixelInterval: 30,
          tickWidth: 2,
          tickPosition: "inside",
          tickLength: 10,
          tickColor: "#666",
          labels: {
            step: 1,
            rotation: "auto",
          },
          title: {
            text: "AQI",
          },
          plotBands: [
            {
              from: 0,
              to: 2.5,
              color: "#55BF3B", // green
            },
            {
              from: 2.5,
              to: 4,
              color: "#DDDF0D", // yellow
            },
            {
              from: 4,
              to: 5,
              color: "#DF5353", // red
            },
          ],
        },
        series: [
          {
            name: "AQI",
            data: chartData,
            dataLabels: {
              format:
                '<div style="text-align:center;"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "black") +
                '">{y:.2f}</span><br/>',
              borderWidth: 0,
              backgroundColor: null,
              y: -50,
            },
          },
        ],
      });
    });
  });
});
// Handle errors if any
dataPromise.catch((error) => console.log(error));

/////////////////////////////////////////// Line Plots /////////////////////////////////////////

d3.json("http://127.0.0.1:5000/daily_avg").then((data) => {
  // Update city names in the data array
  data = data.map((d) => {
    if (d.city === "São Paulo") {
      d.city = "Sao Paulo";
    } else if (d.city === "Mexico City") {
      d.city = "Mexico_City";
    }
    return d;
  });
  const cities = Array.from(new Set(data.map((d) => d.city)));
  const cityData = cities.map((city) => {
    const cityTempData = data
      .filter((d) => d.city === city)
      .map((d) => [new Date(d.date).getTime(), d.temperature_2m]);
    const cityPrecipData = data
      .filter((d) => d.city === city)
      .map((d) => [new Date(d.date).getTime(), d.precipitation]);
    const cityAQIData = data
      .filter((d) => d.city === city)
      .map((d) => [new Date(d.date).getTime(), d.aqi]);
    return {
      city,
      tempData: cityTempData,
      precipData: cityPrecipData,
      aqiData: cityAQIData,
    };
  });
  // Create a dropdown menu to select the city
  const select = d3
    .select("#line-chart-container")
    .select("#city-select")
    .on("change", function () {
      const selectedCity = this.value;
      // Hide all the line charts
      d3.selectAll(".line-chart-container").style("display", "none");
      // Show the line chart for the selected city
      d3.select(`#chart-container-${selectedCity}`).style("display", "block");
    });
  select
    .append("option")
    .text("Select a city")
    .attr("disabled", true)
    .attr("selected", true);
  cities.forEach((city) => {
    select.append("option").text(city).attr("value", city);
  });
  // Create a line chart for each city
  cityData.forEach((city) => {
    // Create an array of objects containing data for temperature, precipitation, and cloud cover
    const tempSeries = {
      name: "Temperature",
      data: city.tempData,
      yAxis: 0,
      zIndex: 1,
    };
    const precipSeries = {
      name: "Precipitation",
      data: city.precipData,
      yAxis: 1,
      zIndex: 0,
    };
    const aqiSeries = {
      name: "AQI",
      data: city.aqiData,
      yAxis: 2,
      zIndex: 2,
    };
    // Create a div element for the chart container
    const chartContainer = d3
      .select("#line-chart-container")
      .append("div")
      .attr("id", `chart-container-${city.city}`) // Use the same ID format as in the dropdown change event
      .attr("class", "line-chart-container"); // Use a different class for the line chart containers
    // Create a chart for the city
    const chart = Highcharts.chart({
      chart: {
        type: "line",
        height: 300,
        renderTo: chartContainer.node(), // Set renderTo to the chartContainer
      },
      title: {
        text: city.city,
      },
      xAxis: {
        type: "datetime",
        dateTimeLabelFormats: {
          day: "%e %b %Y",
        },
      },
      yAxis: [
        {
          title: {
            text: "Temperature (°C)",
          },
        },
        {
          title: {
            text: "Precipitation (mm)",
          },
          opposite: true,
        },
        {
          title: {
            text: "AQI",
          },
          opposite: true,
        },
      ],
      tooltip: {
        shared: true,
        xDateFormat: "%A, %b %e, %Y",
      },
      series: [tempSeries, precipSeries, aqiSeries],
    });
    // Hide all the charts except for the first one
    if (city.city !== cities[0]) {
      chartContainer.style("display", "none");
    }
  });
});
