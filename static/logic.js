// Define global variables for data
let temperatureData = [];
let humidityData = [];
let windSpeedData = [];

// Define function to retrieve data from API and update global variables
function getData(city) {
  const url = `http://127.0.0.1:5000/get_data`;

  d3.json(url)
    .then(data => {
      // Clear previous data
      temperatureData = [];
      humidityData = [];
      windSpeedData = [];

      // Loop through API data and push relevant values to global variables
      for (const entry of data) {
        temperatureData.push(entry.temperature_2m_deg_c);
        humidityData.push(entry.relativehumidity_2m_perc);
        windSpeedData.push(entry.windspeed_10m_kmh);
      }

      // Call function to update plot
      updatePlot();
    })
    .catch(error => console.error(error));
}

// Add event listener to select element to call getData function with selected city
document.getElementById('city-select').addEventListener('change', event => {
  console.log('Selected city:', event.target.value);
  const selectedCity = event.target.value;
  getData(selectedCity);
});

// Define function to update plot with current global variable data
function updatePlot() {
  const traceTemperature = {
    x: [...Array(temperatureData.length).keys()],
    y: temperatureData,
    mode: 'lines',
    name: 'Temperature (C)'
  };
  const traceHumidity = {
    x: [...Array(humidityData.length).keys()],
    y: humidityData,
    mode: 'lines',
    name: 'Humidity (%)'
  };
  const traceWindSpeed = {
    x: [...Array(windSpeedData.length).keys()],
    y: windSpeedData,
    mode: 'lines',
    name: 'Wind Speed (km/h)'
  };

  const data = [traceTemperature, traceHumidity, traceWindSpeed];

  const layout = {
    title: 'City Weather Data',
    xaxis: {
      title: 'Data Point'
    },
    yaxis: {
      title: 'Value'
    }
  };

  Plotly.newPlot('plot', data, layout);
}

// Call getData function with default city on page load
getData('Delhi');

// Add event listener to select element to call getData function with selected city
document.getElementById('city-select').addEventListener('change', event => {
  const selectedCity = event.target.value;
  getData(selectedCity);
});