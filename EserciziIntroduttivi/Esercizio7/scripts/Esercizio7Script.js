const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 120]

let btn = document.getElementById("sumBtn")
let res = document.getElementById("res")

btn.addEventListener("click", () => {

    //SOl 1 for indicizzato tradizionale
/*     let sum = 0
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i]
    } */

    //Sol 2 - foreach
    for (let elem of nums) {
        sum += elem;
    }

    res.textContent = sum


})

