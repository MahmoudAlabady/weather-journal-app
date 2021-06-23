/* Global Variables */
//let baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = '&appid=3e71c477586c5ad55f1a7c40e59e2b97&units=metric';
let generate = document.getElementById('generate');
let htmlDate = document.getElementById('date');
let htmlTemp = document.getElementById('temp');
let htmlContent = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

const getWeather = async (baseUrl, zipCode, apiKey) => {
    const respond = await fetch(baseUrl + zipCode + apiKey)
    try {
        const weatherData = await respond.json()
        return weatherData;
    } catch (error) {
        console.log("error", error);

    }
}

function validateZipCode(elementValue){
    var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
     return zipCodePattern.test(elementValue);
}

generate.addEventListener('click', generateWeather);

function generateWeather(event) {
    let zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    if (validateZipCode(zipCode)) {
        getWeather(baseUrl, zipCode, apiKey)
            .then(function (weather) {
                console.log(weather);
                dataPost('/showWeather', {
                    temperature: weather.main.temp,
                    date: newDate,
                    user_response: feelings,
                })
                updateWeatherUI();
            });

    }else{
        alert("you have to put zip code!!!");
    }

    //.then(function(update){} )

}


const dataPost = async (url = '', weatherData = {}) => {
    console.log(weatherData);
    const respond = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(weatherData),
    });
    try {
        const newWeatherData = await respond.json();
        console.log(newWeatherData);
        return newWeatherData;
    } catch (error) {
        console.log(error);
    }
}

const updateWeatherUI = async () => {
    const req = await fetch('/all');
    try {
        const myData = await req.json();
        htmlTemp.innerHTML = myData.temperature + " C";
        htmlDate.innerHTML = myData.date;
        htmlContent.innerHTML = "this is your feelings: " + myData.user_response;

    } catch (error) {
        console.log(error);
    }
}