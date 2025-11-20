let genAlert = document.getElementById("genAlert")
let alertContainer = document.getElementById("alertContainer")

let index = 1;
genAlert.addEventListener("click", () => {
    let newNotification = document.createElement("div")
    newNotification.textContent = "Nuova notifica #" + index++
    
    alertContainer.append(newNotification)

    setTimeout(() => { newNotification.remove() }, 3000)

})

