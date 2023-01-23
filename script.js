var searchFormEl = document.querySelector('#button-addon2');
var currentDay = document.querySelector('.currentDay');
var forecast = document.querySelector('.forecast');

function handleSearchFormSubmit(event) {
    event.preventDefault();
    console.log(event);
  
    var city = document.querySelector('#search-input').value;
    console.log(city);
  
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
    })
    // var lat = ???.lat
    // var lon = ???.lon
    //THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed

    // var queryCurrent = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=3a7640f2a9253115aec75d7159ec5537';
    // var queryForecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=3a7640f2a9253115aec75d7159ec5537';

  }

/*function printResults() {
    var currentBody = document.createElement('div');
    currentBody.classList.add('currentBody');
    currentDay.append(currentBody);

    // print - THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed

    var forecastBody = document.createElement('div');
    forecastBody.classList.add('forecastBody');
    forecast.append(forecastBody);

    // print - THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed

}  */
  
  searchFormEl.addEventListener('click', handleSearchFormSubmit);
