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

async function printResults() {
    const results = await getPanels();
    console.clear();
    console.log(results);
}

setInterval(printResults, 2000)
