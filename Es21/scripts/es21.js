let brnContainer = document.getElementById("brnContainer")

const MAX = 5;
let generator = null;
let index = 1;
let totalSum = 0;

function genBtn() {
    if (index > MAX) {
        clearInterval(generator);
        return
    }

    let newBtn = document.createElement("button")

    //math.random()
    //tofixed(2)
    newBtn.textContent = Math.floor(Math.random() * 10) + 1
    newBtn.addEventListener("click", () => {
        totalSum += Number(newBtn.textContent)
        newBtn.remove()
        console.log(totalSum);

    });
    index++;
    brnContainer.append(newBtn)

}
//quando chiamo setInterval(tiomeout) => restituisco un rif 
generator = setInterval(genBtn, 1000)