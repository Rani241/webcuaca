const cityInput = document.getElementById("city");
const getWeatherButton = document.getElementById("getWeather");
const weatherDisplay = document.getElementById("weather");
const locationDisplay = document.getElementById("location");
const temperatureDisplay = document.getElementById("temperature");
const descriptionDisplay = document.getElementById("description");
const iconDisplay = document.getElementById("icon");

const API_KEY = "bbc8c66fd744e5d71e0a7026a25680b4"; // Ganti dengan API key milikmu

// Fungsi ambil data cuaca
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}&lang=id`
    );
    if (!response.ok) throw new Error("Kota tidak ditemukan!");

    const data = await response.json();

    // Update UI
    locationDisplay.textContent = `${data.name}, ${data.sys.country}`;
    temperatureDisplay.textContent = `Suhu: ${data.main.temp}°C`;
    descriptionDisplay.textContent = `Kondisi: ${data.weather[0].description}`;
    iconDisplay.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    iconDisplay.alt = data.weather[0].description;

    weatherDisplay.classList.remove("hidden");
  } catch (error) {
    alert(error.message);
    weatherDisplay.classList.add("hidden");
  }
}

// Event tombol
getWeatherButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Harap masukkan nama kota!");
  }
});

