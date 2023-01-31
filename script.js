var searchFormEl = document.querySelector('#button-addon2');
var currentDay = document.querySelector('.currentDay');
var forecast = document.querySelector('.forecast');
var cities = JSON.parse(localStorage.getItem('cities')) || [];

function handleSearchFormSubmit(event) {
    event.preventDefault();
    console.log(event);
  
    var city = document.querySelector('#search-input').value;
    if (!cities.includes(city)) {
    cities.push(city);
    localStorage.setItem('cities', JSON.stringify(cities));
    }  
  
    if (!city) {
      console.error('You need a search input value!');
      return;
    }
  
    var queryCoordinates = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=3a7640f2a9253115aec75d7159ec5537';
    fetch(queryCoordinates)
      .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
      })  
    .then(function (data) {
        console.log(data);
        var lat = data[0].lat;
        var lon =data[0].lon;
        getCurrent(lat, lon);
    })

  }
 
  function getCurrent(lat, lon) {
    var queryCurrent = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=3a7640f2a9253115aec75d7159ec5537';
    fetch(queryCurrent)
    .then(function (response) {
    if (!response.ok) {
      throw response.json();
    }
    return response.json();
    })  
  .then(function (data) {
      console.log(data);
   printResults(data);   
   getForecast(lat, lon);
  })
  }

  function getForecast(lat, lon) {
    var queryForecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=3a7640f2a9253115aec75d7159ec5537';
    fetch(queryForecast)
    .then(function (response) {
    if (!response.ok) {
      throw response.json();
    }
    return response.json();
    })  
  .then(function (data) {
      console.log(data);
      var forecastArray = [];
    for(var i = 0; i < data.list.length; i++) {
      var targetTime = data.list[i].dt_txt.split(" ")[1];
      if(targetTime === "12:00:00") {
        forecastArray.push(data.list[i]);
      }
    }  
    forecast.innerHTML = "";
    for(var i =0; i < forecastArray.length; i++) {
      printForecast(forecastArray[i]);
    }
  })
  }


    // var queryForecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=3a7640f2a9253115aec75d7159ec5537';

  function buttonMenu() {
    for(var i = 0; i <cities.length; i++) {
    var button = document.createElement('button');
    button.textContent = cities[i];
    button.setAttribute('value', cities[i]);
    document.getElementById('button-box').append(button);
    button.onclick = function() {
      console.log(this.value);
      var queryCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + this.value + '&appid=3a7640f2a9253115aec75d7159ec5537';
      fetch(queryCoordinates)
        .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
        })  
      .then(function (data) {
          console.log(data);
          var lat = data[0].lat;
          var lon =data[0].lon;
          getCurrent(lat, lon);
      })
    }
    }
 }
  buttonMenu();

function printForecast(data) {
  console.log(data);
  var forecastBody = document.createElement('div');
    forecastBody.classList.add('forecastBody', 'card');
    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    var dateDisplay = document.createElement('p');
    dateDisplay.classList.add('card-title');
    dateDisplay.textContent = "Date: " + data.dt_txt.split(" ")[0];
    console.log(dateDisplay);
    var pTemp = document.createElement('p');
    pTemp.classList.add('card-text');
    pTemp.textContent = "Temp: " + Math.round(data.main.temp);
    var pHumidity = document.createElement('p');
    pHumidity.classList.add('card-text');
    pHumidity.textContent = "Humidity: " + data.main.humidity;
    var pWind = document.createElement('p');
    pWind.classList.add('card-text');
    pWind.textContent = "Wind Speed: " + Math.round(data.wind.speed) + "mph";
    cardBody.append(dateDisplay, pTemp, pHumidity, pWind);
    forecastBody.append(cardBody);
    forecast.append(forecastBody);
}
function printResults(data) {
    console.log(data);
    var currentBody = document.createElement('div');
    currentBody.classList.add('currentBody', 'card');
    var cardTitle = document.createElement('h3');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = data.name;
    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    var pTemp = document.createElement('p');
    pTemp.classList.add('card-text');
    pTemp.textContent = "Temp: " + Math.round(data.main.temp);
    var pHumidity = document.createElement('p');
    pHumidity.classList.add('card-text');
    pHumidity.textContent = "Humidity: " + data.main.humidity;
    var pWind = document.createElement('p');
    pWind.classList.add('card-text');
    pWind.textContent = "Wind Speed: " + Math.round(data.wind.speed) + "mph";
    cardBody.append(pTemp, pHumidity, pWind);
    currentBody.append(cardTitle, cardBody);
    currentDay.innerHTML = "";
    currentDay.append(currentBody);
} 
  
  searchFormEl.addEventListener('click', handleSearchFormSubmit);
