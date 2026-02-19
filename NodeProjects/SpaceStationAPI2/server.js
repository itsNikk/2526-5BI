const express = require('express');
const app = express();

app.use(express.json()); // Per parsare body JSON

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Stato mutabile del sistema
let systemState = {
  experiments: [
    { id: "EXP-771", name: "Protein Crystal Growth", status: "active", priority: "high", power: 4.2 },
    { id: "EXP-803", name: "Zero-G Combustion", status: "active", priority: "medium", power: 3.1 },
    { id: "EXP-904", name: "Plant Growth Study", status: "standby", priority: "low", power: 0 }
  ],
  commandQueue: [],
  lastCommandId: 0,
  powerBudget: 85.0,
  powerUsed: 7.3
};

// GET: Lista esperimenti
app.get('/experiments', (req, res) => {
  res.json({
    experiments: systemState.experiments,
    powerStatus: {
      budget: systemState.powerBudget,
      used: systemState.powerUsed,
      available: systemState.powerBudget - systemState.powerUsed
    }
  });
});

// GET: Coda comandi pendenti
app.get('/commands', (req, res) => {
  res.json({
    queue: systemState.commandQueue,
    count: systemState.commandQueue.length
  });
});

// POST: Invia nuovo comando
app.post('/commands', (req, res) => {
  const { action, experimentId, reason } = req.body;
  
  // Validazione
  if (!action || !experimentId) {
    return res.status(400).json({ 
      success: false, 
      error: "Missing required fields: action, experimentId" 
    });
  }
  
  const experiment = systemState.experiments.find(e => e.id === experimentId);
  if (!experiment) {
    return res.status(404).json({ 
      success: false, 
      error: `Experiment ${experimentId} not found` 
    });
  }
  
  // Crea comando
  systemState.lastCommandId++;
  const command = {
    id: `CMD-${systemState.lastCommandId}`,
    action: action,
    experimentId: experimentId,
    reason: reason || "No reason provided",
    status: "pending",
    timestamp: new Date().toISOString()
  };
  
  systemState.commandQueue.push(command);
  
  res.status(201).json({
    success: true,
    command: command,
    queuePosition: systemState.commandQueue.length
  });
});

// PUT: Esegui comando (cambia stato esperimento)
app.put('/commands/:commandId/execute', (req, res) => {
  const { commandId } = req.params;
  
  const commandIndex = systemState.commandQueue.findIndex(c => c.id === commandId);
  if (commandIndex === -1) {
    return res.status(404).json({ 
      success: false, 
      error: `Command ${commandId} not found` 
    });
  }
  
  const command = systemState.commandQueue[commandIndex];
  const experiment = systemState.experiments.find(e => e.id === command.experimentId);
  
  // Esegui azione
  let newStatus;
  let powerChange = 0;
  
  if (command.action === "shutdown") {
    if (experiment.status === "active") {
      powerChange = -experiment.power;
      experiment.power = 0;
    }
    newStatus = "standby";
  } else if (command.action === "activate") {
    if (experiment.status === "standby") {
      const basePower = experiment.priority === "high" ? 4.5 : experiment.priority === "medium" ? 3.0 : 2.0;
      experiment.power = basePower;
      powerChange = basePower;
    }
    newStatus = "active";
  } else if (command.action === "emergency_stop") {
    powerChange = -experiment.power;
    experiment.power = 0;
    newStatus = "emergency";
  } else {
    return res.status(400).json({ 
      success: false, 
      error: `Unknown action: ${command.action}` 
    });
  }
  
  experiment.status = newStatus;
  systemState.powerUsed += powerChange;
  command.status = "executed";
  
  // Rimuovi dalla coda
  systemState.commandQueue.splice(commandIndex, 1);
  
  res.json({
    success: true,
    command: command,
    experiment: experiment,
    powerChange: powerChange,
    newPowerUsed: systemState.powerUsed
  });
});

// DELETE: Annulla comando pendente
app.delete('/commands/:commandId', (req, res) => {
  const { commandId } = req.params;
  
  const commandIndex = systemState.commandQueue.findIndex(c => c.id === commandId);
  if (commandIndex === -1) {
    return res.status(404).json({ 
      success: false, 
      error: `Command ${commandId} not found` 
    });
  }
  
  const command = systemState.commandQueue[commandIndex];
  systemState.commandQueue.splice(commandIndex, 1);
  
  res.json({
    success: true,
    message: `Command ${commandId} cancelled`,
    command: command
  });
});

// PUT: Modifica priorità esperimento
app.put('/experiments/:experimentId', (req, res) => {
  const { experimentId } = req.params;
  const { priority } = req.body;
  
  const experiment = systemState.experiments.find(e => e.id === experimentId);
  if (!experiment) {
    return res.status(404).json({ 
      success: false, 
      error: `Experiment ${experimentId} not found` 
    });
  }
  
  if (!["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({ 
      success: false, 
      error: "Priority must be: low, medium, or high" 
    });
  }
  
  const oldPriority = experiment.priority;
  experiment.priority = priority;
  
  res.json({
    success: true,
    experiment: experiment,
    changed: { from: oldPriority, to: priority }
  });
});

app.listen(3000, () => console.log('Command API running on http://localhost:3000'));