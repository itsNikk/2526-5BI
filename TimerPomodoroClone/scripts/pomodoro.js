let startBtn = document.getElementById("startBtn")
let pauseBtn = document.getElementById("pauseBtn")
let resetBtn = document.getElementById("resetBtn")
let timerElem = document.getElementById("timer")

let tomato = {
    //25 min * 60 = 1500 secondi
    seconds: 1500,
    running: false
}

function showTimer() {
    //converto da secs a mins
    let mins = Math.floor(tomato.seconds / 60)
    let secs = tomato.seconds % 60

    timerElem.textContent = mins + ":" + secs

}

function tick() {
    tomato.seconds--

    showTimer()
}

function start() {
    if (!tomato.running) {
        setInterval(tick, 1000);
        tomato.running = true
    }
}

startBtn.addEventListener("click", start)