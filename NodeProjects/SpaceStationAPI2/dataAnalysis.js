const { escape } = require("querystring")


function task1() {
    //TODO
}

async function shutdownAllLowExpriments() {
    const response = await fetch("http://localhost:3000/experiments")
    const allExperimentsData = await response.json()

    for (const experiment of allExperimentsData.experiments) {
        if (experiment.status === "active" && experiment.priority === "low") {
            //fare la post a POST /commands
            const postResponse = await fetch("http://localhost:3000/commands", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: "shutdown",
                    experimentId: experiment.id,
                    reason: "obsoleto"
                })
            })

            const postServerData = await postResponse.json()

            let commandsFromServer = []
            if (postServerData.success) {
                commandsFromServer.push({
                    esperimentId: experiment.id,
                    commandId: postServerData.command.id
                })
            }

        }
    }

    return commandsFromServer
}