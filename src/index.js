let current = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[current.getDay()];

let timeHour = current.getHours();
let timeMins = current.getMinutes();

function displayDate(date, time) {
  let timeDisplay = `${timeHour}:${timeMins}`;
  let dateInput = `${day} ${timeDisplay}`;

  return dateInput;
}
console.log(displayDate(new Date()));
let dateTimeDisplay = document.querySelector("#date-time-display");
dateTimeDisplay.innerHTML = displayDate(new Date());

//function searchCity(event) {
//let form = document.querySelector("#search-form");
//form.addEventListener("submit", searchCity);

//let searchInput = document.querySelector("#search-city-input");

//let h1 = document.querySelector("h1");
//if (searchInput.value) {
//  h1.innerHTML = `Searching for ${searchInput.value}...`;
//} else {
// h1.innerHTML = null;
// alert("Enter a city");
// }
//}
//searchCity();

//let cityInput = document.querySelector("#search-city-input");
//let city = `${cityInput.value}`;
//let displayCityInput = document.querySelector("h1");
//displayCityInput.innerHTML = `${city}`;

//let units = "metric";
//let apiKey = "cfa51108812707b2b70f8a214fb652ec";
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

function displayCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city.value}`;

  let units = "metric";
  let apiKey = "cfa51108812707b2b70f8a214fb652ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", displayCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let message = `It is ${temperature}°C in ${city}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = message;
  let temperatureElement = document.querySelector("#temperature-display");
  let weatherComment = document.querySelector("#weather-comment");
  temperatureElement.innerHTML = `${temperature}°C`;
  weatherComment.innerHTML = response.data.weather[0].description;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.speed;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "cfa51108812707b2b70f8a214fb652ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}
let currentButton = document.querySelector("#locate-me-button");
currentButton.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(retrievePosition)
);
