document.addEventListener("DOMContentLoaded", () => {
    const timeEls = document.querySelectorAll(".footer-time");
    const weatherEls = document.querySelectorAll(".footer-weather");

    // ---------- TIME ----------
    function updateTime() {
        const now = new Date();

        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;

        const utcOffset = now.getTimezoneOffset() / -60;
        const utcSign = utcOffset >= 0 ? "+" : "-";
        const utcString = `UTC${utcSign}${Math.abs(utcOffset)}`;

        const text = `${hours}:${minutes} ${ampm} (${utcString})`;

        timeEls.forEach(el => {
            el.textContent = text;
        });
    }

    updateTime();
    setInterval(updateTime, 1000);

    // ---------- WEATHER ----------
    const apiKey = '238d581aaca901802a77a9d5cd72f8c5';
    const lat = 43.7;     // Toronto
    const lon = -79.4;
    const units = 'metric';

    function getWeatherEmoji(condition) {
        switch (condition) {
            case 'Clear': return '☀️';
            case 'Clouds': return '☁️';
            case 'Rain': return '🌧️';
            case 'Drizzle': return '🌦️';
            case 'Thunderstorm': return '⛈️';
            case 'Snow': return '❄️';
            case 'Mist':
            case 'Fog':
            case 'Haze': return '🌫️';
            default: return '🌡️';
        }
    }

    async function updateWeather() {
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
            );

            if (!res.ok) throw new Error('Weather API error');

            const data = await res.json();

            const temp = Math.round(data.main.temp);
            const condition = data.weather[0].main;
            const emoji = getWeatherEmoji(condition);

            weatherEls.forEach(el => {
                el.textContent = `${emoji} ${temp}°C · Toronto`;
            });
        } catch (err) {
            console.error(err);
            weatherEl.textContent = 'Weather unavailable';
        }
    }

    updateWeather();
    setInterval(updateWeather, 10 * 60 * 1000);
});




// Footer 2025 Copyright
function fitTextToPaddingBox() {
    const containers = document.querySelectorAll('.footer-container');

    containers.forEach(container => {
        const el = container.querySelector('.footer-credit-bottom h4');
        if (!el) return;

        // Clone for measurement
        const clone = el.cloneNode(true);
        clone.style.cssText = `
        position:absolute;
        visibility:hidden;
        white-space:nowrap;
        font-size:10px;
        line-height:1;
        margin:0;
        padding:0;
        left:0;
        top:0;
    `;

        container.appendChild(clone);
        const naturalWidth = clone.getBoundingClientRect().width;
        clone.remove();

        if (!naturalWidth) return;

        const cs = getComputedStyle(container);
        const containerWidth = container.getBoundingClientRect().width;

        const innerWidth =
            containerWidth -
            parseFloat(cs.paddingLeft || 0) -
            parseFloat(cs.paddingRight || 0);

        const newFontSize = 10 * (innerWidth / naturalWidth);
        el.style.fontSize = `${newFontSize}px`;
    });
}

window.addEventListener('load', fitTextToPaddingBox);
window.addEventListener('resize', fitTextToPaddingBox);