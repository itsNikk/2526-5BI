const URL = "https://jsonplaceholder.typicode.com/usersXXX/1"

fetch(URL)
    .then(response =>{
        if(response.ok){
            return response.json()
        }
    })
    .catch(error => console.log("Errore di rete:  " + error))