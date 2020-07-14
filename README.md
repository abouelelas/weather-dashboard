# weather-dashboard
# 06 Server-Side APIs: Weather Dashboard

## User Story

Implemented a weather application using third-party weather API, that when given certain user input of a city name, user is presented with current weather conditions with specific date, such as temperature, wind speed, humidity and uv-index. UV-index is is presented with color codes (green, yellow,orange and red) to indicate the severity (mild,moderate or severe) of the conditions.

The user is also presented with a 5-day future forecast of that city and is presented with specific date,temperature and humidity. 
The user will be able to go back to previously searched cities by saving them to local storage using JSON stringify.

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

The following image demonstrates the application functionality:

!(weather dashboard demo)[./Assets/screenshot-weather.png]

**(weather-dashboard)[https://github.com/abouelelas/weather-dashboard]
**(weather-dashboard)[https://abouelelas.github.io/weather-dashboard]

