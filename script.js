const apiKey = "5e3cd0278ef2f3b9427f7d0434fc392d"; // Your OpenWeatherMap API key

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");
const container = document.querySelector(".container"); // Select the container

// ✅ Set Default Background & Container Color When Page Loads
document.body.style.background = "url('images/default.jpg') no-repeat center center fixed";
document.body.style.backgroundSize = "cover";
container.style.backgroundColor = "rgba(255, 255, 255, 0.7)"; // Default light color

// ✅ Fetch weather when button is clicked
searchBtn.addEventListener("click", () => {
    fetchWeather();
});

// ✅ Fetch weather when "Enter" key is pressed
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        fetchWeather();
    }
});

function fetchWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        alert("Please enter a city name!"); // Prompt user to enter a city
        return;
    }
    getWeather(city);
}

async function getWeather(city) {
    const weatherInfo = document.getElementById("weather-info");

    // Show loading message before fetching data
    weatherInfo.innerHTML = `<p>Loading weather for ${city}...</p>`;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found. Please try again.");

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p style="color: red;">${error.message}</p>`; // Show error message in UI
    }
}

function displayWeather(data) {
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const weatherCondition = data.weather[0].main.toLowerCase();

    // ✅ Change background based on weather conditions
    let backgroundImage = "images/default.jpg"; // Default background
    let containerColor = "rgba(255, 255, 255, 0.7)"; // Default light container color

    if (weatherCondition.includes("clear")) {
        backgroundImage = "images/sunny.jpg";
        containerColor = "rgba(255, 204, 0, 0.7)"; // Warm yellow
    } else if (weatherCondition.includes("cloud")) {
        backgroundImage = "images/cloudy.jpg";
        containerColor = "rgba(150, 150, 150, 0.7)"; // Gray
    } else if (weatherCondition.includes("rain")) {
        backgroundImage = "images/rainy.jpg";
        containerColor = "rgba(0, 119, 190, 0.7)"; // Dark blue
    } else if (weatherCondition.includes("thunderstorm")) {
        backgroundImage = "images/thunderstorm.jpg";
        containerColor = "rgba(80, 0, 80, 0.7)"; // Dark purple
    } else if (weatherCondition.includes("drizzle")) {
        backgroundImage = "images/drizzle.jpg";
        containerColor = "rgba(173, 216, 230, 0.7)"; // Light blue
    } else if (weatherCondition.includes("snow")) {
        backgroundImage = "images/snow.jpg";
        containerColor = "rgba(240, 248, 255, 0.7)"; // Light cyan
    } else if (weatherCondition.includes("mist")) {
        backgroundImage = "images/mist.jpg";
        containerColor = "rgba(200, 200, 200, 0.7)"; // Light gray
    } else if (weatherCondition.includes("fog")) {
        backgroundImage = "images/fog.jpg";
        containerColor = "rgba(180, 180, 180, 0.7)"; // Darker gray
    } else if (weatherCondition.includes("haze")) {
        backgroundImage = "images/haze.jpg";
        containerColor = "rgba(210, 180, 140, 0.7)"; // Brownish
    } else if (weatherCondition.includes("hot")) {
        backgroundImage = "images/hot.jpg";
        containerColor = "rgba(255, 69, 0, 0.7)"; // Red-orange
    } else if (weatherCondition.includes("tornado")) {
        backgroundImage = "images/tornado.jpg";
        containerColor = "rgba(100, 100, 100, 0.7)"; // Dark gray
    } else if (weatherCondition.includes("squall")) {
        backgroundImage = "images/squall.jpg";
        containerColor = "rgba(50, 50, 50, 0.7)"; // Darker shade
    } else if (weatherCondition.includes("sand") || weatherCondition.includes("dust")) {
        backgroundImage = "images/sand.jpg";
        containerColor = "rgba(210, 180, 140, 0.7)"; // Sandy brown
    } else if (weatherCondition.includes("smoke")) {
        backgroundImage = "images/smoke.jpg";
        containerColor = "rgba(90, 90, 90, 0.7)"; // Dark gray
    }

    // Apply new background and container color
    document.body.style.background = `url('${backgroundImage}') no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";
    container.style.backgroundColor = containerColor;

    // Display weather details
    document.getElementById("weather-info").innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <img src="${icon}" alt="Weather Icon">
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    `;
}
