const express = require('express');
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

// Dati risorse stazione spaziale
let risorse = [
  { id: 1, nome: "Acqua", tipo: "liquidi", quantita: 45, unita: 120, settore: "A" },
  { id: 2, nome: "Cibo liofilizzato", tipo: "cibo", quantita: 30, unita: 80, settore: "B" },
  { id: 3, nome: "Medicinali", tipo: "medicinali", quantita: 8, unita: 500, settore: "A" },
  { id: 4, nome: "Ossigeno compresso", tipo: "gas", quantita: 60, unita: 150, settore: "C" },
  { id: 5, nome: "Batterie", tipo: "energia", quantita: 25, unita: 200, settore: "nucleo" },
  { id: 6, nome: "Razioni proteiche", tipo: "cibo", quantita: 18, unita: 90, settore: "B" },
  { id: 7, nome: "Plasma medico", tipo: "medicinali", quantita: 5, unita: 800, settore: "A" },
  { id: 8, nome: "Carburante", tipo: "liquidi", quantita: 100, unita: 300, settore: "C" },
  { id: 9, nome: "Generatori portatili", tipo: "energia", quantita: 12, unita: 450, settore: "nucleo" },
  { id: 10, nome: "Azoto liquido", tipo: "gas", quantita: 35, unita: 180, settore: "C" },
  { id: 11, nome: "Barrette energetiche", tipo: "cibo", quantita: 50, unita: 40, settore: "B" },
  { id: 12, nome: "Kit pronto soccorso", tipo: "medicinali", quantita: 15, unita: 350, settore: "A" }
];

let nextId = 13;

// GET /risorse
app.get('/risorse', (req, res) => {
  res.json(risorse);
});

// GET /risorse/:id - Restituisce 404 se ID non esiste
app.get('/risorse/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const risorsa = risorse.find(r => r.id === id);
  if (risorsa) {
    res.json(risorsa);
  } else {
    res.status(404).json({ error: 'Risorsa non trovata' });
  }
});

// POST /risorse
app.post('/risorse', (req, res) => {
  const nuovaRisorsa = {
    id: nextId++,
    nome: req.body.nome,
    tipo: req.body.tipo,
    quantita: req.body.quantita,
    unita: req.body.unita,
    settore: req.body.settore
  };
  risorse.push(nuovaRisorsa);
  res.status(201).json(nuovaRisorsa);
});

// PUT /risorse/:id
app.put('/risorse/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = risorse.findIndex(r => r.id === id);
  if (index !== -1) {
    risorse[index] = {
      id: id,
      nome: req.body.nome,
      tipo: req.body.tipo,
      quantita: req.body.quantita,
      unita: req.body.unita,
      settore: req.body.settore
    };
    res.json(risorse[index]);
  } else {
    res.status(404).json({ error: 'Risorsa non trovata' });
  }
});

// DELETE /risorse/:id
app.delete('/risorse/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = risorse.findIndex(r => r.id === id);
  if (index !== -1) {
    risorse.splice(index, 1);
    res.json({ message: 'Risorsa eliminata', id: id });
  } else {
    res.status(404).json({ error: 'Risorsa non trovata' });
  }
});

// GET /risorse/tipo/:tipo - Restituisce 404 se nessuna risorsa di quel tipo
app.get('/risorse/tipo/:tipo', (req, res) => {
  const tipo = req.params.tipo;
  const risultati = risorse.filter(r => r.tipo === tipo);
  if (risultati.length === 0) {
    res.status(404).json({ error: 'Nessuna risorsa di tipo ' + tipo });
  } else {
    res.json(risultati);
  }
});

// GET /risorse/valore-totale
app.get('/risorse/valore-totale', (req, res) => {
  const totale = risorse.reduce((acc, r) => acc + (r.quantita * r.unita), 0);
  res.json({ valoreTotale: totale });
});

app.listen(PORT, () => {
  console.log('Server stazione spaziale attivo su http://localhost:' + PORT);
});
