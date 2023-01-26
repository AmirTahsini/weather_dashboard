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
  
    var queryCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=3a7640f2a9253115aec75d7159ec5537';
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

    //THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed

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
    button.onclick = function() {
      console.log(this.value);
    }
    document.getElementById('button-box').append(button);
    }
 }
  buttonMenu();

function printForecast(data) {
  console.log(data);
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
    pTemp.textContent = "temp: " + Math.round(data.main.temp);
    var pHumidity = document.createElement('p');
    pHumidity.classList.add('card-text');
    // value
    var pWind = document.createElement('p');
    pWind.classList.add('card-text');
    // value
    cardBody.append(pTemp, pHumidity, pWind);
    currentBody.append(cardTitle, cardBody);
    currentDay.append(currentBody);

    // print - THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed

    /*var forecastBody = document.createElement('div');
    forecastBody.classList.add('forecastBody');
    forecast.append(forecastBody); */

    // print - THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed

} 
  
  searchFormEl.addEventListener('click', handleSearchFormSubmit);
