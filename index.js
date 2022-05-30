"use strict";
exports.__esModule = true;
var API_URL = 'https://icanhazdadjoke.com/';
var API_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=metric&appid=44e6a297395a966688d5d5bbea5acb93';
var API_CHUCKNORRIS = 'https://api.chucknorris.io/jokes/random';
var alternate = false;
var options = {
    method: 'GET',
    headers: {
        "Accept": "application/json"
    }
};
var spaceJoke = document.getElementById('p-joke');
var btnJoke = document.getElementById('btn-joke');
var spaceWeather = document.getElementById('weather-container');
var reportAcudits = [];
var weather = {
    'apiKey': '44e6a297395a966688d5d5bbea5acb93',
    fetchWeather: function () {
        var _this = this;
        fetch(API_WEATHER, options)
            .then(function (response) { return response.json(); })
            .then(function (data) { return _this.displayWeather(data); })["catch"](function (error) { return console.log(error); });
    },
    displayWeather: function (data) {
        var icon = data.weather[0].icon;
        var temp = data.main.temp;
        document.getElementById('space-temp').textContent = temp + 'ºC';
        document.getElementById('icon').setAttribute('src', 'https://openweathermap.org/img/wn/' + icon + '.png');
    }
};
function getJoke() {
    fetch(API_URL, options)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        spaceJoke.textContent = "".concat(data.joke);
        console.log(data);
        document.getElementById('btn-score').style.display = 'block';
        alternate = true;
    })["catch"](function (error) { return console.log(error); });
}
function getChuckJoke() {
    fetch(API_CHUCKNORRIS, options)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        spaceJoke.textContent = "".concat(data.value);
        console.log(data);
        document.getElementById('btn-score').style.display = 'block';
        alternate = false;
    })["catch"](function (error) { return console.log(error); });
}
function alternateJoke() {
    alternate ? getChuckJoke() : getJoke();
}
function sendScore(score) {
    var d = new Date();
    var dateText = d.toISOString();
    var reportedJoke = {
        joke: spaceJoke.textContent,
        score: score,
        date: dateText
    };
    reportAcudits.push(reportedJoke);
    console.log(reportedJoke);
    console.log(reportAcudits);
}
function thanks() {
    alert("La puntuació s'ha transmès correctament! Gràcies per votar!");
}
var UI = {
    message: {
        waiting: 'Estem cercant un acudit.',
        error: 'Hi ha hagut algun problema. Torna-ho a provar.'
    }
};
