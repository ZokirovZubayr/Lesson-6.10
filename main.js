const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "5f1077f561d87b1be334b15838fc01b4";
  const city = document.querySelector(".search-box input").value;

  if (city == "") {
    return;
  }

  console.log(city);

  fetch(
    `https:api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".temperature");
      const description = document.querySelector(".description");
      const humidity = document.querySelector(".main-info");
      const wind = document.querySelector(".wind span");

      console.log(data);
      container.style.height = "555px";
      container.classList.add("active");
      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      error404.classList.remove("active");

      switch (data.weather[0].main) {
        case "Clear":
          image.src = "./Clear.png.jpg";
          break;
        case "Rain":
          image.src = "./Rain.png.jpg";
          break;
        case "Snow":
          image.src = "./Snow.png.jpg";
          break;
        case "Clouds":
          image.src = "./Clouds.png";
          break;
        case "Mist":
          image.src = "./Windy.jpg";
          break;
        case "Haze":
          image.src = "./Windy.jpg";
          break;
        default:
          image.src = "./cloudy.jpg";
          break;
      }
      temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
      description.innerHTML = `${data.weather[0].description}`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;
    });
});