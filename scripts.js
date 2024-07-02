const apikey = "947721806c7fdb0d710555a28656f3b7"; // Replace "YOUR_API_KEY" with your actual API key from OpenWeatherMap

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) => 
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), { origin: "cors" });
  const respData = await resp.json();
  addWeatherToPage(respData);
}

function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  const weatherIcon = data.weather[0].icon 
    ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    : `https://img.icons8.com/ios/452/partly-cloudy-day--v1.png`; // Default icon

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
      <h2><img src="${weatherIcon}" /> ${temp}°C <img src="${weatherIcon}" /></h2>
      <small>${data.weather[0].main}</small>
      <div class="more-info">
      <p>Humidity: <span>${humidity}%</span></p>
      <p>Wind speed: <span>${Math.trunc(windSpeed * 3.6)} km/h</span></p>
      </div>


  `;

  // Clear previous weather
  main.innerHTML = "";

  // Append new weather
  main.appendChild(weather);

  weather.style.opacity = 0;
  setTimeout(() => (weather.style.opacity = 1), 10);
  
}

// function to convert temperature from Kelvin scale to Celsius.
function KtoC(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value;

  if (city) {
    getWeatherByLocation(city);
  }
});
