const apiKey = "a475431b605b75bd7aaba8cfd367baa2 " ; 
const getWeatherButton = document.getElementById("get-weather-button");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");

getWeatherButton.addEventListener("click", () => {
  const city = cityInput.value;

  if (city) {
    getWeather(city);
  } else {
    alert("Por favor, ingrese una ciudad.");
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data = await response.json();

    if (response.ok) {
      const temperature = Math.round(data.main.temp - 273.15);
      const description = data.weather[0].description;
      const cityName = data.name;
      const country = data.sys.country;

      weatherInfo.innerHTML = `
                <p>Clima en ${cityName}, ${country}:</p>
                <p>Temperatura: ${temperature}°C</p>
                <p>Descripción: ${description}</p>
            `;
    } else {
      weatherInfo.textContent = "Ciudad no encontrada.";
    }
  } catch (error) {
    console.error("Error:", error);
    weatherInfo.textContent = "Ocurrió un error al obtener el clima.";
  }
}