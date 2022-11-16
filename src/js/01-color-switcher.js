function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const bodyEl = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let timerId = null;

startButton.addEventListener('click', onStartColorChange);
stopButton.addEventListener('click', onStopColorChange);

function onStartColorChange() {
  startButton.disabled = true;
  stopButton.disabled = false;
  timerId = setInterval(onColorChange, 1000);
}

function onStopColorChange() {
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(timerId);
}

function onColorChange() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}
