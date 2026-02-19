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

async function executeAllPendingCommands() {
    const response = await fetch('http://localhost:3000/commands');
    const data = await response.json();

    let executedCount = 0;
    let failedCount = 0;
    const results = [];

    for (const command of data.queue) {
        if (command.status === "pending") {

            const execResponse = await fetch(
                "http://localhost:3000/commands/" + command.id + "/execute",
                { method: 'PUT' }
            );

            const execData = await execResponse.json();

            if (execData.success) {
                executedCount++;
                results.push({
                    commandId: command.id,
                    experimentId: command.experimentId,
                    success: true
                });
            } else {
                failedCount++;
                results.push({
                    commandId: command.id,
                    success: false,
                    error: execData.error
                });
            }
        }
    }

    return {
        executed: executedCount,
        failed: failedCount,
        results: results
    };
}

async function emergencyPowerReduction() {
    // Step 1: Trova esperimento con consumo maggiore
    const expResponse = await fetch('http://localhost:3000/experiments');
    const expData = await expResponse.json();

    let maxPowerExp = null;
    let maxPower = 0;

    for (const exp of expData.experiments) {
        if (exp.status === "active" && exp.power > maxPower) {
            maxPower = exp.power;
            maxPowerExp = exp;
        }
    }

    if (!maxPowerExp) {
        return {
            experimentId: null,
            powerSaved: 0,
            commandId: null,
            message: "No active experiments found"
        };
    }

    // Step 2: Crea comando emergency_stop
    const cmdResponse = await fetch('http://localhost:3000/commands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: "emergency_stop",
            experimentId: maxPowerExp.id,
            reason: "Emergency power reduction"
        })
    });

    const cmdData = await cmdResponse.json();
    const commandId = cmdData.command.id;

    // Step 3: Esegui immediatamente
    const execResponse = await fetch(
        "http://localhost:3000/commands/" + commandId + "/execute",
        { method: 'PUT' }
    );

    const execData = await execResponse.json();

    return {
        experimentId: maxPowerExp.id,
        powerSaved: maxPower,
        commandId: commandId
    };
}

async function printResults() {

    try {
        console.log("--- TASK 1 ---");

        const task1Res = await task1();
        console.log(task1Res);


        console.log("--- TASK 2 ---");
        const task2Res = await shutdownAllLowExpriments();
        console.log(task2Res);

        console.log("--- TASK 3 ---");
        const task3Res = await shutdownAllLowExpriments();
        console.log(task3Res);
    } catch (error) {
        console.log("ERRORE DI RETE: " + error.message);
    }

}

printResults()

