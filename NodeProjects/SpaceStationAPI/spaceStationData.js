const BASE_URL = "http://localhost:3000"

async function getSolarPanels() {
    let response = await fetch(BASE_URL + "/station/status");

    if (response.ok) {
        let json = await response.json();
        let panels = json.power.solar.panels;
        console.log(json);
        console.log(panels);
    } else {
        console.log("Errore HTTP: " + response.status);
    }
} 

getSolarPanels()

