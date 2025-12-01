let form = document.getElementById("inForm")
let testoElem = document.getElementById("testo")
let creativitaElem = document.getElementById("creativita")
let listaElem = document.getElementById("lista")
let scuseFiltrateElem = document.getElementById("scuseFiltrate")

let filtroElem = document.getElementById("filtro")
let filtroNumElem = document.getElementById("filtroNum")
let rndExcuseBtn = document.getElementById("rndExcuseBtn")

let excusesList = []

/*let excuse={
    testo, "blabla"
    creatività:5
}*/


rndExcuseBtn.addEventListener("click", () => {
    const rndIndex = Math.floor(Math.random() * excusesList.length)
    alert(excusesList[rndIndex].testo + ":" + excusesList[rndIndex].creativita)
})
//Punto 3
creativitaElem.addEventListener("input", () => {
    scuseFiltrateElem.innerHTML = "";
    for (elem of excusesList) {
        if (elem.creativita >= filtroNumElem.value) {
            scuseFiltrateElem.innerHTML += elem.testo + ":" + elem.creativita + "<br>"
        }
    }
})

//Punto2
filtroElem.addEventListener("input", () => {
    scuseFiltrateElem.innerHTML = "";
    for (elem of excusesList) {
        //filtro
        if (elem.testo.toLowerCase().includes(filtroElem.value)) {
            //mostro scusa nel DOM  
            scuseFiltrateElem.innerHTML += elem.testo + ":" + elem.creativita + "<br>"
        }
    }
})

//reagiamo alla submit del form
form.addEventListener("submit", (e) => {
    e.preventDefault()

    excusesList.push(
        { testo: testoElem.value, creativita: creativitaElem.value }
    );

    form.reset()

    //fai vedere tutte le scuse
    // textContent e innerHTML = 1) inserisce tseto puro (non interpreta HTML)
    // 2) InnerHTML inserisce testo ma interpreta anche i tag HTML
    listaElem.innerHTML = ""
    for (elem of excusesList) {
        listaElem.innerHTML += elem.testo + " : " + elem.creativita + "<br>"
    }
})