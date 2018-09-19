import * as elements from 'js/elements.js';
import Http from 'js/http.js';
import {
    WeatherData,
    weatherProxyHandler
} from 'js/weather-data.js';

const apiKey = 'bbd7cabcd879fced9336bb73984e9fa2';

const updateWeather = function (weatherData) {
    elements.weatherCity.textContent = weatherData.cityName;
    elements.weatherDescription.textContent = weatherData.description;
    elements.weatherTemperature.textContent = weatherData.temperature;

    elements.loadingText.style.display = 'none';
    elements.weatherBox.style.display = 'block';
};

const searchWeather = function () {
    const cityName = elements.searchedCity.value.trim();
    if (cityName.length === 0) {
        alert('Please enter a city name');
    }
    elements.loadingText.style.display = 'block';
    elements.weatherBox.style.display = 'none';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    Http.fetchData(url)
        .then(responseData => {
            const weatherData = new WeatherData(cityName, responseData.weather[0].description.toUpperCase());
            const weatherProxy = new Proxy(weatherData, weatherProxyHandler);
            weatherProxy.temperature = responseData.main.temp;
            updateWeather(weatherProxy);
        })
        .catch(error => alert(error));
};

elements.searchButton.addEventListener('click', searchWeather);