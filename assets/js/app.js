// element references
const buttonEl = document.querySelector(".click");
const inputEl = document.querySelector('#input');
const currentCity = document.querySelector('#currentCity');
const searchEl = document.querySelector(".list-group");




// variables
const rootApiUrl = 'https://api.openweathermap.org';
const myApiKey = '94bb7586d2b9a5b650867004d68a2e5d';
const currentDate = moment().format('l');
const searchHistoryList =localStorage.getItem("city")?JSON.parse(localStorage.getItem("city")):[];

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
        
            var city = inputEl.value.trim();
            $('.currentContainer').show();
            $("#currentCity").text(city);
            $("#currentDate").text(currentDate);

            fetchWeather(lat, lon);
            fetchForecast(lat, lon);


            if (!searchHistoryList.includes(city)) {
                searchHistoryList.push(city);
                var btn = document.createElement('button');
                btn.classList.add('list-group');
                btn.classList.add('col-12');
                btn.setAttribute('searched-city', city);
                btn.textContent = city;
                $('#searchHistory').append(btn);
            };
        
            localStorage.setItem("city", JSON.stringify(searchHistoryList));
            console.log(searchHistoryList);
    
        })
        .catch (function(error) {
            renderBadCity();
        })
};
function renderBadCity() {
    var city = inputEl.value.trim();
    $('.currentContainer').show();
    $("#currentCity").text("Could not find " + city);
    $("#currentDate").text(currentDate);
};
function fetchWeather(lat, lon) {
    let apiUrl = `${rootApiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${myApiKey}`;
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
            console.log("data", data);
            // checks uvi and sets a bg color to indicate favorable,moderate or severe
            if (uvi <=3 ) {
                $("#li4").addClass("uvLow");
            } else if (uvi >=4 && uvi <8 )  {
                $('#li4').addClass("uvMod");
            } else {
                $("#li4").addClass("uvSevere");
            }
            //displays current weather icon, temp, humid, wind, and uvi
            $('#currentIcon').html(`<img src=${iconUrl}>`);
            $("#li1").text("Temp: " + temp + " °F");
            $("#li2").text("Humidity: " + humid + "%");
            $("#li3").text("Wind Speed: " + windSpeed + " MPH");
            $("#li4").text("UVI: " + uvi);
        })
}

function fetchForecast(lat, lon) {
    let apiUrl = `${rootApiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${myApiKey}`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $('.forecastContainer').empty();
            for (let i = 0; i < 5; i++) {
                var cityInfo = {
                    date: data.daily[i].dt,
                    icon: data.daily[i].weather[0].icon,
                    temp: data.daily[i].temp.day,
                    wind: data.daily[i].wind_speed,
                    humid: data.daily[i].humidity,
                };
                var currDate = moment.unix(cityInfo.date).format("MM/DD/YYYY");
                var currUrl = `<img src="https://openweathermap.org/img/w/${cityInfo.icon}.png">`;

                var futureCard = $(`
                       
                        <div class="card card-body cardSamm">
                            <h5>${currDate}</h5>
                            <p>${currUrl}</p>
                            <p>Temp: ${cityInfo.temp} °F</p>
                            <p>Wind: ${cityInfo.wind} MPH </p>
                            <p>Humidity: ${cityInfo.humid}\%</p>
                    </div>
                
            `);
                $(".forecastContainer").append(futureCard);
               
            }
        });
}

//takes user input and sets current weather and forecast to match that city
function search() {
    var city = inputEl.value.trim();
    fetchCoord(city);
    // $('.currentContainer').show();
    // $("#currentCity").text(city);
    // $("#currentDate").text(currentDate);
    // if (!searchHistoryList.includes(city)) {
    //     searchHistoryList.push(city);
    //     var btn = document.createElement('button');
    //     btn.classList.add('list-group');
    //     btn.classList.add('col-12');
    //     btn.setAttribute('searched-city', city);
    //     btn.textContent = city;
    //     $('#searchHistory').append(btn);
    // };

    // localStorage.setItem("city", JSON.stringify(searchHistoryList));
    // console.log(searchHistoryList);
};




function searchAgain(e) {
    var btn = e.target;
    var searchItem = btn.getAttribute("searched-city")
    console.log(searchItem);
      $(".currentContainer").show();
    $("#currentCity").text(searchItem);
    $("#currentDate").text(currentDate);
    fetchCoord(searchItem);
    
}
function persistHistory() {
       $('.currentContainer').show();
for(let i=0;i<searchHistoryList.length;i++) {
        var city = searchHistoryList[i];
        var btn = document.createElement('button');
        btn.classList.add('list-group');
        btn.classList.add('col-12');
        btn.setAttribute('searched-city', city);
        btn.textContent = city;
        $('#searchHistory').append(btn);
    };
}


// event listeners
buttonEl.addEventListener('click', search);
searchEl.addEventListener('click', searchAgain);

persistHistory();
