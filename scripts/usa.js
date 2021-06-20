
function getAPIdata() {

  // construct request
  var request = 'https://api.openweathermap.org/data/2.5/weather?appid=3ab1fa1e3405dbe544c86d5a6c21f87b&q=lovelock';

  // get current weather
  fetch(request)  
  
  // return response in JSON
  .then(
    function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }
  )
  
  // show weather
  .then(
    function(response) {

    var degree = Math.floor(response.main.temp - 273.15);

    document.getElementById('weatherUsa').innerHTML =degree + '°C <br>';
    }
  )
}

getAPIdata();

//Current Date & Time (Florida/USA)

function updateTime(){

  var usaDate = new Date();
  document.getElementById('date').innerHTML = usaDate.getDate() + ' / ' + (usaDate.getMonth()+1) + ' / ' + (usaDate.getFullYear()+47);
  document.getElementById('time').innerHTML = addLeadingZero(changeTimeZero(usaDate.getHours()-9)) + ' : ' + addLeadingZero(usaDate.getMinutes()) + ' : ' + addLeadingZero(usaDate.getSeconds());
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

//Time Left to Landing
var arrivalToEarth = new Date('December 31, 2021 23:10:19').getTime();

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

// USA Map

// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoiemV5bmVwa2FyYWtheWEiLCJhIjoiY2twenkwamN0MDdnZDJxbXV1MHU4aGExMyJ9.Wd9rzr2xOHHe2-9I3vfgfQ';

// Initialate map
var mapUsa = new mapboxgl.Map({
  container: 'mapUsa',
  style: 'mapbox://styles/zeynepkarakaya/ckq3ozopc1yhr17mntry03mua',
  center: [-119.02839155817821,41.053393354383076],
  zoom: 8,
});

mapUsa.addControl(new mapboxgl.NavigationControl());

var targetIcon = document.createElement('div');
targetIcon.style.backgroundImage = 'url("https://image.flaticon.com/icons/png/512/2971/2971811.png")';
targetIcon.style.backgroundSize = '100%';
targetIcon.style.width = '25px';
targetIcon.style.height = '25px';

// Adding icon on target
var marker = new mapboxgl.Marker(targetIcon).setLngLat([-119.02839155817821,41.053393354383076]).addTo(mapUsa);

