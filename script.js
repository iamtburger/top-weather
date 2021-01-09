let citySelector = document.querySelector('#citySelector');

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=107fb384a15bbc5b84dc868c6512493f`, {mode: 'cors'})
        const weather = await response.json()
    
        const weatherData = {
            "city": weather.name,
            "country": weather.sys.country,
            "temp": weather.main.temp,
            "feels": weather.main.feels_like,
            "wind": weather.wind.speed,
            "icon": weather.weather[0].icon,
            "desc": weather.weather[0].description
        }
        return weatherData
    } catch (error) {
        return error.message;
    }

}

async function renderWeather(weather) {

    const city = document.querySelector('#city');
    const temp = document.querySelector('#temperature');
    const feels = document.querySelector('#feels');
    const wind = document.querySelector('#wind');
    const icon = document.querySelector('#icon');

    city.innerHTML = `Weather in ${weather.city}, ${weather.country}`;
    temp.innerHTML = `Temp: ${Math.round(weather.temp)}&#x2103`;
    feels.innerHTML = `Feels like: ${Math.round(weather.feels)}&#x2103`;
    wind.innerHTML = `Wind: ${Math.round(weather.wind)} m/s`;
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.icon}.png" alt="${weather.desc}" title="${weather.desc}">`

}

citySelector.addEventListener('keypress', async function(e) {
    if (e.key === 'Enter') {
        try {
            const currentWeather = await getWeather(this.value);
            await renderWeather(currentWeather);
            citySelector.value = "";
        } catch (error) {
            throw new Error(error);
            alert('Oops! Something went wrong!')
        }

    }
})

window.onload = async function() {
    try {
        const currentWeather = await getWeather('budapest');
        await renderWeather(currentWeather)
    } catch (error) {
        throw new Error(error);
        alert('Oops! Something went wrong!')
    }
}