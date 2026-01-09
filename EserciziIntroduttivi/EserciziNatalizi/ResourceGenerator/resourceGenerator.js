//Si, si possono usare le emoji prese da internet :)
const generators = [
    { id: "g1", symbol: "🔥", current: 0, max: 20, speed: 2000, intervalId: null },
    { id: "g2", symbol: "⚡", current: 0, max: 20, speed: 3000, intervalId: null },
    { id: "g3", symbol: "💎", current: 0, max: 20, speed: 4000, intervalId: null },
    { id: "g4", symbol: "🌾", current: 0, max: 20, speed: 5000, intervalId: null }
];

const container = document.getElementById("generator-container");

//Creo i 4 generatori
for (let i = 0; i < generators.length; i++) {
    const button = document.createElement("button");

    button.id = generators[i].id;

    updateButtonText(generators[i], button);

    button.addEventListener("click", handleClick);

    container.append(button);

    startProduction(generators[i], button);
}

function handleClick(event) {
    // event.target è il bottone cliccato
    const button = event.target;
    const generator = findGeneratorById(button.id);

    collect(generator, button);
}

function findGeneratorById(id) {
    for (let i = 0; i < generators.length; i++) {
        if (generators[i].id === id) {
            return generators[i];
        }
    }
}

function startProduction(generator, button) {
    // Se l'interval esiste già, non ne creo un altro
    // Questo evita bug di produzione multipla
    if (generator.intervalId !== null) {
        return;
    }

    generator.intervalId = setInterval(function () {
        if (generator.current < generator.max) {
            generator.current++;
            updateButtonText(generator, button);
        }

        if (generator.current === generator.max) {
            stopProduction(generator);
        }

    }, generator.speed);
}

function stopProduction(generator) {
    clearInterval(generator.intervalId);
    // intervalId torna null per indicare "non attivo"
    generator.intervalId = null;
}

function collect(generator, button) {
    generator.current = 0;
    updateButtonText(generator, button);
    startProduction(generator, button);
}

//Per pulizia, non strettamente necessaria ma comoda!
function updateButtonText(generator, button) {
    button.textContent =
        "[" +
        generator.symbol +
        " " +
        generator.current +
        "/" +
        generator.max +
        "]";
}

