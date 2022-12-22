import { getWeather } from "../dist/api";

const form = document.querySelector('form');
const cityName = document.querySelector('#city-name');
let unit = 'metric'
const farenheitBtn = document.querySelector('.f-btn');
const celciusBtn = document.querySelector('.change-unit .c-btn');

if (unit == 'metric') {
    celciusBtn.classList.add('active-unit');
}

farenheitBtn.addEventListener('click', () => {
    celciusBtn.classList.remove('active-unit');
    farenheitBtn.classList.remove('active-unit')
    farenheitBtn.classList.add('active-unit');
    unit = 'imperial'
    getWeather(unit)

})

celciusBtn.addEventListener('click', () => {
    celciusBtn.classList.remove('active-unit');
    farenheitBtn.classList.remove('active-unit')
    celciusBtn.classList.add('active-unit');
    unit = 'metric'
    getWeather(unit);
})


form.addEventListener('submit', (event) => {
    event.preventDefault()
    getWeather(unit);
});

function init() {
	getWeather(unit, 'Toronto');
}
init()




