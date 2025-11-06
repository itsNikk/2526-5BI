let a = document.getElementById("n1")
let b = document.getElementById("n2")
let btn = document.getElementById("calcRes")
let res = document.getElementById("res")

//Uso lambda function per semplcità
btn.addEventListener("click", () => {

    //Anche se type=number ha senso inserire un controllo. E' l'unico possibile?
    if (a.value === '' || b.value === '') {
        res.textContent = "Inserisci due numeri"
        return;
    }
    //Cast fondamentale e da scrivere in questo modo... perchè?
    res.textContent = Number(a.value) + Number(b.value)
})