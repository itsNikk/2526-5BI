const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT || 4000;
const HOSTNAME = "localhost";

let giocatori = fs.readFileSync("../data/giocatori.json");
let arene = fs.readFileSync("../data/arene.json");
let partite = fs.readFileSync("../data/partite.json");

const server = http.createServer((req, res) => {
    sendJSON(res, 200, { msg: "Welcome to CyberDome. Let's play" })
})

server.listen(PORT, HOSTNAME, () => {
    console.log("Cyberdome ONLINE su http://" + HOSTNAME + ":" + PORT);

})

/**
 * Helpers
 */
function sendJSON(res, stastusCode, body) {
    res.stastusCode = stastusCode;
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(body))
}