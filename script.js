let currentData = null;
let isCelsius = true;

async function getWeather() {
  const location = document.getElementById("locationInput").value;
  const resultDiv = document.getElementById("result");

  if (location === "") {
    resultDiv.innerHTML = "<p style='color:red;'>Please enter a city!</p>";
    return;
  }

  try {
    const apiKey = "43666b428e8d475dbd1103506252408"; // Your API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    currentData = data; // save for toggle

    displayWeather(data);
  } catch (error) {
    resultDiv.innerHTML = "<p style='color:red;'>City not found, try again!</p>";
  }
}

function displayWeather(data) {
  const resultDiv = document.getElementById("result");

  // Format date/time
  const localTime = new Date(data.location.localtime);
  const formattedTime = localTime.toLocaleString();

  // Show Celsius or Fahrenheit
  const temp = isCelsius ? `${data.current.temp_c}°C` : `${data.current.temp_f}°F`;
  const feelsLike = isCelsius ? `${data.current.feelslike_c}°C` : `${data.current.feelslike_f}°F`;

  resultDiv.innerHTML = `
    <h2>${data.location.name}, ${data.location.country}</h2>
    <p class="extra">Updated: ${formattedTime}</p>
    <img src="${data.current.condition.icon}" alt="Weather Icon">
    <p class="temp">${temp}</p>
    <p class="condition">${data.current.condition.text}</p>
    <p class="extra">Feels Like: ${feelsLike}</p>
    <p class="extra">Humidity: ${data.current.humidity}% | Wind: ${data.current.wind_kph} km/h</p>
  `;
}

function toggleUnit() {
  if (!currentData) return; // if no data yet, do nothing
  isCelsius = !isCelsius;
  displayWeather(currentData);

  const btn = document.querySelector(".toggle-btn");
  btn.textContent = isCelsius ? "Show in °F" : "Show in °C";
}

