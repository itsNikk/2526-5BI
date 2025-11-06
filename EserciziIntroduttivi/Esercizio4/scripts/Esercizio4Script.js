let a = document.getElementById("n1")
let btn = document.getElementById("calcRes")
let res = document.getElementById("res")

btn.addEventListener("click", () => {

    //Anche se type=number ha senso inserire un controllo. E' l'unico possibile?
    //E se fosse stato input type=text?
    if (a.value === '') {
        res.textContent = "Inserisci un numero"
        a.value = ''

        return;
    }

    if (a.value > 10 || a.value < 0) {
        res.textContent = "Inserisci un numero tra 0 e 10"
        a.value = ''
        return
    }

    //Cast fondamentale e da scrivere in questo modo... perchè?
    const n = Number(a.value)
    if (n >= 6) {
        res.textContent = "Promosso!"
    } else {
        res.textContent = "Bocciato!"
    }

    //Come potremmo ritardare l'esecuzione di questo comando?
    a.value = ''
})