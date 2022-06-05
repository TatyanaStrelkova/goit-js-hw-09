import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let timeoutId;
let CURRENT_DATE = new Date();

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    inputValue: document.querySelector('#datetime-picker'),
    daysValue: document.querySelector('span[data-days]'),
    hoursValue: document.querySelector('span[data-hours]'),
    minutesValue: document.querySelector('span[data-minutes]'),
    secondsValue: document.querySelector('span[data-seconds]'),
}

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < CURRENT_DATE) { 
      Notify.failure('Please choose a date in the future')
    } else {
      refs.startBtn.addEventListener('click', timer(selectedDates[0]));
      refs.startBtn.disabled = false;
    }
  },
};

const timer = (targetDate) => {
  if (timeoutId) { 
    return;
  }
  return function () {
    refs.startBtn.disabled = true;
    timeoutId = setInterval(() => {
      const delta = new Date(targetDate) - new Date();
      if (delta <= 0) {
        clearInterval(timeoutId);
        return;
       }
      const timeComponents = convertMs(delta);
      updateClockFace(timeComponents)
    }, 1000);
  }
}
 
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
}

function addLeadingZero(value) { 
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) { 
  refs.daysValue.textContent = days;
  refs.hoursValue.textContent = hours;
  refs.minutesValue.textContent = minutes;
  refs.secondsValue.textContent = seconds;
}
flatpickr(refs.inputValue, options);



