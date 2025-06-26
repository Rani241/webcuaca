const cityInput = document.getElementById("city");
const getWeatherButton = document.getElementById("getWeather");
const weatherDisplay = document.getElementById("weather");
const locationDisplay = document.getElementById("location");
const temperatureDisplay = document.getElementById("temperature");
const descriptionDisplay = document.getElementById("description");
// const iconDisplay = document.getElementById("icon"); // Jika ingin pakai default icon
const customIconContainer = document.getElementById("customIcon"); // SVG custom

const API_KEY = "bbc8c66fd744e5d71e0a7026a25680b4";

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

    // Dapatkan ikon berdasarkan cuaca utama
    const weatherMain = data.weather[0].main;
    customIconContainer.innerHTML = getCustomIcon(weatherMain);

    weatherDisplay.classList.remove("hidden");
  } catch (error) {
    alert(error.message);
    weatherDisplay.classList.add("hidden");
  }
}

// Fungsi pilih ikon SVG berdasarkan cuaca
function getCustomIcon(weatherMain) {
  switch (weatherMain.toLowerCase()) {
    case "clear":
      return `
        <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="12" fill="#FFD93B"/>
          <g stroke="#FFD93B" stroke-width="4">
            <line x1="32" y1="4" x2="32" y2="16"/>
            <line x1="32" y1="48" x2="32" y2="60"/>
            <line x1="4" y1="32" x2="16" y2="32"/>
            <line x1="48" y1="32" x2="60" y2="32"/>
            <line x1="12" y1="12" x2="20" y2="20"/>
            <line x1="44" y1="44" x2="52" y2="52"/>
            <line x1="12" y1="52" x2="20" y2="44"/>
            <line x1="44" y1="20" x2="52" y2="12"/>
          </g>
        </svg>`;
    case "clouds":
      return `
        <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
          <path d="M20 40H50C55 40 58 36 58 32C58 28 55 24 50 24C49 18 44 14 38 14C34 14 30 16 28 20C22 20 18 24 18 28C14 28 10 30 10 34C10 38 14 40 20 40Z" fill="#A0C4FF"/>
        </svg>`;
    case "rain":
    case "drizzle":
      return `
        <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
          <path d="M20 40H50C55 40 58 36 58 32C58 28 55 24 50 24C49 18 44 14 38 14C34 14 30 16 28 20C22 20 18 24 18 28C14 28 10 30 10 34C10 38 14 40 20 40Z" fill="#A0C4FF"/>
          <line x1="30" y1="45" x2="30" y2="55" stroke="#4D96FF" stroke-width="4" />
          <line x1="40" y1="45" x2="40" y2="55" stroke="#4D96FF" stroke-width="4" />
        </svg>`;
    case "thunderstorm":
      return `
        <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
          <path d="M20 40H50C55 40 58 36 58 32C58 28 55 24 50 24C49 18 44 14 38 14C34 14 30 16 28 20C22 20 18 24 18 28C14 28 10 30 10 34C10 38 14 40 20 40Z" fill="#A0C4FF"/>
          <polygon points="30,45 38,45 32,55 40,55 30,65" fill="#FFD93B"/>
        </svg>`;
    case "snow":
      return `
        <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
          <path d="M20 38H50C55 38 58 34 58 30C58 26 55 22 50 22C49 16 44 12 38 12C34 12 30 14 28 18C22 18 18 22 18 26C14 26 10 28 10 32C10 36 14 38 20 38Z" fill="#E0F7FA"/>
          <text x="26" y="55" font-size="24" fill="#90CAF9">*</text>
        </svg>`;
    case "mist":
    case "fog":
    case "haze":
      return `
        <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
          <path d="M10 20H54" stroke="#B0BEC5" stroke-width="4"/>
          <path d="M14 30H58" stroke="#B0BEC5" stroke-width="4"/>
          <path d="M10 40H54" stroke="#B0BEC5" stroke-width="4"/>
        </svg>`;
    default:
      return `<p>Cuaca tidak dikenal</p>`;
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
