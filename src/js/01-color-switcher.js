const startBtn = document.querySelector(`[data-start]`);
const stopBtn = document.querySelector(`[data-stop]`)
const bodyEl = document.querySelector('body');

startBtn.addEventListener('click', startChangeColor);
stopBtn.addEventListener('click', stopChangeColor);
let changeColorInterval = null;
stopBtn.disabled = true;

function startChangeColor() {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    changeColorInterval = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor()}, 1000);
};

function stopChangeColor() {
    stopBtn.disabled = true;
    startBtn.disabled = false;
    clearInterval(changeColorInterval);
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};