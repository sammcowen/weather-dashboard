// element references
const buttonEl = document.querySelector(".btn");
const inputEl = document.querySelector('#input');
const currentCity = document.querySelector('#currentCity');


// variables
const rootApiUrl = 'https://api.openweathermap.org';
const myApiKey = '94bb7586d2b9a5b650867004d68a2e5d';
const currentDate = moment().format('ll');
const searchHistoryList = [];


//functions
function fetchCoord(city) {
    let apiUrl = `${rootApiUrl}/geo/1.0/direct?q=${city}&limit=1&appid=${myApiKey}`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('data', data);
            const lat = data[0].lat;
            const lon = data[0].lon;
            console.log('lat', data[0].lat);
            console.log('lon', data[0].lon);

            fetchWeather(lat, lon);
            fetchForecast(lat, lon);


        })

};
function fetchWeather(lat, lon) {
    let apiUrl = `${rootApiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}$units=imperial&appid=${myApiKey}`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            const temp = data.current.temp;
            const humid = data.current.humidity;
            const windSpeed = data.current.wind_speed;
            const uvi = data.current.uvi;
            const iconCode = data.current.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

            // checks uvi and sets a bg color to indicate favorable,moderate or severe
            if (uvi.value < 3) {
                $("#li4").addClass("uvLow");
            } else if (uvi.value >= 8) {
                $('#li4').addClass("uvSevere");
            } else {
                $("#li4").addClass("uvMod");
            }
            //displays current weather icon, temp, humid, wind, and uvi
            $('#currentIcon').append(`<img src=${iconUrl}>`);
            $("#li1").text("Temp: " + temp);
            $("#li2").text("Humidity: " + humid);
            $("#li3").text("Wind Speed: " + windSpeed);
            $("#li4").text("UVI: " + uvi);
            //displays 5 day forecast of weather 


        })


}

// function fetchForecast(lat, lon) {
//     let apiUrl = `${rootApiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${myApiKey}`;
//     fetch(apiUrl)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data.daily[0].temp);
//             console.log(data.daily[0].wind_speed);
//             console.log(data.daily[0].humidity);
//         })
// }



//takes user input and sets current weather and forecast to match that city
function search() {
    var city = inputEl.value.trim();
    //console.log('city', city);
    fetchCoord(city);
    $("#currentCity").text(city);
    $("#currentDate").text(currentDate);
    localStorage.setItem("city", JSON.stringify(searchHistoryList));
    console.log(searchHistoryList);



};

// event listeners
buttonEl.addEventListener('click', search);


