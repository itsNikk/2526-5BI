const URL = 'https://jsonplaceholder.typicode.com/users/1'
const resElem = document.getElementById("res")

//Perchè due then? Cosa sta succedendo?
fetch(URL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        //Perchè stringify?
        resElem.textContent = JSON.stringify(data);
    })
    .catch(error => {
        //Sintassi equivalente a "Errore: " + error
        console.log('Errore:', error);
    });