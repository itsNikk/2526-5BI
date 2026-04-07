const express = require('express'); // equivalente a import express, { json } from 'express';
const app = express();

app.use(express.json());

const PORT = 3000;

// Creo qualche dato per simulare una query DB...

let clienti = [
    { id: 1, nome: 'Han Solo', specie: 'umano', credito: 1500 },
    { id: 2, nome: 'Greedo', specie: 'rodiano', credito: 300 },
    { id: 3, nome: 'Chewbacca', specie: 'wookiee', credito: 900 },
    { id: 4, nome: 'Hammerhead', specie: 'ithoriano', credito: 200 }
];


//https://starwars.fandom.com/wiki/Spotchka
let bevande = [
    { id: 1, nome: 'Corellian Ale', prezzo: 50, gradazione: 8 },
    { id: 2, nome: 'Juri Juice', prezzo: 80, gradazione: 15 },
    { id: 3, nome: 'Spotchka', prezzo: 120, gradazione: 20 },
    { id: 4, nome: 'Merenzane Gold', prezzo: 200, gradazione: 5 }
];

let ordini = [];

let taglie = [];

let missioni = [
    {
        id: 1,
        codice: 'AURORA-1',
        descrizione: 'Recupero piani della Morte Nera',
        pianeta: 'Scarif',
        rischio: 'alto',
        clearance: 3,
        agente: 'Cassian Andor'
    },
    {
        id: 2,
        codice: 'NEBULA-4',
        descrizione: 'Sorveglianza porto di Mos Eisley',
        pianeta: 'Tatooine',
        rischio: 'basso',
        clearance: 1,
        agente: 'Fulcrum'
    },
    {
        id: 3,
        codice: 'ECLIPSE-7',
        descrizione: 'Sabotaggio generatori imperiali',
        pianeta: 'Lothal',
        rischio: 'alto',
        clearance: 2,
        agente: 'Hera Syndulla'
    },
    {
        id: 4,
        codice: 'PHANTOM-2',
        descrizione: 'Estrazione agente sotto copertura',
        pianeta: 'Coruscant',
        rischio: 'critico',
        clearance: 3,
        agente: 'Sconosciuto'
    }
];

let nextClienteId = clienti.length + 1;
let nextOrdineId = ordini.length + 1;
let nextTagliaId = taglie.length + 1;

// MW GLOBALI

app.use(function (req, res, next) {
    console.log('[GL.MW. CANTINA] ' + req.method + ' ' + req.url);
    next();
});

// MW su /clienti

app.use('/clienti', function (req, res, next) {
    const tessera = req.headers['x-tessera'];
    if (!tessera) {
        return res.status(403).json({ errore: 'Nessun tesserino, nessun accesso. It is what it is...' });
    }
    next();
});

app.use('/clienti', function (req, res, next) {
    const gettoni = parseInt(req.headers['x-gettoni']);
    if (isNaN(gettoni)) {
        req.gettoni = 0;
    } else {
        req.gettoni = gettoni;
    }
    next();
});

app.use('/clienti', function (req, res, next) {
    const ruolo = req.headers['x-ruolo'];
    if (!ruolo) {
        req.ruolo = 'ospite';
    } else {
        req.ruolo = ruolo;
    }
    next();
});

app.use('/clienti', function (req, res, next) {
    if (req.method !== 'POST' && req.method !== 'PUT') {
        return next();
    }
    const nome = req.body.nome;
    const specie = req.body.specie;
    const credito = req.body.credito;

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({ errore: 'Il campo nome e obbligatorio e deve essere una stringa.' });
    }
    if (!specie || typeof specie !== 'string' || specie.trim() === '') {
        return res.status(400).json({ errore: 'Il campo specie e obbligatorio e deve essere una stringa.' });
    }
    if (credito === undefined || typeof credito !== 'number' || credito < 0) {
        return res.status(400).json({ errore: 'Il campo credito e obbligatorio e deve essere un numero non negativo.' });
    }
    next();
});

// ============================================================
// MW su /missioni
// ============================================================

// Tutto ma non GET, plz
app.use('/missioni', function (req, res, next) {
    if (req.method !== 'GET') {
        return res.status(405).json({ errore: 'Metodo non consentito. Le missioni non si toccano.' });
    }
    next();
});

// Legge il livello di clearance e lo mette in req
app.use('/missioni', function (req, res, next) {
    const clearance = parseInt(req.headers['x-clearance']);
    if (isNaN(clearance) || clearance < 1) {
        req.clearance = 0;
    } else {
        req.clearance = clearance;
    }
    next();
});

// filtraggio missioni + costruzione contesto
app.use('/missioni', function (req, res, next) {
    const visibili = [];
    for (let i = 0; i < missioni.length; i++) {
        if (missioni[i].clearance <= req.clearance) {
            visibili.push(missioni[i]);
        }
    }
    req.missioniVisibili = visibili;
    next();
});

// MW su /taglie

app.use('/taglie', function (req, res, next) {
    const cacciatore = req.headers['x-cacciatore'];
    if (!cacciatore) {
        return res.status(403).json({ errore: 'Solo i cacciatori di taglie sono autorizzati.' });
    }
    next();
});

app.use('/taglie', function (req, res, next) {
    if (req.method !== 'POST') {
        return next();
    }
    const clienteId = req.body.clienteId;
    const motivazione = req.body.motivazione;
    const ricompensa = req.body.ricompensa;

    if (clienteId === undefined || typeof clienteId !== 'number') {
        return res.status(400).json({ errore: 'clienteId e obbligatorio e deve essere un numero.' });
    }
    if (!motivazione || typeof motivazione !== 'string' || motivazione.trim() === '') {
        return res.status(400).json({ errore: 'motivazione e obbligatoria e deve essere una stringa non vuota.' });
    }
    if (ricompensa === undefined || typeof ricompensa !== 'number' || ricompensa <= 0) {
        return res.status(400).json({ errore: 'ricompensa e obbligatoria e deve essere un numero maggiore di 0.' });
    }
    next();
});

// MW su /ordini
app.use('/ordini', function (req, res, next) {
    if (req.method !== 'POST') {
        return next();
    }

    const clienteId = req.body.clienteId;
    const bevandaId = req.body.bevandaId;
    const quantita = req.body.quantita;

    if (clienteId === undefined || typeof clienteId !== 'number') {
        return res.status(400).json({ errore: 'clienteId e obbligatorio e deve essere un numero.' });
    }
    if (bevandaId === undefined || typeof bevandaId !== 'number') {
        return res.status(400).json({ errore: 'bevandaId e obbligatorio e deve essere un numero.' });
    }
    if (quantita === undefined || typeof quantita !== 'number' || quantita <= 0) {
        return res.status(400).json({ errore: 'quantita e obbligatoria e deve essere un numero positivo.' });
    }
    next();
});

// CRUD su Clienti
/* 
 * Create - solitamente POST
 * Read - GET
 * Update - PUT/PATCH
 * Delete - DELETE
*/
app.get('/clienti', function (req, res) {
    console.log('[GETTONI] ' + req.gettoni + ' gettoni disponibili');
    res.json(clienti);
});

app.get('/clienti/:id', function (req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ errore: 'ID non valido.' });
    }
    let trovato = null;
    for (let i = 0; i < clienti.length; i++) {
        if (clienti[i].id === id) {
            trovato = clienti[i];
        }
    }
    if (trovato === null) {
        return res.status(404).json({ errore: 'Cliente non trovato. Forse e gia fuggito.' });
    }
    res.json(trovato);
});


app.get('/clienti/:id/riepilogo', function (req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ errore: 'ID non valido.' });
    }

    let cliente = null;
    for (let i = 0; i < clienti.length; i++) {
        if (clienti[i].id === id) {
            cliente = clienti[i];
        }
    }
    if (cliente === null) {
        return res.status(404).json({ errore: 'Cliente non trovato.' });
    }

    // 1) Ottenere tutti gli ordini di un cliente
    let ordiniCliente = [];
    for (let i = 0; i < ordini.length; i++) {
        if (ordini[i].cliente === cliente.nome) {
            ordiniCliente.push(ordini[i]);
        }
    }

    // 2) Calcolare totale speso
    let totaleSpeso = 0;
    for (let i = 0; i < ordiniCliente.length; i++) {
        totaleSpeso = totaleSpeso + ordiniCliente[i].costo_totale;
    }

    //3) Trovare la bevanda piu ordinata
    let conteggi = {};
    for (let i = 0; i < ordiniCliente.length; i++) {
        const nomeBevanda = ordiniCliente[i].bevanda;
        if (conteggi[nomeBevanda] === undefined) {
            conteggi[nomeBevanda] = 0;
        }
        conteggi[nomeBevanda] = conteggi[nomeBevanda] + ordiniCliente[i].quantita;
    }

    let bevandaPreferita = null;
    let maxQuantita = 0;
    for (const nome in conteggi) {
        if (conteggi[nome] > maxQuantita) {
            maxQuantita = conteggi[nome];
            bevandaPreferita = nome;
        }
    }

    //4) Contare le taglie attive sul cliente
    let taglieAttive = 0;
    for (let i = 0; i < taglie.length; i++) {
        if (taglie[i].clienteId === id && taglie[i].attiva === true) {
            taglieAttive = taglieAttive + 1;
        }
    }

    res.json({
        cliente: cliente.nome,
        credito_attuale: cliente.credito,
        numero_ordini: ordiniCliente.length,
        totale_speso: totaleSpeso,
        bevanda_preferita: bevandaPreferita,
        taglie_attive: taglieAttive
    });
});

app.get('/clienti/:id/ordini', function (req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ errore: 'ID non valido.' });
    }

    let cliente = null;
    for (let i = 0; i < clienti.length; i++) {
        if (clienti[i].id === id) {
            cliente = clienti[i];
        }
    }
    if (cliente === null) {
        return res.status(404).json({ errore: 'Cliente non trovato.' });
    }

    let ordiniCliente = [];
    for (let i = 0; i < ordini.length; i++) {
        if (ordini[i].cliente === cliente.nome) {
            ordiniCliente.push(ordini[i]);
        }
    }

    if (req.ruolo === 'admin') {
        return res.json(ordiniCliente);
    }

    // Se ospite : omettere costo_totale
    let ordiniRidotti = [];
    for (let i = 0; i < ordiniCliente.length; i++) {
        const o = ordiniCliente[i];
        ordiniRidotti.push({
            id: o.id,
            cliente: o.cliente,
            bevanda: o.bevanda,
            quantita: o.quantita,
            costo_base: o.costo_base,
            maggiorazione: o.maggiorazione
        });
    }
    res.json(ordiniRidotti);
});

app.post('/clienti', function (req, res) {
    const nome = req.body.nome;
    const specie = req.body.specie;
    const credito = req.body.credito;

    for (let i = 0; i < clienti.length; i++) {
        if (clienti[i].nome.toLowerCase() === nome.toLowerCase()) {
            return res.status(409).json({ errore: 'Questo nome e gia registrato alla cantina.' });
        }
    }

    const nuovo = { id: nextClienteId, nome: nome, specie: specie, credito: credito };
    nextClienteId = nextClienteId + 1;
    clienti.push(nuovo);
    res.status(201).json(nuovo);
});

app.put('/clienti/:id', function (req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ errore: 'ID non valido.' });
    }
    let index = -1;
    for (let i = 0; i < clienti.length; i++) {
        if (clienti[i].id === id) { index = i; }
    }
    if (index === -1) {
        return res.status(404).json({ errore: 'Cliente non trovato.' });
    }
    const nuovoNome = req.body.nome;
    for (let i = 0; i < clienti.length; i++) {
        if (clienti[i].nome.toLowerCase() === nuovoNome.toLowerCase() && clienti[i].id !== id) {
            return res.status(409).json({ errore: 'Questo nome e gia usato da un altro cliente.' });
        }
    }
    clienti[index].nome = req.body.nome;
    clienti[index].specie = req.body.specie;
    clienti[index].credito = req.body.credito;
    res.json(clienti[index]);
});

app.delete('/clienti/:id', function (req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ errore: 'ID non valido.' });
    }
    let index = -1;
    for (let i = 0; i < clienti.length; i++) {
        if (clienti[i].id === id) { index = i; }
    }
    if (index === -1) {
        return res.status(404).json({ errore: 'Cliente non trovato.' });
    }
    const eliminato = clienti[index];
    clienti.splice(index, 1);
    res.json({ messaggio: 'Cliente rimosso dalla lista. Speriamo non torni.', cliente: eliminato });
});

// Route Bevande
app.use('/bevande', function (req, res, next) {
    const gradazioneMax = parseInt(req.headers['x-gradazione-max']);
    if (isNaN(gradazioneMax)) {
        req.gradazioneMax = null;
    } else {
        req.gradazioneMax = gradazioneMax;
    }
    next();
});

app.get('/bevande', function (req, res) {
    if (req.gradazioneMax === null) {
        return res.json(bevande);
    }
    const risultati = [];
    for (let i = 0; i < bevande.length; i++) {
        if (bevande[i].gradazione <= req.gradazioneMax) {
            risultati.push(bevande[i]);
        }
    }
    res.json(risultati);
});

// Route Ordini
app.get('/ordini', function (req, res) {
    res.json(ordini);
});

app.post('/ordini', function (req, res) {
    const clienteId = req.body.clienteId;
    const bevandaId = req.body.bevandaId;
    const quantita = req.body.quantita;

    let cliente = null;
    for (let i = 0; i < clienti.length; i++) {
        if (clienti[i].id === clienteId) { cliente = clienti[i]; }
    }
    if (cliente === null) {
        return res.status(404).json({ errore: 'Cliente non trovato.' });
    }

    let bevanda = null;
    for (let i = 0; i < bevande.length; i++) {
        if (bevande[i].id === bevandaId) { bevanda = bevande[i]; }
    }
    if (bevanda === null) {
        return res.status(404).json({ errore: 'Bevanda non trovata. Forse e finita.' });
    }

    let costoBase = bevanda.prezzo * quantita;
    let maggiorazione = 0;
    if (bevanda.gradazione > 10) {
        maggiorazione = costoBase * 0.15;
    }
    const costoTotale = costoBase + maggiorazione;

    if (cliente.credito < costoTotale) {
        return res.status(400).json({
            errore: 'Credito insufficiente. Questo non e un posto di beneficenza.',
            credito_disponibile: cliente.credito,
            costo_totale: costoTotale
        });
    }

    cliente.credito = cliente.credito - costoTotale;

    const nuovoOrdine = {
        id: nextOrdineId,
        cliente: cliente.nome,
        bevanda: bevanda.nome,
        quantita: quantita,
        costo_base: costoBase,
        maggiorazione: maggiorazione,
        costo_totale: costoTotale,
        credito_rimasto: cliente.credito
    };
    nextOrdineId = nextOrdineId + 1;
    ordini.push(nuovoOrdine);
    res.status(201).json(nuovoOrdine);
});

// Route Taglie

app.get('/taglie', function (req, res) {
    const soloAttive = req.query.attiva;
    if (soloAttive === 'true') {
        const attive = [];
        for (let i = 0; i < taglie.length; i++) {
            if (taglie[i].attiva === true) {
                attive.push(taglie[i]);
            }
        }
        return res.json(attive);
    }
    res.json(taglie);
});

app.post('/taglie', function (req, res) {
    const clienteId = req.body.clienteId;
    const motivazione = req.body.motivazione;
    const ricompensa = req.body.ricompensa;

    let cliente = null;
    for (let i = 0; i < clienti.length; i++) {
        if (clienti[i].id === clienteId) { cliente = clienti[i]; }
    }
    if (cliente === null) {
        return res.status(404).json({ errore: 'Cliente non trovato.' });
    }

    let ricompensaEffettiva = ricompensa;
    if (cliente.credito < 500) {
        ricompensaEffettiva = ricompensa * 1.20;
    }

    const nuova = {
        id: nextTagliaId,
        clienteId: clienteId,
        motivazione: motivazione,
        ricompensa_originale: ricompensa,
        ricompensa_effettiva: ricompensaEffettiva,
        attiva: true
    };
    nextTagliaId = nextTagliaId + 1;
    taglie.push(nuova);
    res.status(201).json(nuova);
});

//Si, pensando a REST potremmo fare un ulteriore design. Quale?
app.patch('/taglie/:id/chiudi', function (req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ errore: 'ID non valido.' });
    }
    let index = -1;
    for (let i = 0; i < taglie.length; i++) {
        if (taglie[i].id === id) { index = i; }
    }
    if (index === -1) {
        return res.status(404).json({ errore: 'Taglia non trovata.' });
    }
    if (taglie[index].attiva === false) {
        return res.status(400).json({ errore: 'Questa taglia e gia stata riscossa.' });
    }
    taglie[index].attiva = false;
    res.json({ messaggio: 'Taglia riscossa. Ottimo lavoro.', taglia: taglie[index] });
});

// Route Missioni

app.get('/missioni', function (req, res) {
    if (req.clearance === 0) {
        return res.status(403).json({ errore: 'Clearance insufficiente. Non sai niente.' });
    }

    // Oscura il campo agente per clearance < 3
    if (req.clearance < 3) {
        const oscurate = [];
        for (let i = 0; i < req.missioniVisibili.length; i++) {
            const m = req.missioniVisibili[i];
            oscurate.push({
                id: m.id,
                codice: m.codice,
                descrizione: m.descrizione,
                pianeta: m.pianeta,
                rischio: m.rischio,
                agente: '[CLASSIFICATO]'
            });
        }
        return res.json(oscurate);
    }

    res.json(req.missioniVisibili);
});

app.get('/missioni/:id', function (req, res) {
    if (req.clearance === 0) {
        return res.status(403).json({ errore: 'Clearance insufficiente. Non sai niente.' });
    }

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ errore: 'ID non valido.' });
    }

    let trovata = null;
    for (let i = 0; i < req.missioniVisibili.length; i++) {
        if (req.missioniVisibili[i].id === id) {
            trovata = req.missioniVisibili[i];
        }
    }

    // Missione esiste ma non è visibile con questo clearance
    let esiste = false;
    for (let i = 0; i < missioni.length; i++) {
        if (missioni[i].id === id) { esiste = true; }
    }

    if (trovata === null && esiste) {
        return res.status(403).json({ errore: 'Clearance insufficiente per questa missione.' });
    }
    if (trovata === null) {
        return res.status(404).json({ errore: 'Missione non trovata.' });
    }

    if (req.clearance < 3) {
        return res.json({
            id: trovata.id,
            codice: trovata.codice,
            descrizione: trovata.descrizione,
            pianeta: trovata.pianeta,
            rischio: trovata.rischio,
            agente: '[CLASSIFICATO]'
        });
    }

    res.json(trovata);
});

// MW ERROR

app.use(function (err, req, res, next) {
    console.error('[ERRORE] ' + err.message);
    res.status(500).json({ errore: 'Qualcosa e esploso dietro il bancone.' });
});

app.listen(PORT, function () {
    console.log('Cantina di Mos Eisley aperta sulla porta ' + PORT);
});