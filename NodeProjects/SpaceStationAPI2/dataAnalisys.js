async function task1() {
    const expResponse = await fetch("http://localhost:3000/experiments");
    const expJson = await expResponse.json();

    let activeExpCounter = 0;
    let standbyExpCounter = 0;
    for (const exp of expJson.experiments) {
        if (exp.status === "active") {
            activeExpCounter++;
        }
        if (exp.status === "standby") {
            standbyExpCounter++;
        }
    }

    const availablePower = expJson.powerStatus.available;
    const canActivateMore = availablePower > 3.0;

    return {
        activeCount: activeExpCounter,
        standbyCount: standbyExpCounter,
        canActivateMore: canActivateMore
    };
}

async function shutdownAllLowExpriments() {
    const response = await fetch("http://localhost:3000/experiments")
    const allExperimentsData = await response.json()

    let commandsFromServer = []

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

async function printResults() {

    console.log("--- TASK 1 ---");

    const task1Res = await task1();
    console.log(task1Res);


    console.log("--- TASK 2 ---");
    const taskRes = await shutdownAllLowExpriments();
    console.log(taskRes);
}

printResults()

