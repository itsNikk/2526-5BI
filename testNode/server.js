const http = require("http")

const PORT = 1025;
const HOSTNAME = "localhost";

let users = [
    { username: "UNAME1", age: 17 },
    { username: "UNAME2", age: 56 },
    { username: "UNAME3", age: 23 }
]

let numbers = []

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Ciao, benvenuto");
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

    //setuppare l'endpoint POST numbers cheaggiunge un numvero all'array
    //setuppare l'endpoint GET numbers che retituisce tutti i numeri
    //setuppare l'endpoint GET numbers/n che retituisce l'ennesimo numero


    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ error: req.url + " not found" }));

})

//EADDRRINUSE
server.listen(PORT, HOSTNAME, () => {
    console.log("servizio ONLINE " + HOSTNAME + ":" + PORT);
})