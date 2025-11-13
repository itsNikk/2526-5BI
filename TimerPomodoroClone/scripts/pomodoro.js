let startBtn = document.getElementById("startBtn")
let pauseBtn = document.getElementById("pauseBtn")
let resetBtn = document.getElementById("resetBtn")
let timerElem = document.getElementById("timer")


let tomato = {
    //25 min * 60 = 1500 secondi
    seconds: 1500,
    running: false,
    timer: null
}

function showTimer() {
    //converto da secs a mins
    let mins = Math.floor(tomato.seconds / 60)
    let secs = tomato.seconds % 60

    if (secs < 10) {
        secs = "0" + secs
    }

    if (mins < 10) {
        mins = "0" + mins
    }

    timerElem.textContent = mins + ":" + secs
}

function tick() {
    //-- => tomato.s = tomato.s - 1
    tomato.seconds--;
    showTimer();
}

function start() {
    if (!tomato.running) {
        // setInterval => esegui parametro 1 ogni poaramtro 2 ms
        tomato.timer = setInterval(tick, 1000);
        tomato.running = true;
    }
}

function reset() {
    tomato.seconds = 1500;
    tomato.running = false;
    clearInterval(tomato.timer)
    showTimer();
}

resetBtn.addEventListener("click", reset)
startBtn.addEventListener("click", start)