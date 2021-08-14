const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const city = document.getElementById('city');
const weatherReport = document.getElementById('weather-report');
const ErrorMessage = document.getElementById('Error-Message');
const backgroundImage = document.getElementById('background-image');
const temp = document.getElementById('temp');
const weather = document.querySelector('.lead');
const api = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "a3b5f59cfcb6d1f5a3a88380cb2d8649";
const imgApi = "https://api.unsplash.com/search/photos";
const unsplashApiKey = "tv_pOIB6mYB8NDaaPNHcJPiuN6i0ATlNuZAGuoP7S8w";

callApi("Dhaka");

searchBtn.addEventListener('click', function () {
    callApi(search.value);
})

function callApi(searchValue) {
    const apiCall = `${api}${searchValue}&appid=${apiKey}`;
    fetch(apiCall)
        .then(res => {
            if (!res.ok) {
                throw Error();
            }
            else {
                return res.json();
            }
        })
        .then(data => {
            weatherReport.style.display = "block";
            ErrorMessage.style.display = "none";
            city.textContent = searchValue;
            displayTemp(data.main.temp);
            displayWeather(data.weather[0].main);
            changeBackground(searchValue);
        })
        .catch(function () {
            weatherReport.style.display = "none";
            ErrorMessage.style.display = "block";
        });
}

function displayTemp(temperatureInKelvin) {
    const temperatureInCelsius = Math.round(temperatureInKelvin - 273.1);
    temp.textContent = temperatureInCelsius;
}

function displayWeather(weatherCondition) {
    weather.textContent = weatherCondition;
}

function changeBackground(searchValue) {
    const image = `${imgApi}?query=${searchValue}&client_id=${unsplashApiKey}`;
    fetch(image)
        .then(res => res.json())
        .then(data => {
            backgroundImage.src = data.results[0].urls.full;
        });
}
