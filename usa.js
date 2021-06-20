// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoiemV5bmVwa2FyYWtheWEiLCJhIjoiY2twenkwamN0MDdnZDJxbXV1MHU4aGExMyJ9.Wd9rzr2xOHHe2-9I3vfgfQ';

// Initialate map
var map1 = new mapboxgl.Map({
  container: 'map1',
  // style: 'mapbox://styles/mapbox/streets-v11',
  style: 'mapbox://styles/zeynepkarakaya/ckq3ozopc1yhr17mntry03mua',
  center: [-119.02839155817821,41.053393354383076],
  zoom: 8,
  // pitch: 45,
  // bearing: -47.6,

});

map1.addControl(new mapboxgl.NavigationControl());


var myCustomMarker = document.createElement('div');
// myCustomMarker.className = 'customMarker';
myCustomMarker.style.backgroundImage = 'url("https://image.flaticon.com/icons/png/512/2971/2971811.png")';
myCustomMarker.style.backgroundSize = '100%';
myCustomMarker.style.width = '25px';
myCustomMarker.style.height = '25px';

// Adding a marker based on lon lat coordinates
var marker = new mapboxgl.Marker(myCustomMarker).setLngLat([-119.02839155817821,41.053393354383076]).addTo(map1);





function getAPIdata() {

  // construct request
  // var cityName = document.getElementById('cityName').value;
  // var request = 'https://api.openweathermap.org/data/2.5/weather?appid=3ab1fa1e3405dbe544c86d5a6c21f87b&q='+cityName;
  var request1 = 'https://api.openweathermap.org/data/2.5/weather?appid=3ab1fa1e3405dbe544c86d5a6c21f87b&q=lovelock';


  // get current weather
  fetch(request1)  
  
  // parse response to JSON format
  .then(
    function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }
  )
  
  // do something with response
  .then(
    function(response) {
    // show full JSON object
    console.log(response);

    //document.getElementById('weather').innerHTML = response.weather[0].description;

    var degC1 = Math.floor(response.main.temp - 273.15);

    document.getElementById('weather1').innerHTML =degC1 + '°C <br>';
    }
  )
  
  // error handling
  .catch(
    function(status){

      document.getElementById('weather1').classList.add('hidden');
      // alert('something went wrong ' +status);
      // document.getElementById('weather').innerHTML = 'this city does not exist';
    }
    );
}

// init data stream
getAPIdata();

//ETA
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
    document.getElementById('countdown').innerHTML = 'ARRIVED TO MARS';
  }
}, 1000);


function updateTime(){

  var marsDay = new Date();
  document.getElementById('date').innerHTML = marsDay.getDate() + ' / ' + (marsDay.getMonth()+1) + ' / ' + (marsDay.getFullYear()+47);
  document.getElementById('time').innerHTML = addLeadingZero(marsDay.getHours()) + ' : ' + addLeadingZero(marsDay.getMinutes()) + ' : ' + addLeadingZero(marsDay.getSeconds());
  function addLeadingZero(number){
    if (number < 10) {
      number = '0'+ number;
    }
    return number;
  }
};

setInterval (updateTime , 1000);


