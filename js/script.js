/*                    TRANSLATION                   */
const languagePreset = {
	ru: {morning: 'Доброе утро',
				day: 'Добрый день',
				evening: 'Добрый вечер',
				night: 'Доброй ночи',
				city: 'Минск',
				date: 'ru-RU',
				placeholderNick: ' введите ваше имя',
				placeholderCity: 'введите город',
				weather: 'ru',
				quote: 'ru',
				settings: {
					languageTitle: 'Язык',
					displayTitle: 'Отображение',
					displayElements: ['Время', 'Дата', 'Приветствие', 'Цитата', 'Погода', 'Аудиоплеер',]
				},
			},
	en: {morning: 'Good morning',
				day: 'Good afternoon',
				evening: 'Good evening',
				night: 'Good night',
				city: 'Minsk',
				date: 'en-EN',
				placeholderNick: ' enter your name',
				placeholderCity: 'enter your city',
				weather: 'en',
				quote: 'en',
				settings: {
					languageTitle: 'Language',
					displayTitle: 'Display',
					displayElements: ['Time', 'Date', 'Greeting', 'Quote', 'Weather', 'Audioplayer',],
				},
			}, 
}

let language = languagePreset.ru;

/*                    TIME*                   */
const time = document.querySelector('.time');
const day = document.querySelector('.date');

function showDate(lang) {
	const date = new Date();
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	const currentDate = date.toLocaleDateString(lang.date, options);
	day.textContent = currentDate;
}

function showTime() {
		const date = new Date();
		const currentTime = date.toLocaleTimeString().slice(0,-3);
		time.textContent = currentTime;
		showDate(language);
		setTimeout(showTime, 1000);
}

showTime();


/*                    GREETING                   */
const greetingContainer = document.querySelector('.greeting-container');
const nickname = document.querySelector('.name');
const greeting = document.querySelector('.greeting');
const cityInput = document.querySelector('.city');


const setOnLoad = (lang) => {
	nickname.placeholder = ` ${lang.placeholderNick}`;
	cityInput.placeholder = `${lang.placeholderCity}`;
	cityInput.value = `${lang.city}`;
	getWeather(language);
}
window.addEventListener('load', setOnLoad(language));




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

showGreeting(language);


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
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const weatherDiscription = document.querySelector('.weather-description')
const weatherIcon = document.querySelector('.weather-icon')


async function getWeather(lang) {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=${lang.weather}&appid=78e887c84dc6b4b5403440f66203ca87&units=metric`
	const res = await fetch(url);
	const data = await res.json();
	console.log(data.weather[0].id)

	
	temperature.textContent = `${Math.round(data.main.temp)} °C`;
	weatherDiscription.textContent = data.weather[0].description;
	weatherIcon.className = `weather-icon owf`;
	weatherIcon.classList.add(`owf-${data.weather[0].id}`);
}

cityInput.addEventListener('change', () =>{
	getWeather(language)
});


/*                    QUOTES                   */
const quoteContainer = document.querySelector('.quote-container');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuoteBtn = document.querySelector('.change-quote')
import quotes from './quotes.js';
import quotesRu from './quotes-ru.js';


function getQuote(lang) {
	const randomQuote = getRandomNumber(0, quotes.length-1);
	const randomQuoteRu = getRandomNumber(0, quotesRu.length-1);
	switch (lang.quote) {
		case 'en':
			console.log(quotes[randomQuote])
			quote.textContent = `“${quotes[randomQuote].text}”`;
			author.textContent = quotes[randomQuote].author;
			break;
		case 'ru':
			console.log(quotes[randomQuote])
			quote.textContent = `“${quotesRu[randomQuoteRu].text}”`;
			author.textContent = quotesRu[randomQuoteRu].author;
			break;
	}
}
getQuote(language);

let deg = 180
changeQuoteBtn.onclick = () => {
	getQuote(language);
	changeQuoteBtn.style.transform = `rotate(${deg}deg)`
	deg += 180
}



/*                            Add JSON                           */


/*                    MUSIC PLAYER                   */
import playlist from './playlist.js';
const player = document.querySelector('.player')
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
const displaySettings = document.querySelector('.display-settings');
const displayElement = displaySettings.querySelectorAll('.display-element');
const languageBtn = document.querySelectorAll('input[name="language"]');
const languageSettingTitle = document.querySelector('.language-setting-title');
const displaySettingTitle = document.querySelector('.display-setting-title');

const changeSettingsLang = (lang) => {
	languageSettingTitle.textContent = lang.settings.languageTitle;
	displaySettingTitle.textContent = lang.settings.displayTitle;
	displayElement.forEach((name, index) =>{
		name.textContent = lang.settings.displayElements[index];
	})
}
changeSettingsLang(language);

const openSettings = () =>{
	settings.classList.toggle('active');
}
settingsBtn.addEventListener('click', openSettings);

const examCheckboxes = checkbox => {
	const id = checkbox.id
	switch (id) {
		case 'time':
			!checkbox.checked ? time.classList.add('hidden') : time.classList.remove('hidden');
			break;
		case 'date': 
			!checkbox.checked ? day.classList.add('hidden') : day.classList.remove('hidden');
			break;
		case 'greeting':
			!checkbox.checked ? greetingContainer.classList.add('hidden') : greetingContainer.classList.remove('hidden');
			break;
		case 'quote':
			!checkbox.checked ? quoteContainer.classList.add('hidden') : quoteContainer.classList.remove('hidden');
			break;
		case 'weather':
			!checkbox.checked ? weather.classList.add('hidden') : weather.classList.remove('hidden');
			break;
		case 'player':
			!checkbox.checked ? player.classList.add('hidden') : player.classList.remove('hidden');
			break;
	}
}

const hideInterface = () =>{
	displayMode.forEach(checkbox => {
		checkbox.addEventListener('change', () => {
			examCheckboxes(checkbox)
		})
	})
}
hideInterface();

const setLang = (btn) => {
	const id = btn.id;
	switch (id) {
		case 'lang-ru':
			language = languagePreset.ru;
			btn.checked = true;
			break;
		case 'lang-en':
			language = languagePreset.en;
			btn.checked = true;
			break;
	}
	showGreeting(language);
	getWeather(language);
	getQuote(language);
	changeSettingsLang(language)
	showTime();
}

const changeLang = () =>{
	languageBtn.forEach(lang => {
		lang.addEventListener('change', () =>{
			setLang(lang)
		})
	})
}
changeLang();


const setLocalStorage = () => {
	localStorage.setItem('name', nickname.value)
	localStorage.setItem('city', cityInput.value)
	displayMode.forEach (checkbox => {
		let isChecked = checkbox.checked;
		localStorage.setItem(checkbox.id, isChecked);
	})
	languageBtn.forEach (radio => {
		let isTurned = radio.checked;
		localStorage.setItem(radio.id, isTurned);
	})
}
window.addEventListener('beforeunload', setLocalStorage)

const getLocalStorage = () => {
	if(localStorage.getItem('name')) {
		nickname.value = localStorage.getItem('name')
	}
	if(localStorage.getItem('city')) {
		cityInput.value = localStorage.getItem('city')
	}
	displayMode.forEach(checkbox => {
		let isChecked = localStorage.getItem(checkbox.id);
		checkbox.checked = (isChecked === 'true');
		examCheckboxes(checkbox)
	})
	languageBtn.forEach(radio => {
		let isChecked = localStorage.getItem(radio.id);
		if (isChecked === 'true'){

			setLang(radio);
		}
	})
	getWeather(language);
}
window.addEventListener('load', getLocalStorage)




// const state = {
//   language: 'en', 
//   photoSource: 'github',
//   blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio']
// }






