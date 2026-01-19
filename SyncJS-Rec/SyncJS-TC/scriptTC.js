let startSeshBtn = document.getElementById("startSesh")
let stopSeshBtn = document.getElementById("stopSesh")
let completeSeshBtn = document.getElementById("completeSesh")
let resElem = document.getElementById("res")
let statsElem = document.getElementById("stats")
let currentTimerElem = document.getElementById("currentTimer")

let sessionTimes = [];

let currentSessionTime = 0;
let currentSessionIndex = 0;
let currentSessionTimer = null;
const SESH_TIMEOUT = 1000;

startSeshBtn.addEventListener("click", () => {
    if (currentSessionTimer !== null) return;
    currentTimerElem.textContent = "Tempo sessione attuale: 0 secondi";
    startSeshBtn.disabled = true;
    stopBtnPressed = false;
    currentSessionIndex++;
    currentSessionTimer = setInterval(() => {
        currentSessionTime++;
        currentTimerElem.textContent = "Tempo sessione attuale: " + currentSessionTime + " secondi";
        //Just for dev purposes
        console.log("Sessione" + currentSessionIndex + ":" + currentSessionTime + " secondi");
    }, SESH_TIMEOUT)
})

stopSeshBtn.addEventListener("click", () => {
    if (currentSessionTimer === null) return;
    startSeshBtn.disabled = false;
    stopBtnPressed = true;
    currentSessionTime = 0;
    clearInterval(currentSessionTimer);
    currentSessionTimer = null;
})

completeSeshBtn.addEventListener("click", () => {
    if (currentSessionTimer === null) return;

    startSeshBtn.disabled = false;
    clearInterval(currentSessionTimer);
    currentSessionTimer = null;

    if (!stopBtnPressed) {
        sessionTimes.push({
            sessionId: makeSessionId(currentSessionIndex),
            time: currentSessionTime
        });
    }

    //DOM visual
    resElem.innerHTML = ""
    for (let elem of sessionTimes) {
        resElem.innerHTML += elem.sessionId + " : " + elem.time + " secondi" + "<br>"
    }
    currentTimerElem.textContent = "Tempo sessione attuale: 0 secondi";
    updateStats();
})

function updateStats() {
    const totCompletedSessions = sessionTimes.length;

    let sum = 0;
    for (let elem of sessionTimes) {
        sum += elem.time;
    }

    statsElem.textContent = "Sessioni completate: " + totCompletedSessions + " | Tempo totale: " + sum;

}

//Si poteva fare anche inline all'object, ma così è più leggibile.
function makeSessionId(index) {
    return "Sessione" + index;
}