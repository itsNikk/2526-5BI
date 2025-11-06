const frutta = ["mela", "arancia", "fragola"]

let btn = document.getElementById("calcRes")
let resElem = document.getElementById("res")

btn.addEventListener("click", () => {
    resElem.innerHTML = frutta + "<br>" + "Nell'array ci sono " + frutta.length + " elementi"
})