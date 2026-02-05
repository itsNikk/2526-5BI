const http = require("http");

const PORT = process.env.PORT || 4000;
const HOSTNAME = "localhost";

const server = http.createServer((req, res) => {
    res.end("Benvenuto sy CyberDome, let's play")
})

server.listen(PORT, HOSTNAME, () => {
    console.log("Cyberdome ONLINE su http://" + HOSTNAME + ":" + PORT);

})

