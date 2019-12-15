const geoContainer = document.querySelector(".js-geo");
const geoWeather = geoContainer.querySelector(
  ".js-geo__weather"
);
const geoIcon = geoWeather.querySelector(
  ".js-weather__icon"
);
const geoTemp = geoWeather.querySelector(
  ".js-weather__temp"
);
const geoLocation = geoContainer.querySelector(
  ".js-geo__location"
);
const W_API_KEY = "0510b564097fab4eedda6cf87cb5fde5";

function getWeather(lat, long) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${W_API_KEY}&units=metric`
  )
    .then(response => response.json())
    .then(json => {
      geoIcon.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
      geoTemp.innerText = `${json.main.temp.toFixed(1)}˚C`;
      geoLocation.innerText = json.name;
    });
  //위치: google map API 로 변경
}

function paintLocation() {
  geoLocation.innerText = `${coordsTemp.lat}, ${coordsTemp.long}`;
}
//
function geoSuccess(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  getWeather(lat, long);
}

function geoError() {
  geoLocation.innerText = "Err!";
}

function init() {
  navigator.geolocation.getCurrentPosition(
    geoSuccess,
    geoError
  );
}

init();
