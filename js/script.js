/*                    TIME*                   */
const time = document.querySelector('.time');
const day = document.querySelector('.date');

function showDate() {
	const date = new Date();
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	const currentDate = date.toLocaleDateString('ru-RU', options);
	day.textContent = currentDate;
}

function showTime() {
		const date = new Date();
		const currentTime = date.toLocaleTimeString().slice(0,-3);
		time.textContent = currentTime;
		showDate();
		setTimeout(showTime, 1000);
}

showTime();


/*                    GREETING                   */
const nickname = document.querySelector('.name')
const greeting = document.querySelector('.greeting')


const setOnLoad = () => {
	nickname.placeholder = ' введите ваше имя'
	cityInput.placeholder = 'Введите город'
}
window.addEventListener('load', setOnLoad)

const setLocalStorage = () => {
	localStorage.setItem('name', nickname.value)
	localStorage.setItem('city', cityInput.value)
}

const getLocalStorage = () => {
	if(localStorage.getItem('name')) {
		nickname.value = localStorage.getItem('name')
	}
	if(localStorage.getItem('city')) {
		cityInput.value = localStorage.getItem('city')
		getWeather();
	}
}

window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)


const getDayOfTime = () => {
	const date = new Date();
	const dayTime = date.toLocaleTimeString().slice(0,-6);

	if (dayTime >= 0 && dayTime <= 6) {
		return 'night';
	} 
	else if (dayTime >= 6 && dayTime < 12) {
		return 'morning';
	}
	else if (dayTime >= 12 && dayTime < 18) {
		return 'afternoon';
	}
	else {
		return 'evening';
	}
}

const showGreeting = () => {
	const dayTime = getDayOfTime()

	switch (dayTime) {
		case 'night':
			greeting.textContent = `Доброй ночи,`
			break;
		case 'morning':
			greeting.textContent = `Доброе утро,`
			break;
		case 'afternoon':
			greeting.textContent = `Добрый день,`
			break;
		default: greeting.textContent = `Добрый вечер,`
			break;
	}

	setTimeout(showGreeting, 1000)
}

showGreeting();


/*                    CHANGE BACKGROUND                   */
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')


getRandomNumber = (min, max) =>{
	const random = Math.round(min + Math.random() * (max - min));
	const randomWithZeros = String(random).padStart(2, '0');
	return randomWithZeros;
}
let randomNum = getRandomNumber(1, 20)

const setBg = (number, dayTime) =>{
	let img = new Image()
	img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayTime}/${number}.jpg`
	img.onload = () =>{
		body.style.backgroundImage = `url("https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayTime}/${number}.jpg")`
	}
}

setBg(randomNum, getDayOfTime())


const getSlideNext = () =>{
	if (randomNum >= 20) {
		randomNum = '01'
	}
	else {
		randomNum++
		randomNum = String(randomNum).padStart(2, '0')
	}

	setBg(randomNum, getDayOfTime())
}

const getSlidePrev = () =>{
	if (randomNum <= 1) {
		randomNum = '20'
	}
	else {
		randomNum--
		randomNum = String(randomNum).padStart(2, '0')
	}

	setBg(randomNum, getDayOfTime())
}

slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)


/*                    UPLOAD WEATHER                   */
const temperature = document.querySelector('.temperature')
const weatherDiscription = document.querySelector('.weather-description')
const weatherIcon = document.querySelector('.weather-icon')
const cityInput = document.querySelector('.city')


async function getWeather() {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=ru&appid=78e887c84dc6b4b5403440f66203ca87&units=metric`
	const res = await fetch(url);
	const data = await res.json();
	console.log(data.weather[0].id)

	
	temperature.textContent = `${Math.round(data.main.temp)} °C`;
	weatherDiscription.textContent = data.weather[0].description;
	weatherIcon.className = `weather-icon owf`;
	weatherIcon.classList.add(`owf-${data.weather[0].id}`);
}

cityInput.addEventListener('change', getWeather);


/*                    QUOTES                   */

async function getQuote() {
	fetch('https://dummyjson.com/quotes/random')
	.then(res => res.json())
	.then(data => console.log(data.quote, data.author));
}
getQuote();
