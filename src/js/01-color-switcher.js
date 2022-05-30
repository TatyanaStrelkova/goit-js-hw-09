let timeoutId = null;

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick)

function onStartBtnClick() {
    timeoutId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    refs.startBtn.disabled = true
}

function onStopBtnClick() { 
    clearInterval(timeoutId)
    refs.startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


