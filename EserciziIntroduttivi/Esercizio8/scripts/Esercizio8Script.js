const db = [1, 2, 3, 4, 5, 6, 7, 8, 9, 123]

let btn = document.getElementById("searchBtn")
let n = document.getElementById("n")
let res = document.getElementById("res")

btn.addEventListener("click", () => {

    if (n.value === '') {
        res.textContent = "Inserire un numero"
        return;
    }

    let found = false
    for (elem of db) {
        if (elem === Number(n.value)) {
            found = true;
            break;
        }
    }

    if (found) {
        res.textContent = "Trovato!"
    } else {
        res.textContent = "Non Trovato!"
    }

})