let form = document.getElementById("inForm")
let testoElem = document.getElementById("testo")
let creativitaElem = document.getElementById("creativita")
let listaElem = document.getElementById("lista")

let excusesList = []

/*let excuse={
    testo, "blabla"
    creatività:5
}*/

//reagiamo alla submit del form
form.addEventListener("submit", (e) => {
    e.preventDefault()

    excusesList.push(
        { testo: testoElem.value, creativita: creativitaElem.value }
    );

    //fai vedere tutte le scuse
    // textContent e innerHTML = 1) inserisce tseto puro (non interpreta HTML)
    // 2) InnerHTML inserisce testo ma interpreta anche i tag HTML
    listaElem.innerHTML = ""
    for (elem of excusesList) {
        listaElem.innerHTML += elem.testo + " : " + elem.creativita + "<br>"
    }
})