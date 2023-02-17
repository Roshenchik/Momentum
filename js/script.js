/*                    TRANSLATION                   */
const greetingTranslation = {
	ru: {morning: 'Доброе утро',
				day: 'Добрый день',
				evening: 'Добрый вечер',
				night: 'Доброй ночи',
				city: 'Минск',
				placeholderNick: ' введите ваше имя',
				placeholderCity: 'введите город',
			},
	en: {morning: 'Good morning',
				day: 'Good afternoon',
				evening: 'Good evening',
				night: 'Good night',
				city: 'Minsk',
				placeholderNick: ' enter your name',
				placeholderCity: 'enter your city',
			}, 
}


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
const nickname = document.querySelector('.name');
const greeting = document.querySelector('.greeting');
const cityInput = document.querySelector('.city');


const setOnLoad = (lang) => {
	nickname.placeholder = ` ${lang.placeholderNick}`;
	cityInput.placeholder = `${lang.placeholderCity}`;
	cityInput.value = `${lang.city}`;
	getWeather();
}
window.addEventListener('load', setOnLoad(greetingTranslation.ru));

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
console.log(greetingTranslation.en.night)
const showGreeting = (lang) => {
	const dayTime = getDayOfTime()

	switch (dayTime) {
		case 'night':
			greeting.textContent = `${lang.night},`
			break;
		case 'morning':
			greeting.textContent = `${lang.morning},`
			break;
		case 'afternoon':
			greeting.textContent = `${lang.day},`
			break;
		default: greeting.textContent = `${lang.evening},`
			break;
	}

	setTimeout(showGreeting, 1000)
}

showGreeting(greetingTranslation.ru);


/*                    CHANGE BACKGROUND                   */
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')


const getRandomNumber = (min, max) =>{
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
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuoteBtn = document.querySelector('.change-quote')



async function getQuote() {
	const url = `https://dummyjson.com/quotes/random`
	const res = await fetch(url);
	const data = await res.json();

	quote.textContent = `“${data.quote}”`;
	author.textContent = data.author;
}
getQuote();

let deg = 180
changeQuoteBtn.onclick = () => {
	getQuote();
	changeQuoteBtn.style.transform = `rotate(${deg}deg)`
	deg += 180
}

import quotes from "./quotes.js";
console.log(`length q ${quotes.length}`)
/*                            Add JSON                           */


/*                    MUSIC PLAYER                   */
import playlist from './playlist.js';
const play = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const playPrevBtn = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');
const audio = new Audio();

let isPlay = false
const playAudio = () =>{
	audio.src = playlist[playNum].src;
	audio.currentTime = pauseTime;
	audio.play();
	isPlay = true;
}

let pauseTime = 0;
const pauseAudio = () =>{
	audio.pause();
	pauseTime = audio.currentTime;
	isPlay = false;
}

play.addEventListener('click', () =>{
	play.classList.toggle('pause');
  (isPlay == false) ? playAudio() : pauseAudio();
});

let playNum = 0;
const playNext = () =>{
	if (playNum >= (playlist.length - 1)) {
		playNum = 0;
	}
	else {
		playNum++
	}
	playAudio();
	play.classList.add('pause');
	pauseTime = 0;
}

const playPrev = () =>{
	if (playNum < 1) {
		playNum = (playlist.length - 1);
	}
	else {
		playNum--
	}
	playAudio();
	play.classList.add('pause');
	pauseTime = 0;
}

audio.addEventListener('ended', playNext);

playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);

const addPlayItems = () => {
	playlist.forEach((song, index) => {
		const li = document.createElement('li');
		li.classList.add(`play-item`);
		li.classList.add(`item${index}`);
		li.textContent = song.title;
		playListContainer.append(li);
	})
}
addPlayItems();

const showAciveSongTitle = () =>{
	const playItems = document.querySelectorAll('.play-item');
	playItems.forEach((item) => item.classList.remove('active'))
	playItems[playNum].classList.add('active');
}

audio.addEventListener('playing', showAciveSongTitle)


/*                    SETTINGS                   */
const settings = document.querySelector('.settings');
const settingsBtn = document.querySelector('.setting-btn');
const displayMode = document.querySelectorAll('input[name="displayMode"]');
console.log(displayMode)

const openSettings = () =>{
	settings.classList.toggle('active');
}
settingsBtn.addEventListener('click', openSettings);

displayMode.forEach(checkbox => {
	checkbox.onclick = () =>{
		if (!checkbox.checked) {
			time.style.visibility = 'hidden';
		}
	}
})




