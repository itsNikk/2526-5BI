const http = require("http");
const { type } = require("os");

//80 = HTTP (wellknown) - 8080 HTTP per sviluppo
//Spesso i servizi node si lanciano sulla porta 3000 ma son convenzioni
//I veri problemi nascono in fase di deploy, non (solitamente) in sviluppo locale
const PORT = 8080;
const HOSTNAME = "localhost";

let users = [
    { username: "UNAME1", age: 17 },
    { username: "UNAME2", age: 56 },
    { username: "UNAME3", age: 23 }
]

let numbers = []

const server = http.createServer((req, res) => {

    console.log(req.url);
    let urlParts = []
    for (let part of req.url.split("/")) {
        if (part !== "") urlParts.push(part);
    }
    console.log(urlParts);

    if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Ciao, benvenuto\n");
    }

    if (req.url === "/users" && req.method === "GET") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json")
        return res.end(JSON.stringify(users));
    }

    if (req.url === "/users" && req.method === "POST") {
        res.statusCode = 405; //method not allowed
        res.setHeader("Allow", "GET");
        return res.end();
    }

    //1) Implementare l'endpoint POST numbers che aggiunge un numero all'array
    if (urlParts[0] === "numbers" && req.method === "POST") {
        let body = '';
        //Fintanto che stanno arrivando dati dal client...  
        req.on("data", (chunk) => {
            body += chunk
        });

        //Quando finisce l'invio
        req.on("end", () => {

            if (typeof body !== "number") {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json")
                return res.end(JSON.stringify({ error: " number must be a number" }))
            }

            numbers.push(body);

            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ numbers }))
        })

        return;
    }
    //2) Implementare l'endpoint GET numbers che restituisce tutti i numeri
    if (urlParts[0] === "numbers" && req.method === "GET") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        //TUTTO quello che passo a end() DEVE essere stringa.
        return res.end(JSON.stringify({ numbers: numbers }));
    }
    //3) Implementare l'endpoint GET numbers/n che restituisce l'ennesimo numero
    if (urlParts[0] === "number" && req.method === "GET" && urlParts.length === 2) {
        let n = urlParts[1];

        //COntrollare se n è davvero un numero e se è all'interno dell'array...

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ index: n, value: numbers[n] }))
    }


    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ error: req.url + " not found" }));

})

//Errore EADDRRINUSE se si tenta di aprire un servizio su una porta già utilizzata
/**
 * PORT RANGES: [0, 65535]
 * Tre categorie:
 * Well known ports: da 0 a 1023 --> per servizi standard come HTTP(80) o FTP(21)
 * Porte registrate: da 1024 a 49151 --> Per applicazioni specifiche ma non a livello SO es. mySQL 3306
 * Porte dinamiche/effimere: da 49152 a 65535 --> usate temporaneamente dalla applicazioni per connessioni e gestite dinamicamente dai SO.
 *                                                Intervallo non riservato, utilizzato dai client e identificare la sorgente della comunicazione
 */
server.listen(PORT, HOSTNAME, () => {
    console.log("servizio ONLINE " + HOSTNAME + ":" + PORT);
})

/*Considerazione DRY: Cos'è estremamaente ripetitivo in questo codice?
* Come possiamo migliorare?
*/