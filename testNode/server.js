const http = require('http')

const PORT = 3000;
const HOSTNAME = "localhost";

const users = [
    { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
    { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
    { id: 3, name: "Charlie", age: 28, email: "charlie@example.com" },
    { id: 4, name: "Diana", age: 22, email: "diana@example.com" },
    { id: 5, name: "Ethan", age: 35, email: "ethan@example.com" },
    { id: 6, name: "Fiona", age: 27, email: "fiona@example.com" },
    { id: 7, name: "George", age: 31, email: "george@example.com" },
    { id: 8, name: "Hannah", age: 29, email: "hannah@example.com" },
    { id: 9, name: "Ian", age: 24, email: "ian@example.com" },
    { id: 10, name: "Jane", age: 33, email: "jane@example.com" },
    { id: 11, name: "Kevin", age: 26, email: "kevin@example.com" },
    { id: 12, name: "Laura", age: 28, email: "laura@example.com" },
    { id: 13, name: "Mike", age: 32, email: "mike@example.com" },
    { id: 14, name: "Nina", age: 23, email: "nina@example.com" },
    { id: 15, name: "Oscar", age: 34, email: "oscar@example.com" }
];


const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Ciao mondo!\n');
    } else if (req.url === "/showPeople") {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(JSON.stringify(users)));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "not found", msg: req.url + " not found" }));
    }
});

server.listen(PORT, HOSTNAME, () => {
    console.log(HOSTNAME + ":" + PORT);
})