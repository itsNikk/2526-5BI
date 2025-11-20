let resElem = document.getElementById("res")
let btnContainerElem = document.getElementById("btnContainer")
let startElem = document.getElementById("start")
let resetElem = document.getElementById("reset")


const MAX_ELEM = 30;
//serve davvero total?  
let totalSum = 0;
let generator = null;
elemCounter = 1;


function genBtn(counter) {
    let newBtn = document.createElement("button")
    newBtn.textContent = counter
    newBtn.value = counter

    newBtn.addEventListener("click", () => {
        totalSum += Number(newBtn.value)
        resElem.textContent = totalSum
        newBtn.remove()
    })

    btnContainerElem.append(newBtn)

}

startElem.addEventListener("click", () => {
    //perchè? ;)
    if (generator !== null) return

    generator = setInterval(() => {
        genBtn(elemCounter)
        elemCounter++;

        if (elemCounter > MAX_ELEM) {
            clearInterval(generator)
            generator = null
        }
    }, 1000)

})


resetElem.addEventListener("click", () => {
    btnContainerElem.innerHTML = "";
    totalSum = 0;
    elemCounter = 1;
    clearInterval(generator);
    generator = null;
})