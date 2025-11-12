let addBtn = document.getElementById("add")
let subBtn = document.getElementById("sub")
let counterElem = document.getElementById("counter")
let maxNumElem = document.getElementById("max")

let counter = 0;

function updateStatus() {
    counterElem.textContent = counter;

    let max = Number(maxNumElem.value)

    if (counter >= max) {
        counterElem.textContent = "LIMITE RAGGIUNTO"
        addBtn.disabled = true
        subBtn.disabled = false
    }

    if (counter <= 0) {
        counterElem.textContent = "LIMITE RAGGIUNTO"
        subBtn.disabled = true
        addBtn.disabled = false
    }

}

addBtn.addEventListener("click", () => {
    counter++;
    updateStatus();
})

subBtn.addEventListener("click", () => {
    counter--;
    updateStatus();
})