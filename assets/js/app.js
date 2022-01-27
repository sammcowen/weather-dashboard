// element references
const buttonEl = document.querySelector(".btn");
const inputEl = document.querySelector('#input');

// variables
const rootApiUrl = 'https://api.openweathermap.org';
const myApiKey = '94bb7586d2b9a5b650867004d68a2e5d';

//functions
function fetchLoc(city) {
    var apiUrl = `${rootApiUrl}/geo/1.0/direct?q=${city}&limit=5&appid=${myApiKey}`;
    fetch(apiUrl)
    .then(function(response){
            return response.json();
    })
    .then(function(data){
        console.log('data'. data);
    })

}


function search() {
    const city = inputEl.value.trim();
    console.log('city', city);
        fetchLoc(city);
}

// add event listeners
buttonEl.addEventListener('click', search);


