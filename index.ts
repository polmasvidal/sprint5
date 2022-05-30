export {};
const API_URL: string = 'https://icanhazdadjoke.com/';
const API_WEATHER: string = 'https://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=metric&appid=44e6a297395a966688d5d5bbea5acb93';
const API_CHUCKNORRIS: string = 'https://api.chucknorris.io/jokes/random';
let alternate = false;
const options = {
    method: 'GET',
    headers: {
        "Accept": "application/json"
    }
}
const spaceJoke = document.getElementById('p-joke');
const btnJoke = document.getElementById('btn-joke');
const spaceWeather = document.getElementById('weather-container');
const reportAcudits: ReportedJoke[] = [];

let weather = {
    'apiKey': '44e6a297395a966688d5d5bbea5acb93',
    fetchWeather: function () {
        fetch(API_WEATHER, options)
            .then(response => response.json())
            .then(data => this.displayWeather(data))
            .catch(error => console.log(error));
    },
    displayWeather: function(data) {
        const {icon} = data.weather[0];
        const {temp} = data.main;
        document.getElementById('space-temp').textContent = temp + 'ºC';
        document.getElementById('icon').setAttribute('src', 'https://openweathermap.org/img/wn/' + icon + '.png');
    }
}

interface Joke {
    id: string,
    joke: string,
    status: number
}

interface ReportedJoke {
    joke: string,
    score: number,
    date: string
}

interface ChuckJoke {
    created_at: string,
    icon_url: string,
    id: string,
    updated_at: string,
    url: string,
    value: string
}

function getJoke() {
    fetch(API_URL, options)
        .then(response => response.json())
        .then(data => {
            spaceJoke.textContent = `${data.joke}`;
            console.log(data);
            document.getElementById('btn-score').style.display = 'block';
            alternate = true;
            }
            )
        .catch(error => console.log(error));
}

function getChuckJoke() {
    fetch(API_CHUCKNORRIS, options)
        .then(response => response.json())
        .then(data => {
            spaceJoke.textContent = `${data.value}`;
            console.log(data);
            document.getElementById('btn-score').style.display = 'block';
            alternate = false;
            }
            )
        .catch(error => console.log(error));
}

function alternateJoke() {
    alternate ? getChuckJoke() : getJoke();
}

function sendScore(score: number) {
    const d = new Date();
    let dateText = d.toISOString();

    let reportedJoke = {
        joke: spaceJoke.textContent,
        score: score,
        date: dateText
    };

    reportAcudits.push(reportedJoke);
    console.log(reportedJoke);
    console.log(reportAcudits)
}

function thanks() {
    alert("La puntuació s'ha transmès correctament! Gràcies per votar!");
}

let UI = {
    message: {
        waiting: 'Estem cercant un acudit.',
        error: 'Hi ha hagut algun problema. Torna-ho a provar.'
    }
}