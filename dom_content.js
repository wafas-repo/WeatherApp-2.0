import * as api from './api';

function renderWeather(cityName, dateTime, temp, temp_max, temp_min, feels_like, desc, icon) {
    
    const cityNameNode = document.querySelector('.city-name');
    cityNameNode.textContent = cityName;

    const dateTimeNode = document.querySelector('.dt');
    dateTimeNode.textContent = dateTime;

    const tempNode = document.querySelector('.temperature');
    tempNode.textContent = Math.round(temp)+"°"

    const lowHighTempNode = document.querySelector('.high-low');
    lowHighTempNode.textContent = Math.round(temp_min)+"°"+" / " + Math.round(temp_max)+"°"

    const feelsLikeNode = document.querySelector('.feels-like');
    feelsLikeNode.textContent = "Feels like "+Math.round(feels_like)+"°"

    const descNode = document.querySelector('.weather-description');
    descNode.textContent = desc

    const iconNode = document.querySelector('.weather-icon');
    iconNode.innerHTML = renderIcon(icon);

}

function renderIcon(icon) {
    if(icon == 'thunderstorm') {
        return `<img class="weather-img" src="./img/thunderstorm-100.png" alt="">`;
    } else if(icon == 'rain') {
        return `<img class="weather-img" src="./img/shower-rain-100.png" alt="">`;
    } else if(icon == 'sunny-rain') {
        return `<img class="weather-img" src="./img/rain-100.png" alt="">`;
    } else if(icon == 'snow') {
        return `<img class="weather-img" src="./img/snow-100.png" alt="">`;
    } else if(icon == 'haze') {
        return `<img class="weather-img" src="./img/haze-100.png" alt="">`;
    } else if(icon == 'clear') {
        return `<img class="weather-img" src="./img/clear-sky-100.png" alt="">`;
    } else if(icon == 'few-clouds') {
        return `<img class="weather-img" src="./img/few-clouds-100.png" alt="">`;
    } else if(icon == 'clouds') {
        return `<img class="weather-img" src="./img/scattered-clouds-100.png" alt="">`;
    }
}

function renderDailyIcon(icon) {
    if(icon == 'thunderstorm') {
        return `<img class="weather-img" src="./img/thunderstorm-50.png" alt="">`;
    } else if(icon == 'rain') {
        return `<img class="weather-img" src="./img/shower-rain-50.png" alt="">`;
    } else if(icon == 'sunny-rain') {
        return `<img class="weather-img" src="./img/rain-50.png" alt="">`;
    } else if(icon == 'snow') {
        return `<img class="weather-img" src="./img/snow-50.png" alt="">`;
    } else if(icon == 'haze') {
        return `<img class="weather-img" src="./img/haze-50.png" alt="">`;
    } else if(icon == 'clear') {
        return `<img class="weather-img" src="./img/clear-sky-50.png" alt="">`;
    } else if(icon == 'few-clouds') {
        return `<img class="weather-img" src="./img/few-clouds-50.png" alt="">`;
    } else if(icon == 'clouds') {
        return `<img class="weather-img" src="./img/scattered-clouds-50.png" alt="">`;
    }
}

function renderDailyWeather(data) {

    console.log(data);

    for(let i=1;i<8;i++){
        const daily_weather_day = document.querySelector('#day-'+i);
        daily_weather_day.textContent = api.formatDate(
            data.daily[i].dt,
            data.timezone_offset,
            'day'
        );
    }

    for(let i=1;i<8;i++) {
        const daily_weather_date = document.querySelector('#date-'+i);
        daily_weather_date.textContent = new Date(data.daily[i].dt *1000).toString().slice(4, 10);
    }

    for(let i=1;i<8;i++){
        const daily_weather_icon = document.querySelector('#day-'+i+'-icon');
        daily_weather_icon.innerHTML = renderDailyIcon(api.getIcon(data.daily[i].weather[0].id))
    }

    for(let i=1;i<8;i++){
        const daily_weather_max = document.querySelector('#day-'+i+'-temp-max');
        daily_weather_max.innerHTML = Math.round(data.daily[i].temp.max)+"°"

        const daily_temp_low = document.querySelector('#day-'+i+'-temp-low');
        daily_temp_low.innerHTML = Math.round(data.daily[i].temp.min)+"°"
    }
}


export {
    renderWeather,
    renderDailyWeather
}