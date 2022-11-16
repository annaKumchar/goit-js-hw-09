import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputData = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let intervalId = null;
let deadline = 0;

//Options of flatpick
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let currentDate = Date.now();
        let selectedDate = selectedDates[0].getTime();
        if (selectedDate <= currentDate) {
            startButton.disable = true;
            Notiflix.Notify.failure('Incorrect date! Choose the future date');
        }
        else {
            startButton.disabel = false;
            deadline = selectedDate
  }
}
}
//Відлік часу
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };

  function addLeadingZero(num) {
    return String(num).padStart(2, '0');
}
}
//-----------------

startButton.addEventListener("click", onStartTimer)

//---------------
function onStartTimer() {
  onGetTime();
  startButton.disabled = true;
  inputData.disabled = true;
  const intervalId = setInterval(() => {
      onGetTime(intervalId);
  }, 1000)
};

function onGetTime(intervalId) {
  const diff = deadline - Date.now();
  if (diff < 0) {
      clearInterval(intervalId);
  }
  else {
      const time = convertMs(diff);
      onUpdateTime(time)
  }
}

function onUpdateTime({days, hours, minutes, seconds}) {;
  timerDays.textContent = days;
  timerHours.textContent = hours;
  timerMinutes.textContent = minutes;
  timerSeconds.textContent = seconds;
}
flatpickr(inputData, options)