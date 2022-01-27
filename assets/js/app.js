// element references
const buttonEl = document.querySelector(".btn");
const inputEl = document.querySelector('#input');

// variables
const rootApiUrl = 'https://api.openweathermap.org';
const myApiKey = '94bb7586d2b9a5b650867004d68a2e5d';

//functions
function fetchCoord(city) {
    let apiUrl = `${rootApiUrl}/geo/1.0/direct?q=${city}&limit=1&appid=${myApiKey}`;
    fetch(apiUrl)
    .then(function(response){
            return response.json();
    })
    .then(function(data){
        console.log('data', data);
        const lat = data[0].lat;
        const lon = data[0].lon;
        console.log('lat',data[0].lat);
        console.log('lon', data[0].lon);

        fetchWeather();
    

    })

};
function fetchWeather() {
    let apiUrl = `${rootApiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${myApiKey}`;
    fetch(apiUrl)
    .then (function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
    })

}


function search() {
    var city = inputEl.value.trim();
    console.log('city', city);
        fetchCoord(city);
      
};

// add event listeners
buttonEl.addEventListener('click', search);


