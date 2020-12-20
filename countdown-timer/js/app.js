const newYear = "1 Jan 2021";

const day = document.getElementById("day");
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");

const countDown = () => {
	const currentDate = new Date();
	const newYearsDate = new Date(newYear);

	const totalSeconds = (newYearsDate - currentDate) / 1000;

	const days = Math.floor(totalSeconds / 3600 / 24);
	const hours = Math.floor(totalSeconds / 3600) % 24;
	const minutes = Math.floor(totalSeconds / 60) % 60;
	const seconds = Math.floor(totalSeconds) % 60;

	day.innerHTML = days;
	hour.innerHTML = timeFormat(hours);
	minute.innerHTML = timeFormat(minutes);
	second.innerHTML = timeFormat(seconds);
};

const timeFormat = (time) => {
	return time < 10 ? `0${time}` : time;
};

setInterval(countDown, 1000);
