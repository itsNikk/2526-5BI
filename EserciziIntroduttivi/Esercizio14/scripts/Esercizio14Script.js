let num = document.getElementById("guess");
let guessBtn = document.getElementById("guessBtn");
let res = document.getElementById("res");

let rnd = Math.floor(Math.random() * 20);

let triesValues = []
let totalTries = 0;

guessBtn.addEventListener("click", () => {
    let userGuess = Number(num.value);
    if (userGuess < rnd) {
        console.log("Tropppo basso");
    } else if (userGuess > rnd) {
        console.log("Tropppo alto");
    } else {
        console.log("Indovinato");
        res.innerHTML = "Tentativi totali: " + totalTries + "<br>" + "Tentativi: " + triesValues
        console.log(triesValues);
    }

    totalTries++;
    triesValues.push(userGuess)
})