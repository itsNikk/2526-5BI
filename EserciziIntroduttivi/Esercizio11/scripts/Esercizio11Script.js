let addBtn = document.getElementById("add")
let subBtn = document.getElementById("sub")
let counterElem = document.getElementById("counter")
let maxNumElem = document.getElementById("max")


addBtn.addEventListener("click", () => {
    maxNumElem.textContent = Number(maxNumElem.textContent) + 1
})

subBtn.addEventListener("click", () => {
    maxNumElem.textContent = Number(maxNumElem.textContent) - 1
})