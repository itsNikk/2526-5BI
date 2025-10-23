//Vai a prendere dal DOM quell'elemento tramite id
let res = document.getElementById("res")
let input = document.getElementById("in")
let inBtn = document.getElementById("inBtn")
//console.log("CIAO");

inBtn.addEventListener("click", getInputAndAdd)

//Funzioni
function getInputAndAdd() {
    let inVal = Number(input.value)

    //guardia
    if (isNaN(inVal)) {
        res.textContent = "Eh no dai.."
        return
    }

    console.log(typeof inVal);
    console.log((inVal + 5));
    console.log(typeof (inVal + 5));

    res.textContent = inVal + ": " + (inVal + 5)
}

//Array - eterogenei e dinamici
let array = [1, 2, 3, 4, 5, 6, 6]
array.push(123)
console.log(array)
let elem = array.pop()
array.pop()
console.log(array)
