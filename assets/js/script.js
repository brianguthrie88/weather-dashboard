// Get the search button element by its ID
var searchBtn = document.getElementById('button-addon1');
// Define the API key for accessing weather data
var APIKey = "a4a18677c24b50723bd5595b92f14e67";

// Function to get the current weather data for a user-input city
function getCurrentWeather() {
    // Get the city input from the user
    var userInputCity = document.getElementById('city').value;
    // Get the search buttons container element
    var searchButtonsDiv = document.querySelector('.search-buttons');

    // Fetch current weather data from the OpenWeatherMap API
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${userInputCity}&appid=${APIKey}&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Log the retrieved data
            console.log(data);

            // Extract and format the date from the Unix timestamp
            const myUnixTimestamp = data.dt;
            const myDate = new Date(myUnixTimestamp * 1000).toLocaleDateString();

            // Display the city name and date
            var city = data.name;
            var cityName = document.querySelector('.todays-weather h2');
            cityName.textContent = `${city} ${myDate}`;

            // Display current temperature, wind speed, and humidity
            var currentTemp = document.getElementById('currentTemp');
            currentTemp.textContent = `Temp: ${data.main.temp} degrees`;

            var currentWind = document.getElementById('currentWind');
            currentWind.textContent = `Wind: ${data.wind.speed} mph`;

            var currentHumidity = document.getElementById('currentHumidity');
            currentHumidity.textContent = `Humidity: ${data.main.humidity}%`;

            // Get the future weather forecast
            getFutureForecast();

            // Check and update the search history in local storage
            var nonEmptyArr = JSON.parse(localStorage.getItem('city'));
            if (nonEmptyArr !== null) {
                if (!nonEmptyArr.includes(city)) {
                    nonEmptyArr.push(city);
                    localStorage.setItem('city', JSON.stringify(nonEmptyArr));

                    // Create a button for the searched city and add it to the search history
                    var searchButton = document.createElement('button');
                    searchButton.textContent = city;
                    searchButtonsDiv.append(searchButton);

                    // Add an event listener to the newly created button to display weather for the selected city
                    searchButton.addEventListener('click', function () {
                        document.getElementById('city').value = city;
                        getCurrentWeather();
                    });
                }
            } else {
                var cityArr = [city];
                localStorage.setItem('city', JSON.stringify(cityArr));

                // Create a button for the searched city and add it to the search history
                var searchButton = document.createElement('button');
                searchButton.textContent = city;
                searchButtonsDiv.append(searchButton);

                // Add an event listener to the newly created button to display weather for the selected city
                searchButton.addEventListener('click', function () {
                    document.getElementById('city').value = city;
                    getCurrentWeather();
                });
            }
        });
}

function getFutureForecast() {
    var userInputCity = document.getElementById('city').value;
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${userInputCity}&appid=${APIKey}&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);

                    var dateOne = document.getElementById('dayOneDate');
                    var dateTwo = document.getElementById('dayTwoDate');
                    var dateThree = document.getElementById('dayThreeDate');
                    var dateFour = document.getElementById('dayFourDate');
                    var dateFive = document.getElementById('dayFiveDate');

                    var tempOne = document.getElementById('dayOneTemp');
                    var tempTwo = document.getElementById('dayTwoTemp');
                    var tempThree = document.getElementById('dayThreeTemp');
                    var tempFour = document.getElementById('dayFourTemp');
                    var tempFive = document.getElementById('dayFiveTemp');

                    var windOne = document.getElementById('dayOneWind');
                    var windTwo = document.getElementById('dayTwoWind');
                    var windThree = document.getElementById('dayThreeWind');
                    var windFour = document.getElementById('dayFourWind');
                    var windFive = document.getElementById('dayFiveWind');

                    var humOne = document.getElementById('dayOneHumidity');
                    var humTwo = document.getElementById('dayTwoHumidity');
                    var humThree = document.getElementById('dayThreeHumidity');
                    var humFour = document.getElementById('dayFourHumidity');
                    var humFive = document.getElementById('dayFiveHumidity');

                    dateOne.textContent = new Date(data.list['7'].dt * 1000).toLocaleDateString();
                    dateTwo.textContent = new Date(data.list['15'].dt * 1000).toLocaleDateString();
                    dateThree.textContent = new Date(data.list['23'].dt * 1000).toLocaleDateString();
                    dateFour.textContent = new Date(data.list['31'].dt * 1000).toLocaleDateString();
                    dateFive.textContent = new Date(data.list['39'].dt * 1000).toLocaleDateString();

                    tempOne.textContent = `Temp: ${data.list['7'].main.temp} degrees`;
                    tempTwo.textContent = `Temp: ${data.list['15'].main.temp} degrees`;
                    tempThree.textContent = `Temp: ${data.list['23'].main.temp} degrees`;
                    tempFour.textContent = `Temp: ${data.list['31'].main.temp} degrees`;
                    tempFive.textContent = `Temp: ${data.list['39'].main.temp} degrees`;


                    windOne.textContent = `Wind: ${data.list['7'].wind.speed} mph`;
                    windTwo.textContent = `Wind: ${data.list['15'].wind.speed} mph`;
                    windThree.textContent = `Wind: ${data.list['23'].wind.speed} mph`;
                    windFour.textContent = `Wind: ${data.list['31'].wind.speed} mph`;
                    windFive.textContent = `Wind: ${data.list['39'].wind.speed} mph`;

                    humOne.textContent = `Humidity: ${data.list['7'].main.humidity}%`;
                    humTwo.textContent = `Humidity: ${data.list['15'].main.humidity}%`;
                    humThree.textContent = `Humidity: ${data.list['23'].main.humidity}%`;
                    humFour.textContent = `Humidity: ${data.list['31'].main.humidity}%`;
                    humFive.textContent = `Humidity: ${data.list['39'].main.humidity}%`;

                });
            });
}

//function that calls the get current weather app when the search button is clicked
searchBtn.addEventListener('click', getCurrentWeather);

// Function to clear local storage data
function clearLocalStorage() {
    localStorage.clear();
}

// Call the function to clear local storage data when the page is loaded
window.onload = clearLocalStorage;