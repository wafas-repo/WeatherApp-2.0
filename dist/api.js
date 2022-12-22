import { renderWeather } from "./dom_content";
import { renderDailyWeather } from "./dom_content";
import fromUnixTime from 'date-fns/fromUnixTime';

var apiKey = 'b8c83742a57bf0ecea649246f86171f0'

const getWeather = async function(unit, initCity = '') {
    const cityName = initCity || document.querySelector('#city-name').value || 'Toronto';
    const weatherData =  await fetchWeather(cityName, unit)
    console.log(weatherData)
    const lat = weatherData.coord.lat;
    const lon = weatherData.coord.lon;
    const extended_data = await getDatafor7days(lat, lon, unit);

    console.log(weatherData)

    const name = weatherData.name
    const temperature = weatherData.main.temp
    const temp_min = weatherData.main.temp_min
    const temp_max = weatherData.main.temp_max
    const feels_like = weatherData.main.feels_like
    const desription = weatherData.weather[0].description
    const dt = extended_data.current.dt;
    const timezone_offset = extended_data.timezone_offset;
    const dateTime = formatDate(dt, timezone_offset);
    const icon = getIcon(weatherData.weather[0].id);
    renderWeather(name, dateTime, temperature, temp_min, temp_max, feels_like, desription, icon);
    renderDailyWeather(extended_data);

}

function getIcon(id) {

    let icon = ''

    if(id >= 200 && id <= 232) {
        icon = 'thunderstorm'     
    } else if(id >= 300 && id <= 321) {
        icon = 'rain'
    } else if(id >= 500 && id <= 504) {
        icon = 'sunny-rain'
    } else if(id == 511){
        icon = 'snow'
    } else if(id >= 520 && id <= 531){
        icon = 'rain'
    } else if(id >= 600 && id <= 622){
        icon = 'snow'
    } else if(id >= 701 && id <= 781){
        icon = 'haze'
    } else if(id == 800){
        icon = 'clear'
    } else if(id == 801){
        icon = 'few-clouds'
    } else if(id >= 802 && id <= 804){
        icon = 'clouds'
    } 

    return icon;
}

// format a unix date to "Wed, Febuary 16th"
// return just the day of week if dateFormat = 'day'
function formatDate(unix, offset, dateFormat = 'full') {
    const date = fromUnixTime(unix + offset).toUTCString();
    let dayOfWeek = date.slice(0, 3);
    let dayOfMonth = date.slice(5, 7);
    let month = date.slice(8, 11);
    let hour = date.slice(17, 19);
    const minute = date.slice(20, 22);
    let amOrPm;
  
    // change 01 to 1 etc
    if (dayOfMonth < 10) {
      dayOfMonth = dayOfMonth.slice(1);
    }
  
    // convert short month name to full month name
    if (month === 'Jan') {
      month = 'January';
    } else if (month === 'Feb') {
      month = 'Febuary';
    } else if (month === 'Mar') {
      month = 'March';
    } else if (month === 'Apr') {
      month = 'April';
    } else if (month === 'May') {
      month = 'May';
    } else if (month === 'Jun') {
      month = 'June';
    } else if (month === 'Jul') {
      month = 'July';
    } else if (month === 'Aug') {
        month = 'August'
    } else if (month === 'Sep') {
        month = 'September'
    } else if (month === 'Oct') {
        month = 'October'
    } else if (month === 'Nov') {
        month = 'November'
    } else if (month === 'Dec') {
        month = 'December'
    }
  
    // return only the day of week
    if (dateFormat === 'day') {

        if (dayOfWeek === 'Mon') {
            dayOfWeek = 'Monday';
          } else if (dayOfWeek === 'Tue') {
            dayOfWeek = 'Tuesday';
          } else if (dayOfWeek === 'Wed') {
            dayOfWeek = 'Wednesday';
          } else if (dayOfWeek === 'Thu') {
            dayOfWeek = 'Thursday';
          } else if (dayOfWeek === 'Fri') {
            dayOfWeek = 'Friday';
          } else if (dayOfWeek === 'Sat') {
            dayOfWeek = 'Saturday';
          } else if (dayOfWeek === 'Sun') {
            dayOfWeek = 'Sunday';
          }

        return dayOfWeek;
    }

    if (hour > 11) {
        amOrPm = 'PM';
      } else {
        amOrPm = 'AM';
      }
    
      // change 24hr to 12hr time
      if (hour > 12) {
        hour -= 12;
      }

      // change am times to 12hr time
  if (hour < 10 && amOrPm === 'AM') {
    hour = hour.slice(1, 2);
  }

  // midnight formating
  if (hour === '0') {
    hour = 12;
  }
  
    // return full date string
    return `${dayOfWeek}, ${month} ${dayOfMonth} ${hour}:${minute} ${amOrPm}`;
  }

const getDatafor7days = async (lat, lon, unit) => {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }  
  };




const fetchWeather = async function(cityName, unit) {
    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`);
        const JSONResponse = await response.json()
        return JSONResponse;

    } catch(error) {
        console.log('fetchWeather catch')
        console.log(error)
    }
   
}

export {
    getWeather,
    formatDate,
    getIcon
}
