var apikey = "a25ab45cc7dff1a58670a78012540513"
var archive = JSON.parse(window.localStorage.getItem("archive")) || [];
var searchBtn = document.querySelector('#search-btn');
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


var weatherTodayDiv = document.querySelector('#weather-today');
var forecastDiv = document.querySelector('#forecast');
var archiveList = document.querySelector('#archive');

searchBtn.addEventListener('click', function searchCity() {
  var cityInput = document.getElementById("city-input").value;

  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apikey}&units=imperial`)
    .then(res => {
      const weather = res.data
      var weatherToday = res.data.main.temp;
      const lat = res.data.coord.lat;
      const lon = res.data.coord.lon;

      console.log(weatherToday)
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`)
        .then(res => {
          const forecast = res.data;
          console.log(forecast)
        })
      console.log(weather)


        .then(resp => {
          let today = resp.data
          const uvi = resp.data.current.uvi
          const city = weather.city.name

          let current = {
            temp: today.current.temp,
            humid: today.current.humidity,
            wind: today.current.wind_speed,
            icon: today.current.weather[0].icon,
            uvi: uvi
          }

          let day1 = {
            date: weather.list[0].dt_txt,
            temp: weather.list[0].main.temp,
            humid: weather.list[0].main.humidity,
            wind: weather.list[0].wind.speed,
            icon: weather.list[0].weather[0].icon
          }

          let day2 = {
            date: weather.list[8].dt_txt,
            temp: weather.list[8].main.temp,
            humid: weather.list[8].main.humidity,
            wind: weather.list[8].wind.speed,
            icon: weather.list[8].weather[0].icon
          }
          let day3 = {
            date: weather.list[16].dt_txt,
            temp: weather.list[16].main.temp,
            humid: weather.list[16].main.humidity,
            wind: weather.list[16].wind.speed,
            icon: weather.list[16].weather[0].icon
          }
          let day4 = {
            date: weather.list[24].dt_txt,
            temp: weather.list[24].main.temp,
            humid: weather.list[24].main.humidity,
            wind: weather.list[24].wind.speed,
            icon: weather.list[24].weather[0].icon
          }
          let day5 = {
            date: weather.list[32].dt_txt,
            temp: weather.list[32].main.temp,
            humid: weather.list[32].main.humidity,
            wind: weather.list[32].wind.speed,
            icon: weather.list[32].weather[0].icon
          }
          console.log(resp.data)
          document.getElementById('today').innerHTML = ''
          const currentElem = document.createElement('div')
          currentElem.innerHTML = `
          <div class= "currentday">
            <h3>Current</h3>
            <h3>City: ${city} <img src="http://openweathermap.org/img/w/${current.icon}.png" alt="icon"></h3>
            <h3>Temperature: ${current.temp}</h3>
            <h3>Humidity: ${current.humid}</h3>
            <h3>Wind: ${current.wind}</h3>
            <h3>UVI: ${uvi}</h3>
          </div>
        `
          document.getElementById('today').append(currentElem)

          let forecasts = [day1, day2, day3, day4, day5]

          document.getElementById('forecast').innerHTML = ''
          forecasts.forEach(day => {

            document.getElementById('forecast').innerHTML += `
            
              <div class="card" style="width: 15rem";>
                  <img src="http://openweathermap.org/img/w/${day.icon}.png" class="card-img-top" alt="icon">
                  <div class="card-body">
                  <h5 class="card-title">${day.date}</h5>
                  <p class="card-text">            
                  <h3>temp: ${day.temp}</h3>
                  <h3>humid: ${day.humid}<h3>
                  <h3>wind: ${day.wind}</h3></p>
              </div>
            </div>
        `
          })
        })

    })
})
  })
})
