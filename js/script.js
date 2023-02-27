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
				placeholderTags: 'Введите тэг (разд. пробелом)',
				weather: 'ru',
				quote: 'ru',
				playlist: 'Плейлист',
				settings: {
					languageTitle: 'Язык',
					imgSourceTitle: 'Фоновое изображение',
					displayTitle: 'Отображение',
					displayElements: ['Время', 'Дата', 'Приветствие', 'Цитата', 'Погода', 'Аудиоплеер',]
				},
				reminder: {
					what: 'Что напомнить:',
					when: 'Когда напомнить:',
				}
			},
	en: {morning: 'Good morning',
				day: 'Good afternoon',
				evening: 'Good evening',
				night: 'Good night',
				city: 'Minsk',
				date: 'en-EN',
				placeholderNick: ' enter your name',
				placeholderCity: 'enter your city',
				placeholderTags: 'Enter tag (space separated)',
				weather: 'en',
				quote: 'en',
				playlist: 'Playlist',
				settings: {
					languageTitle: 'Language',
					imgSourceTitle: 'Background image',
					displayTitle: 'Display',
					displayElements: ['Time', 'Date', 'Greeting', 'Quote', 'Weather', 'Audioplayer',],
				},
				reminder: {
					what: 'What to remind:',
					when: 'When to remind:',
				}
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
const tagsInput = document.querySelectorAll('.tags');
const playlistTitle = document.querySelector('.playlist-title');
const reminderTextTitle = document.querySelector('.reminder-text-title');
const reminderDateTitle = document.querySelector('.reminder-date-title');


const setOnLoad = (lang) => {
	nickname.placeholder = ` ${lang.placeholderNick}`;
	cityInput.placeholder = `${lang.placeholderCity}`;
	playlistTitle.textContent = `${lang.playlist}`
	reminderTextTitle.textContent = `${lang.reminder.what}`
	reminderDateTitle.textContent = `${lang.reminder.when}`
	tagsInput.forEach(tag => {
		tag.placeholder = `${lang.placeholderTags}`
	})
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

	setTimeout(() => {
		showGreeting(language)
	}, 1000);
}

showGreeting(language);


/*                    CHANGE BACKGROUND                   */
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')


const getRandomNumber = (min, max) =>{
	const random = Math.round(min + Math.random() * (max - min));
	return random;
}

const setBg = (number, arr, src) =>{
	let img = new Image();
	switch (src) {
		case 'flickr':
			img.src = arr[number].url_l;
			break;
		case 'unsplash':
			img.src = arr[number].urls.raw
			break;
		case 'github':
			let strNumber = String(number + 1).padStart(2, 0);
			img.src = `${arr}${strNumber}.jpg`;
			console.log(img.src)
			break;
	}
	img.onload = () =>{
		body.style.backgroundImage = `url(${img.src})`;
	}
}

let picArr = [];
let randomPic = null;
let picNum = null;
let imgSource = '';
let tagText = 'nature';

async function getGithubImage(dayTime) {
	imgSource = 'github';
		picArr = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayTime}/`;
		randomPic = getRandomNumber(0, 19)
		picNum = 19
		setBg(randomPic, picArr, imgSource);
}

async function getFlickrImage(dayTime) {
	imgSource = 'flickr';
	tagsInput.forEach(tag => {
		if(tag.classList.contains('flickr-tags')){
			if (tag.value){
				tagText = tag.value.toLowerCase().split(' ').join(',');
			}
		}
	})
		let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0b816c8eabb8f0d5f998ca8954f20fdf&tags=${dayTime},${tagText}&media=photos&safe_search=1&content_type=1&orientation=horizontal&min_width=1920&extras=url_l&format=json&nojsoncallback=1`;
		const res = await fetch(url);
		const data = await res.json();
		picArr = data.photos.photo;
		console.log(picArr)
		randomPic = getRandomNumber(0, picArr.length-1)
		picNum = picArr.length-1
		setBg(randomPic, picArr, imgSource);
}

async function getUnsplashImage(dayTime) {
	imgSource = 'unsplash';
	tagsInput.forEach(tag => {
		if(tag.classList.contains('unsplash-tags')){tagText = tag.value.toLowerCase().split(' ').join(',')}
	})
	let url = `https://api.unsplash.com/photos/random?orientation=landscape&w=3840&h=2160&query=${dayTime},${tagText}&count=30&client_id=KAAJHCc8NZFmv7DQ6dovX1FPI6Gvo_7RdQPPd5icE3M`
	const res = await fetch(url);
	picArr = await res.json();
	console.log(picArr);
	randomPic = getRandomNumber(0, picArr.length-1);
	picNum = picArr.length-1;
	setBg(randomPic, picArr, imgSource);
}

const getSlideNext = () =>{
	if (randomPic >= picNum) {
		randomPic = 0
	}
	else {
		randomPic++
	}

	setBg(randomPic, picArr, imgSource)
}

const getSlidePrev = () =>{
	if (randomPic <= 0) {
		randomPic = picNum
	}
	else {
		randomPic--
	}

	setBg(randomPic, picArr, imgSource)
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
			if (!quotes[randomQuote].author) {
				author.textContent = 'Uknown'
			}
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


/*                    MUSIC PLAYER                   */
import playlist from './playlist.js';
const player = document.querySelector('.player')
const play = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const playPrevBtn = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');
const progressBar = document.querySelector('.player-progressbar')
const timeIndicator = document.querySelector('.time-indicator')
const musicInfo = document.querySelector('.music-info')
const volume = document.querySelector('.volume')
const volumeBtn = document.querySelector('.volume-btn')
const audio = new Audio();

const setVolumeBtn = () => {
	if (audio.volume == 0) {
		volumeBtn.className = 'volume-btn mute'
	} 
	else if (audio.volume < 0.2){
		volumeBtn.className = 'volume-btn low'
	}
	else if (audio.volume < 0.6){
		volumeBtn.className = 'volume-btn medium'
	}
	else {
		volumeBtn.className = 'volume-btn'
	}
}

let prevVolume = 1;
const changeVolume = () => {
	audio.volume = volume.value;
	setVolumeBtn();
}

const muteAudio = () => {
	if (audio.volume == 0){
		audio.volume = prevVolume
		setVolumeBtn();
	}
	else {
		prevVolume = audio.volume;
		audio.volume = 0;
		setVolumeBtn();
	}
}

volume.addEventListener('input', changeVolume)
volumeBtn.addEventListener('click', muteAudio)

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

const updateProgressBar = () => {
	progressBar.value = (audio.currentTime/audio.duration)*100
}

const updateAudioDuration = () =>{
	let CurrnetTimeMin = String(Math.floor(audio.currentTime/60)).padStart(2, '0');
	let CurrnetTimeSec = String(Math.floor(audio.currentTime%60)).padStart(2,'0');
	let durationTimeMin = '00';
	let durationTimeSec = '00';
	if (audio.duration){
		durationTimeMin = String(Math.floor(audio.duration/60)).padStart(2, '0');
		durationTimeSec = String(Math.floor(audio.duration%60)).padStart(2,'0');
	}
	timeIndicator.textContent = `${CurrnetTimeMin}:${CurrnetTimeSec} / ${durationTimeMin}:${durationTimeSec}`;
}

audio.addEventListener('timeupdate', updateAudioDuration);
audio.addEventListener('timeupdate', updateProgressBar);

progressBar.addEventListener('mousemove', (e) => {
	let offset = (e.offsetX/progressBar.offsetWidth);

	progressBar.onclick = () =>{
		audio.currentTime = offset * audio.duration;
		pauseTime = offset * audio.duration;
	}

	if (e.buttons == 1){
		audio.removeEventListener('timeupdate', updateProgressBar)
		progressBar.value = offset * 100

		progressBar.onmouseup = () => {
				audio.currentTime = offset * audio.duration;
				pauseTime = offset * audio.duration;
				audio.addEventListener('timeupdate', updateProgressBar)
		}

		progressBar.onmouseleave = (e) => {
			if (e.buttons == 1){
				audio.currentTime = offset * audio.duration;
				pauseTime = offset * audio.duration;
				audio.addEventListener('timeupdate', updateProgressBar)
			}
		}

	}
})

let playNum = 0;
const playNext = () =>{
	if (playNum >= (playlist.length - 1)) {
		playNum = 0;
	}
	else {
		playNum++
	}
	pauseTime = 0;
	playAudio();
	play.classList.add('pause');
}

const playPrev = () =>{
	if (playNum < 1) {
		playNum = (playlist.length - 1);
	}
	else {
		playNum--
	}
	pauseTime = 0;
	playAudio();
	play.classList.add('pause');
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
const playItems = document.querySelectorAll('.play-item');

const showAciveSongTitle = () =>{
	playItems.forEach((item) => item.classList.remove('active'))
	playItems[playNum].classList.add('active');
	musicInfo.textContent = playItems[playNum].textContent
	musicInfo.classList.add('active')
}

const playChosenSong = (index) => {
	playNum = index;
	pauseTime = 0;
	playAudio();
	play.classList.add('pause');
}

	playItems.forEach((item, i) => {
		item.addEventListener('click', () => {
			playChosenSong(i)
		})
	})



audio.addEventListener('playing', showAciveSongTitle)

/*                    REMINDER                   */
const reminderOpenBtn = document.querySelector('.reminder-open-btn')
const reminderPanel = document.querySelector('.reminder-panel')
const reminderText = document.querySelector('input[name="reminder-text"]')
const reminderDate = document.querySelector('input[name="reminder-date"]')
const remindBtn = document.querySelector('.remind-btn')
const warning = document.querySelector('.warning')
const reminderMessage = document.querySelector('.reminder-message')
const messageTime = document.querySelector('.message-time')
const messageText = document.querySelector('.message-text')
const cancelBtn = document.querySelector('.cancel-btn')

const restrictPrevDates = () =>{
	const date = new Date()
	reminderDate.min = date.toISOString().slice(0, 16);
	setTimeout(restrictPrevDates, 1000);
}
restrictPrevDates();

const openReminderPanel = () =>{
	reminderPanel.classList.toggle('active');
}
reminderOpenBtn.addEventListener('click', openReminderPanel)

let crntReminderValue = '';
let crntReminderText = '';
const getReminderValues = () => {
	if (reminderText.value && reminderDate.value){
		crntReminderValue = reminderDate.value
		crntReminderText = reminderText.value
		setReminder();
	}
	else {
		warning.classList.add('active')
		remindBtn.style.visibility = 'hidden'
		setTimeout(() => {
			warning.classList.remove('active')
			remindBtn.style.visibility = 'visible'
		}, 1000);
	}
}
remindBtn.addEventListener('click', getReminderValues);

const resetReminder = () => {
	console.log('Function Stoped');
	clearTimeout(timeout);
	messageTime.textContent = '00s'
	messageText.textContent = '...'
	reminderMessage.classList.remove('active');
}
cancelBtn.addEventListener('click', resetReminder);

const alarm = new Audio();
alarm.src = '../assets/sounds/alarm/audioblocks-synthwave-rock-fight-fight_rSfr0W1M8_NWM.mp3'
alarm.loop = true;


const completeReminder = () => {
	resetReminder();
	alarm.currentTime = 0;
	alarm.play();
	alert (crntReminderText);
	alarm.pause();
}

let timeLeft = ''
let secLeft = ''
const getReminderTimeLeft = () => {
	const date = new Date()
	const plannedDate = new Date(crntReminderValue)
	const plannedMsSec = plannedDate.getTime()
	const currentMsSec = date.getTime()

	secLeft = Math.floor((plannedMsSec - currentMsSec)/1000);

	const minLeft = Math.floor(secLeft/60)
	const hourLeft = Math.floor(minLeft/60)
	const dayLeft = Math.floor(hourLeft/24)

	const hours = hourLeft%24
	const mins = minLeft%60
	const sec = secLeft%60

	timeLeft = ''
	if (dayLeft > 0) {
		timeLeft += dayLeft + 'd ' 
	}
	if (hours > 0) {
		timeLeft += hours + 'h '
	}
	if (mins > 0) {
		timeLeft += mins + 'm '
	}
	timeLeft += sec + 's ' 
	// `${dayLeft}d ${hours}h ${mins}m ${sec}s`
}

let timeout;
const setReminderTime = () => {
	getReminderTimeLeft();
	messageTime.textContent = timeLeft
	console.log('running')

	if(secLeft < 0){
		completeReminder();
		return;
	}

	timeout = setTimeout(setReminderTime, 1000);
}

const setReminderValues = () => {
	messageText.textContent = crntReminderText
	setReminderTime();
}

const setReminder = () => {
	reminderMessage.classList.add('active');
	reminderPanel.classList.remove('active')
	setReminderValues();
}


/*                    SETTINGS                   */
const settings = document.querySelector('.settings');
const settingsBtn = document.querySelector('.setting-btn');
const displayMode = document.querySelectorAll('input[name="displayMode"]');
const displaySettings = document.querySelector('.display-settings');
const displayElement = displaySettings.querySelectorAll('.display-element');
const languageBtn = document.querySelectorAll('input[name="language"]');
const languageSettingTitle = document.querySelector('.language-setting-title');
const imageSettingTitle = document.querySelector('.image-setting-title');
const displaySettingTitle = document.querySelector('.display-setting-title');
const imgSrcBtn = document.querySelectorAll('input[name="source"]');


const changeSettingsLang = (lang) => {
	languageSettingTitle.textContent = lang.settings.languageTitle;
	imageSettingTitle.textContent = lang.settings.imgSourceTitle;
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

const setImgSrc = (btn) => {
	tagsInput.forEach((tag) =>{
		tag.classList.remove('opened')
	})

	switch (btn.id) {
		case 'unsplash':
			btn.parentNode.querySelector('.tags').classList.add('opened');
			getUnsplashImage(getDayOfTime());
			btn.checked = true;
			break;
		case 'flickr':
			btn.parentNode.querySelector('.tags').classList.add('opened');
			getFlickrImage(getDayOfTime());
			btn.checked = true;
			break;
		case 'github':
			getGithubImage(getDayOfTime());
			btn.checked = true;
			break;
	}
}

const updateTag = () => {
	tagsInput.forEach(tag => {
		tag.addEventListener('change', () => {
			imgSrcBtn.forEach(btn => {
				if(btn.checked == true){
					switch (btn.id) {
						case 'unsplash':
							getUnsplashImage(getDayOfTime());
							break
						case 'flickr':
							getFlickrImage(getDayOfTime());
							break
						case 'github':
							getGithubImage(getDayOfTime());
							break
					}
				}
			})
		})
	})
}
updateTag();

const changeBg = () =>{
	imgSrcBtn.forEach(src => {
		src.addEventListener('change', () =>{
			setImgSrc(src);
		})
	})
}
changeBg();

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
	setOnLoad(language);
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
	localStorage.setItem('crntReminderValue', crntReminderValue)
	localStorage.setItem('crntReminderText', crntReminderText)
	tagsInput.forEach(tag => {
		let tagClass = tag.classList[1]
		localStorage.setItem(tagClass, tag.value);
	})
	displayMode.forEach (checkbox => {
		let isChecked = checkbox.checked;
		localStorage.setItem(checkbox.id, isChecked);
	})
	languageBtn.forEach (radio => {
		let isTurned = radio.checked;
		localStorage.setItem(radio.id, isTurned);
	})
	imgSrcBtn.forEach (radio => {
		let isTurned = radio.checked;
		localStorage.setItem(radio.id, isTurned);
	})
}
window.addEventListener('beforeunload', setLocalStorage)

const getLocalStorage = () => {

	if (localStorage.getItem('crntReminderValue')) {
		crntReminderValue = localStorage.getItem('crntReminderValue')
		reminderDate.value = crntReminderValue;
	}
	if (localStorage.getItem('crntReminderValue')) {
		crntReminderText = localStorage.getItem('crntReminderText')
		reminderText.value = crntReminderText;
	}
	getReminderValues();

	if(localStorage.getItem('name')) {
		nickname.value = localStorage.getItem('name')
	}
	if(localStorage.getItem('city')) {
		cityInput.value = localStorage.getItem('city')
		getWeather(language);
	}
	else{
		cityInput.value = `${language.city}`;
		getWeather(language);
	}
	tagsInput.forEach(tag => {
		let tagClass = tag.classList[1]
		if(localStorage.getItem(tagClass)){
			tag.value = localStorage.getItem(tagClass);
		}
	})
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
	imgSrcBtn.forEach(radio => {
		let isChecked = localStorage.getItem(radio.id);
		if (isChecked === 'true'){

			setImgSrc(radio);
		}
	})
	getWeather(language);
}
window.addEventListener('load', getLocalStorage)

