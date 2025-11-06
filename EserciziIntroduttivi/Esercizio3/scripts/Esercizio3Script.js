let a = document.getElementById("n1")
let btn = document.getElementById("calcRes")
let res = document.getElementById("res")

btn.addEventListener("click", () => {

    //Anche se type=number ha senso inserire un controllo. E' l'unico possibile?
    //E se fosse stato input type=text?
    if (a.value === '') {
        res.textContent = "Inserisci un numero"
        return;
    }
    //Cast fondamentale e da scrivere in questo modo... perchè?
    const n = Number(a.value)
    if (n % 2 === 0) {
        res.textContent = n + " è pari"
    } else {
        res.textContent = n + " è dispari"
    }
})