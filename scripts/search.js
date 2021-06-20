// Weather search

function getAPIdata() {

  var url = 'https://api.openweathermap.org/data/2.5/weather';
  var apiKey ='3ab1fa1e3405dbe544c86d5a6c21f87b';
  var city = document.getElementById('city').value;

  // construct request
  var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
  
  // get current weather
  fetch(request)
  
  // parse to JSON format
  .then(function(response) {
    if(!response.ok) throw Error(response.statusText);
    return response.json();
  })
  
  // render weather per day
  .then(function(response) {
    // render weatherCondition
    onAPISucces(response);  
  })
  
    // error
  .catch(
    function(status){
      document.getElementById('searchWeather').innerHTML = 'location error';
    }
    );
}

function onAPISucces(response) {

  // converting temp to Celcius
  var degree = Math.floor(response.main.temp - 273.15);

  // put weather on page
  var weatherResult = document.getElementById('searchWeather');
  weatherResult.innerHTML = degree + '&#176;C';
}

function onAPIError(error) {
  console.error('Fetch request failed', error);
  var weatherResult = document.getElementById('searchWeather');
  weatherResult.innerHTML = 'No weather data available <br /> Did you enter a valid city?'; 
}

// set button
document.getElementById('searchBtn').onclick = function(){
  getAPIdata();
};

//Current Date & Time (GMT)

function updateTime(){

  var current = new Date();
  document.getElementById('date').innerHTML = current.getDate() + ' / ' + (current.getMonth()+1) + ' / ' + (current.getFullYear()+47);
  document.getElementById('time').innerHTML = addLeadingZero(changeTimeZero(current.getHours()-2)) + ' : ' + addLeadingZero(current.getMinutes()) + ' : ' + addLeadingZero(current.getSeconds());
  function addLeadingZero(number){
    if (number < 10) {
      number = '0'+ number;
    }
    return number;
  }
  function changeTimeZero(time){
    if (time < 0) {
      time = 24 + time;
    }
    return time;
  }

};

setInterval (updateTime , 1000);

//Time Left to Landing Calculation (According to GMT)
var arrivalToEarth = new Date('December 30, 2021 15:37:25').getTime();

var x = setInterval(function() {

  var now = new Date().getTime();
  var distance = arrivalToEarth - now;
  var months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
  var days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30))/ (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById('countdown').innerHTML = months + 'm ' + days + 'd ' + hours + 'h '
  + minutes + 'm ' + seconds + 's ';
  if (distance < 0) {
    clearInterval(x);
    document.getElementById('countdown').innerHTML = 'ARRIVED TO EARTH';
  }
}, 1000);

// Map with search option

// Api token
mapboxgl.accessToken = 'pk.eyJ1IjoiemV5bmVwa2FyYWtheWEiLCJhIjoiY2twenkwamN0MDdnZDJxbXV1MHU4aGExMyJ9.Wd9rzr2xOHHe2-9I3vfgfQ';

// Map
var searchMap = new mapboxgl.Map({
  container: 'searchMap',
  style: 'mapbox://styles/zeynepkarakaya/ckq3ozopc1yhr17mntry03mua',
  center: [-80.66981295449642,28.60366166235751],
  zoom: 10
});

// Add geocoder control
searchMap.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  }),
  'bottom-left'
);

// Add zoom control

searchMap.addControl(new mapboxgl.NavigationControl());



