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
}

window.addEventListener('load', setOnLoad)

const setLocalStorage = () => {
	localStorage.setItem('name', nickname.value)
}

const getLocalStorage = () => {
	if(localStorage.getItem('name')) {
		nickname.value = localStorage.getItem('name')
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






