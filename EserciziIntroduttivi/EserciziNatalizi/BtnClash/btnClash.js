const btnContainer = document.getElementById("btnContainer")

const numBtn = Math.floor((Math.random() * 10) + 1)
let nextId = 1

console.log("Btn to create: " + numBtn);
//Crea X bottoni 

let buttonsState = {}

for (let i = 0; i < numBtn; i++) {
    createButton(nextId, Math.floor((Math.random() * 10) + 1))
    nextId++
}

const btnIdInput = document.createElement("input")
btnIdInput.type = "text"
btnIdInput.placeholder = "id bottone da danneggiare"
btnIdInput.id = "elemToDamage"

btnIdInput.addEventListener("input", () => {
    //input validation
    if (btnIdInput.value.length > 3) {
        btnIdInput.value = btnIdInput.value.slice(0, 3);
        return;
    }

    dealDamageBtn.textContent = "Togli LP a " + btnIdInput.value
})
document.body.append(btnIdInput)

const dealDamageBtn = document.createElement("button")
dealDamageBtn.textContent = "Togli LP a..."
dealDamageBtn.addEventListener("click", () => {
    const btn = document.getElementById(btnIdInput.value);
    if (!btn) return;
    if (btn.disabled) return;
    dealDamage(btnIdInput.value, 1);
})

dealDamageBtn.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const btn = document.getElementById(btnIdInput.value);
    if (!btn) return;
    if (btn.disabled) return;
    dealDamage(btnIdInput.value, 2);
})
document.body.append(dealDamageBtn)

function createButton(id, lp) {
    const newBtn = document.createElement("button")
    newBtn.textContent = "LP:" + (lp)
    newBtn.id = "b" + id
    buttonsState[newBtn.id] = { lp: lp }

    newBtn.addEventListener("dblclick", () => {
        cloneButton(newBtn.id)
    })

    btnContainer.append(newBtn)
}

function cloneButton(originalID) {
    const originalLP = buttonsState[originalID].lp
    createButton(nextId, originalLP)
    nextId++;
}

function dealDamage(buttonId, damage) {
    /* attenzione alla precedenza degli operatori
    !buttonId in buttonsState = !(buttonId) in buttonsState -> NO, semantica sbagliata
    noi vogliamo
    !(buttonId in buttonsState) OPPURE !buttonsState[buttonId]
    */
    if (!(buttonId in buttonsState)) return;
    buttonsState[buttonId].lp -= damage

    const btn = document.getElementById(buttonId)
    btn.textContent = "LP:" + buttonsState[buttonId].lp

    if (buttonsState[buttonId].lp <= 0) {
        btn.disabled = true
        setTimeout(() => {
            //Start reset
            buttonsState[buttonId].lp = Math.floor(Math.random() * 10 + 1)
            btn.textContent = "LP:" + buttonsState[buttonId].lp
            btn.disabled = false
        }, 2000)
    }

}