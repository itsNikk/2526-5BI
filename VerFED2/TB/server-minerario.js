const express = require('express');
const app = express();
const PORT = 3000;

// Middleware CORS - permette richieste da qualsiasi origine
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

// Dati minerali avamposto
let minerali = [
  { id: 1, nome: "Ferro grezzo", categoria: "metalli", tonnellate: 120, creditiPerTonnellata: 45, zona: "nord" },
  { id: 2, nome: "Platino", categoria: "metalli", tonnellate: 8, creditiPerTonnellata: 850, zona: "nord" },
  { id: 3, nome: "Elio-3", categoria: "gas", tonnellate: 65, creditiPerTonnellata: 120, zona: "sud" },
  { id: 4, nome: "Cristalli di quarzo", categoria: "cristalli", tonnellate: 35, creditiPerTonnellata: 200, zona: "est" },
  { id: 5, nome: "Uranio", categoria: "terre-rare", tonnellate: 6, creditiPerTonnellata: 1200, zona: "cratere" },
  { id: 6, nome: "Litio", categoria: "metalli", tonnellate: 90, creditiPerTonnellata: 95, zona: "ovest" },
  { id: 7, nome: "Argon compresso", categoria: "gas", tonnellate: 45, creditiPerTonnellata: 80, zona: "sud" },
  { id: 8, nome: "Titanio", categoria: "metalli", tonnellate: 75, creditiPerTonnellata: 180, zona: "nord" },
  { id: 9, nome: "Diamanti grezzi", categoria: "cristalli", tonnellate: 3, creditiPerTonnellata: 2500, zona: "cratere" },
  { id: 10, nome: "Neodimio", categoria: "terre-rare", tonnellate: 12, creditiPerTonnellata: 650, zona: "est" },
  { id: 11, nome: "Metano ghiacciato", categoria: "gas", tonnellate: 150, creditiPerTonnellata: 35, zona: "ovest" },
  { id: 12, nome: "Cobalto", categoria: "metalli", tonnellate: 55, creditiPerTonnellata: 140, zona: "nord" }
];

let nextId = 13;

// GET /minerali
app.get('/minerali', (req, res) => {
  res.json(minerali);
});

// GET /minerali/:id - Restituisce 404 se ID non esiste
app.get('/minerali/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const minerale = minerali.find(m => m.id === id);
  if (minerale) {
    res.json(minerale);
  } else {
    res.status(404).json({ error: 'Minerale non trovato' });
  }
});

// POST /minerali
app.post('/minerali', (req, res) => {
  const nuovoMinerale = {
    id: nextId++,
    nome: req.body.nome,
    categoria: req.body.categoria,
    tonnellate: req.body.tonnellate,
    creditiPerTonnellata: req.body.creditiPerTonnellata,
    zona: req.body.zona
  };
  minerali.push(nuovoMinerale);
  res.status(201).json(nuovoMinerale);
});

// PUT /minerali/:id
app.put('/minerali/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = minerali.findIndex(m => m.id === id);
  if (index !== -1) {
    minerali[index] = {
      id: id,
      nome: req.body.nome,
      categoria: req.body.categoria,
      tonnellate: req.body.tonnellate,
      creditiPerTonnellata: req.body.creditiPerTonnellata,
      zona: req.body.zona
    };
    res.json(minerali[index]);
  } else {
    res.status(404).json({ error: 'Minerale non trovato' });
  }
});

// DELETE /minerali/:id
app.delete('/minerali/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = minerali.findIndex(m => m.id === id);
  if (index !== -1) {
    minerali.splice(index, 1);
    res.json({ message: 'Minerale eliminato', id: id });
  } else {
    res.status(404).json({ error: 'Minerale non trovato' });
  }
});

// GET /minerali/categoria/:categoria - Restituisce 404 se nessun minerale di quella categoria
app.get('/minerali/categoria/:categoria', (req, res) => {
  const categoria = req.params.categoria;
  const risultati = minerali.filter(m => m.categoria === categoria);
  if (risultati.length === 0) {
    res.status(404).json({ error: 'Nessun minerale di categoria ' + categoria });
  } else {
    res.json(risultati);
  }
});

// GET /minerali/valore-totale
app.get('/minerali/valore-totale', (req, res) => {
  const totale = minerali.reduce((acc, m) => acc + (m.tonnellate * m.creditiPerTonnellata), 0);
  res.json({ valoreTotale: totale });
});

app.listen(PORT, () => {
  console.log('Server avamposto minerario attivo su http://localhost:' + PORT);
});
