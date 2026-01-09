let userInputElem = document.getElementById("inputVal")
let remValueElem = document.getElementById("remValue")
let addValueBtn = document.getElementById("addValue")
let avgElem = document.getElementById("avg")
let valuesElem = document.getElementById("values")


let values = []

remValueElem.disabled = true;

remValueElem.addEventListener("click", () => {
    values.pop();
    showValues();
    avgElem.textContent = "Media attuale: " + computeAvarage();
    if (values.length === 0) {
        avgElem.textContent = "Media attuale: --";
        remValueElem.disabled = true;
    }
})

addValueBtn.addEventListener("click", () => {
    if (userInputElem.value === "" || isNaN(Number(userInputElem.value))) {
        console.log("Error");
        return;
    }

    values.push(userInputElem.value)
    remValueElem.disabled = false;
    showValues();
    userInputElem.value = ""
    avgElem.textContent = "Media attuale: " + computeAvarage();
})

function computeAvarage() {
    let sum = 0;

    for (let elem of values) {
        sum += Number(elem);
    }

    return (sum / values.length).toFixed(2);
}

function showValues() {
    valuesElem.innerHTML = "";
    for (let i = 0; i < values.length; i++) {
        valuesElem.innerHTML += "Valore " + (i + 1) + ": " + values[i] + "<br>";
    }
}