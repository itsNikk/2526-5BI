let nomi = [];
let importi = [];

let addExpenseBtn = document.getElementById("addExpense")
let calcChangesBtn = document.getElementById("calcChanges")


addExpenseBtn.addEventListener("click", addExpense)
calcChangesBtn.addEventListener("click", computeChanges)


function addExpense() {
    let nome = document.getElementById('nome').value.trim();
    let importo = parseFloat(document.getElementById('importo').value);

    if (nome === '' || isNaN(importo) || importo < 0) {
        alert('Inserisci nome e importo validi');
        return;
    }

    nomi.push(nome);
    importi.push(importo);

    document.getElementById('nome').value = '';
    document.getElementById('importo').value = '';

    showExpenses();
}

function showExpenses() {
    let html = '';
    for (let i = 0; i < nomi.length; i++) {
        html += '<p>' + nomi[i] + ': ' + importi[i].toFixed(2) + '€</p>';
    }
    document.getElementById('listaSpese').innerHTML = html;
}

function computeChanges() {
    if (nomi.length === 0) {
        alert('Nessuna spesa inserita');
        return;
    }

    // Calcola totale e media
    let totale = 0;
    for (let i = 0; i < importi.length; i++) {
        totale += importi[i];
    }
    let media = totale / nomi.length;

    // Calcola saldi (quanto ogni persona deve dare o ricevere)
    let saldi = [];
    for (let i = 0; i < importi.length; i++) {
        saldi.push(importi[i] - media);
    }

    // Mostra risultati
    let html = '<h2>Risultati:</h2>';
    html += '<p><strong>Totale speso:</strong> ' + totale.toFixed(2) + '€</p>';
    html += '<p><strong>Media per persona:</strong> ' + media.toFixed(2) + '€</p>';

    html += '<h3>Quanto ha speso ognuno:</h3>';
    for (let i = 0; i < nomi.length; i++) {
        html += '<p>' + nomi[i] + ': ' + importi[i].toFixed(2) + '€</p>';
    }

    html += '<h3>Saldo di ognuno:</h3>';
    for (let i = 0; i < nomi.length; i++) {
        if (saldi[i] > 0) {
            html += '<p>' + nomi[i] + ' deve ricevere ' + saldi[i].toFixed(2) + '€</p>';
        } else if (saldi[i] < 0) {
            html += '<p>' + nomi[i] + ' deve dare ' + (-saldi[i]).toFixed(2) + '€</p>';
        } else {
            html += '<p>' + nomi[i] + ' è in pari</p>';
        }
    }

    // Calcola transazioni (versione banale)
    html += '<h3>Transazioni da effettuare:</h3>';

    let totaleCrediti = getTotaleCreditori(saldi);

    for (let i = 0; i < nomi.length; i++) {
        if (saldi[i] < 0) { // questa persona deve dare soldi
            let debitoDaPagare = -saldi[i];

            for (let j = 0; j < nomi.length; j++) {
                if (saldi[j] > 0) { // questa persona deve ricevere soldi
                    // Ripartizione proporzionale: il debitore dà una quota proporzionale al credito
                    let importoTransazione = debitoDaPagare * (saldi[j] / totaleCrediti);

                    if (importoTransazione > 0.01) { // evita transazioni troppo piccole per arrotondamenti
                        html += '<p>' + nomi[i] + ' → ' + nomi[j] + ': ' + importoTransazione.toFixed(2) + '€</p>';
                    }
                }
            }
        }
    }

    document.getElementById('risultati').innerHTML = html;
}

function getTotaleCreditori(saldi) {
    let tot = 0;
    for (let i = 0; i < saldi.length; i++) {
        if (saldi[i] > 0) {
            tot += saldi[i];
        }
    }
    return tot;
}