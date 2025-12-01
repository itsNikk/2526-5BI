let propositi = [];

let procrastinazioniTotali = 0;

const inputProposito = document.getElementById('inputProposito');
const contatoreTotale = document.getElementById('contatoreTotale');
const piuProcrastinato = document.getElementById('piuProcrastinato');
const listaTodo = document.getElementById('listaTodo');

// 1. AGGIUNTA CON ENTER
inputProposito.addEventListener('keydown', (e) => {
    //e.key: quale tasto è tasto della tastiera è stato premuto
    if (e.key === 'Enter') {
        //trim() elimina eventuali spazi all'inizio e alla fine della stringa
        const testo = inputProposito.value.trim();

        // micro validazione input
        if (testo === '') {
            alert('Inserisci un proposito!');
            return;
        }

        const nuovoProposito = {
            testo: testo,
            procrastinazioni: 0
        };


        propositi.push(nuovoProposito);


        inputProposito.value = '';

        // Aggiorna DOM (usato funzioni per comodità)
        mostraPropositi();
        aggiornaPiuProcrastinato();
    }
});

// 2. LISTA TODO CON BOTTONI
function mostraPropositi() {
    listaTodo.textContent = '';

    if (propositi.length === 0) {
        listaTodo.textContent = 'Nessun proposito nella lista';
        return;
    }

    for (let i = 0; i < propositi.length; i++) {
        const proposito = propositi[i];

        // Crea container (div si usa per contenere elementi, <p> per testo) propositi
        const div = document.createElement('div');

        // Testo con suffisso R
        let testoCompleto = proposito.testo;
        for (let p = 0; p < proposito.procrastinazioni; p++) {
            testoCompleto += ' R';
        }
        div.textContent = testoCompleto + ' ';

        // Bottone Procrastina
        const btnProcrastina = document.createElement('button');
        btnProcrastina.textContent = 'Procrastina 5 secondi';
        btnProcrastina.addEventListener('click', () => {
            procrastinaProposito(i);
        });
        div.appendChild(btnProcrastina);

        // Bottone Fatto
        const btnFatto = document.createElement('button');
        btnFatto.textContent = 'Fatto';
        btnFatto.addEventListener('click', () => {
            eliminaProposito(i);
        });
        div.appendChild(btnFatto);

        listaTodo.appendChild(div);
    }
}

// 3. PROCRASTINA CON SETTIMEOUT
function procrastinaProposito(indice) {
    const proposito = propositi[indice];

    proposito.procrastinazioni++;

    // 4. INCREMENTA CONTATORE TOTALE
    procrastinazioniTotali++;
    contatoreTotale.textContent = procrastinazioniTotali;

    // IMPORTANTE: salvare proposito PRIMA di rimuoverlo
    const propositoSalvato = propositi.splice(indice, 1)[0];

    // Aggiorna visualizzazione (proposito scompare)
    mostraPropositi();

    // Dopo 5 secondi, rimetti in lista
    setTimeout(() => {
        propositi.push(propositoSalvato);
        mostraPropositi();
        aggiornaPiuProcrastinato();
    }, 5000);
}

function eliminaProposito(indice) {
    propositi.splice(indice, 1);
    mostraPropositi();
    aggiornaPiuProcrastinato();
}

// 5. PROPOSITO PIÙ PROCRASTINATO
function aggiornaPiuProcrastinato() {
    if (propositi.length === 0) {
        piuProcrastinato.textContent = 'Nessuno';
        return;
    }

    // Trova il proposito con più procrastinazioni
    let maxProcrastinazioni = propositi[0].procrastinazioni;
    let testoPiuProcrastinato = propositi[0].testo;

    for (let i = 1; i < propositi.length; i++) {
        if (propositi[i].procrastinazioni > maxProcrastinazioni) {
            maxProcrastinazioni = propositi[i].procrastinazioni;
            testoPiuProcrastinato = propositi[i].testo;
        }
    }

    // Mostra solo se ha almeno 1 procrastinazione
    if (maxProcrastinazioni > 0) {
        piuProcrastinato.textContent = testoPiuProcrastinato + ' (' + maxProcrastinazioni + ' volte)';
    } else {
        piuProcrastinato.textContent = 'Nessuno ancora';
    }
}

// Inizializza visualizzazione DOM
mostraPropositi();
aggiornaPiuProcrastinato();