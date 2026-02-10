const BASE_URL = "http://localhost:3000"

async function getSolarPanels() {
    let response = await fetch(BASE_URL + "/station/status");

    if (response.ok) {
        let json = await response.json();
        let panels = json.power.solar.panels;
        let panelsCount = panels.length

        let activePanels = 0
        for (const panel of panels) {
            if (panel.status === "nominal") {
                activePanels++;
            }
        }

        const percentageActive = (activePanels / panelsCount) * 100

        console.log(json);
        console.log(panels);

        //Creo un OBj JSON e lo restituisco
        return {
            totalPanels: panelsCount,
            operationalPanels: activePanels,
            percetage: percentageActive
        }

    } else {
        console.log("Errore HTTP: " + response.status);
    }
}

async function printResults(){
    let results = await getSolarPanels();

    console.log(results);
}

printResults(9)

