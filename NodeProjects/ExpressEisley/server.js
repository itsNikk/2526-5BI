const express = require("express")

const app = express()

app.use(express.json())

let clienti = [
    { id: 1, nome: "Han Solo", specie: "umano", crediti: 1500 },
    { id: 2, nome: "Chewbecca", specie: "wookie", crediti: 900 },
    { id: 3, nome: "Greedo", specie: "rodiano", crediti: 300 },
    { id: 4, nome: "hammerhead", specie: "ithoriano", crediti: 200 }
]

let bevande = [
    { id: 1, nome: " Corelian Ale", prezzo: 50, gradazione: 8 },
    { id: 2, nome: " Juice", prezzo: 80, gradazione: 15 },
    { id: 3, nome: " Meranzane Gold", prezzo: 120, gradazione: 8 },
    { id: 4, nome: " Spotchka", prezzo: 200, gradazione: 20 }
]

let nextClientId = clienti.length + 1;

//MW Logger
app.use((req, res, next) => {
    console.log("[CANTINA LOG] " + req.method + " " + req.url);
    next()
})

//MW Guardia - se non hai la tessera non entri

app.use("/clienti", (req, res, next) => {
    //console.log("[MW Clienti] QUI");
    const tessera = req.headers["x-tessera"]

    //403 - Forbidden
    if (!tessera) {
        return res.status(403).json({ error: "Devi avere una tessera. Regola della cantina" })
    }

    next()


})

//Aggiungete un MW su /clienti: - legge un Header x-gettoni
// leggere quel valore e inserirlo nella request come req.gettoni 
// Aggiunge contesto
app.use("/clienti", (req, res, next) => {
    const gettoni = parseInt(req.headers["x-gettoni"])
    console.log("[MW Clienti gettoni:]" + gettoni);

    if (isNaN(gettoni)) {
        req.gettoni = 0
    } else {
        req.gettoni = gettoni
    }

    next()

})

app.use("/clienti", (req, res, next) => {
    if (req.method !== "POST" && req.method !== "PUT") {
        return next()
    }

    //Se è post o put fare roba...
    const nome = req.body.nome
    const specie = req.body.specie
    const crediti = req.body.crediti

    //Validazione dell'input
    if (!nome || nome.trim() === '') {
        return res.status(400).json({ errore: "URL malformato" })
    }
    //CTRL + D= duplica riga 
    if (!specie || specie.trim() === '') {
        return res.status(400).json({ errore: "URL malformato" })
    }

    if (!crediti || crediti < 0 || isNaN(parseInt(crediti))) {
        return res.status(400).json({ errore: "URL malformato" })
    }

    next()
})

app.post("/clienti", (req, res) => {
    const nome = req.body.nome;
    const specie = req.body.specie;
    const crediti = req.body.credito;

    //TODO: Check - controlla se nuovo cliente non è già inserito
    for (const client of clienti) {
        if (client.nome.toLowerCase() === nome.toLowerCase()) {
            //409 Conflict
            return res.status(409).json({ "errore": "Questo cliente è già registrato" })
        }
    }


    let newClient = { id: nextClientId, nome: nome, specie: specie, crediti: crediti }
    nextClientId++;
    clienti.push(newClient)

    res.status(201).json(newClient)
})


//E' UNA ROTTA (RH)
app.get("/clienti", (req, res) => {

    res.json(clienti)
})

app.listen(3000, () => {
    console.log("Cantina aperta sulla porta 3000");
})