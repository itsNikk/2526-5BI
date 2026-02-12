const BASE_URL = "http://localhost:3000"

/**
 * 1) chiamare station/status
 */
async function getPanels() {
    const response = await fetch(BASE_URL + "/station/status");

    if (response.ok) {
        const json = await response.json()
        //        console.log(json);
        const panels = json.power.solar.panels
        const totalPanels = panels.length
        //      console.log(panels);

        //Trova solo quelli operativi
        let activePanels = 0
        for (const panel of panels) {
            if (panel.status === "nominal") {
                activePanels++;
            }
        }

        const percentage = (activePanels / totalPanels) * 100;

        return {
            totalPanels: totalPanels,
            operationalPanels: activePanels,
            percentage: percentage
        }

    }
}

//Task 2
async function trovaModuliDegradati() {
    const response = await fetch(BASE_URL + '/station/modules');
    const data = await response.json();

    const moduliProblematici = [];

    for (let i = 0; i < data.modules.length; i++) {
        const modulo = data.modules[i];

        // Controlla se il modulo ha subsystems ... perchè è importante?
        if (modulo.systems && modulo.systems.subsystems) {
            const degradedSystemNames = [];

            for (let j = 0; j < modulo.systems.subsystems.length; j++) {
                const subsystem = modulo.systems.subsystems[j];
                if (subsystem.status !== 'nominal') {
                    degradedSystemNames.push(subsystem.name);
                }
            }

            // Se ha trovato almeno un sistema degradato, aggiungi il modulo
            if (degradedSystemNames.length > 0) {
                moduliProblematici.push({
                    moduleId: modulo.id,
                    degradedSystemNames: degradedSystemNames
                });
            }
        }
    }

    return moduliProblematici;
}


//Creo una funzione che si occupa solo della stampa del separazione delle responsabilitù
async function monitorStation() {
    const results = await getPanels();
    console.clear();
    console.log(results);
}

setInterval(monitorStation, 2000)
