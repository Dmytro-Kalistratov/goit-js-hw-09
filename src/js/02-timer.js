import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector(`[data-start]`);
const datetimePicker = document.querySelector(`[id="datetime-picker"]`);
const dateDays = document.querySelector(`[data-days]`);
const dateHours = document.querySelector(`[data-hours]`);
const dateMinutes = document.querySelector(`[data-minutes]`);
const dateSeconds = document.querySelector(`[data-seconds]`);

let timerInterval = null;

startBtn.disabled = true;


flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    altInput: true,
    altFormat: "F j, Y, H:i",
    dateFormat: "Y-m-d-H-i",
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);

        if (selectedDates[0] < Date.now()) {
            startBtn.disabled = true;
            return Notiflix.Notify.warning("Please choose a date in the future");
        } else {
            clearInterval(timerInterval);
            startBtn.disabled = false;
        };

        startBtn.addEventListener('click', (evt) => {
            evt.preventDefault();
            timerInterval = setInterval(() => {
                const pastTime = selectedDates[0] - Date.now();

                if (pastTime < 1000) {
                    clearInterval(timerInterval);
                };

                const timeSet = convertMs(pastTime);
                updateClockTime(timeSet);
            }, 1000);
        });
    },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function pad(value) {
    return String(value).padStart(2, '0');
}

function updateClockTime({ days, hours, minutes, seconds }) {
    dateDays.textContent = `${days}`;
    dateHours.textContent = `${hours}`;
    dateMinutes.textContent = `${minutes}`;
    dateSeconds.textContent = `${seconds}`; 
};