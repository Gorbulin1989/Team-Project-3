# Air pollution for the top 8 most populous cities in 2022.

This project focuses on evaluating the air pollution for 8 major cities (by population) across the world from 01-01-2022 to 01-01-2023 in order to assess how they might be affected by population, precipitation and wind speed. We will be focusing on the levels in the air of 8 common pollutants such as: carbon monoxide (CO), nitric oxide (NO), nitrogen dioxide (NO2), trioxygen (O3), sulfur dioxide(SO2), particulate matter 2.5, particulate matter 10 and ammonia (NH3) in each of the top 10 cities in the world, and the weather recorded in those cities at the time of pollution levels collection.


## Data Aquisition 

We collected our air quality data from https://openweathermap.org/api/air-pollution and our weather data from https://open-meteo.com/en/docs/historical-weather-api#api-documentation. 

## Dashboard 

We selected several visualizations for our dashboard to help determine the relationship between weather data, population, and air pollution in the given cities. 

Mapping: We created an interactive map which depicts the 8 cities with circles of varying sizes and colors. The larger circles indicate larger populations and the colors indicate air quality index (AQI). High AQI indicates poor air quality and is represented by red circles, yellow is fair air quality and green is good air quality. You can hover your cursor over a city to see the AQI and population values.

![image](https://user-images.githubusercontent.com/119651909/233489321-a12ac06b-966e-483c-8d62-a473c6fb3c4f.png)

Pollutant Level Dropdown: We created a bar chart with a dropdown menu populated with AQI and common pollutant names. The graph shows the levels of the selected pollutant for each of the 8 cities. 

![image](https://user-images.githubusercontent.com/119651909/233491270-23991fed-c96e-48ff-95ee-2b1193f399d2.png)

Gauges: We created gauges which depict the cities with the lowest, median, and highest AQI values. 

![image](https://user-images.githubusercontent.com/119651909/233492153-6b8b3bf7-9c3a-450b-864f-89e99157ab5e.png)

Weather Line Chart: We created a line chart with multiple lines indicating the temperature, precipitation, and AQI values for a selected city for the year 2022. 

![image](https://user-images.githubusercontent.com/119651909/233492870-94ec4e06-8f74-459c-b734-bc2639385c91.png)




