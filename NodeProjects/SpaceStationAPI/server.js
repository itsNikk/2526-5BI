const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const randomInRange = (min, max) => Math.random() * (max - min) + min;
const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

app.get('/station/status', (req, res) => {
  res.json({
    stationId: "ISS-AURORA-7",
    timestamp: new Date().toISOString(),
    power: {
      solar: {
        output: randomInRange(75, 90),
        panels: [
          { id: "SP-01", angle: randomInRange(40, 50), output: randomInRange(18, 23), status: randomPick(["maintenance", "nominal"]) },
          { id: "SP-02", angle: randomInRange(40, 50), output: randomInRange(18, 23), status: randomPick(["maintenance", "nominal"]) },
          { id: "SP-03", angle: 0, output: 0, status: randomPick(["maintenance", "nominal"]) },
          { id: "SP-04", angle: randomInRange(40, 50), output: randomInRange(18, 23), status: randomPick(["maintenance", "nominal"]) }
        ]
      },
      consumption: randomInRange(70, 85),
      reserves: randomInRange(90, 100)
    }
  });
});

app.get('/station/modules', (req, res) => {
  res.json({
    modules: [
      {
        id: "HAB-A",
        type: "habitation",
        crew: [
          { name: "Chen Wei", role: "commander", health: randomInRange(0.85, 0.98) },
          { name: "Okafor Amara", role: "engineer", health: randomInRange(0.85, 0.98) }
        ],
        systems: {
          lifeSupport: {
            o2Level: randomInRange(20.5, 21.2),
            temperature: randomInRange(19, 23),
            alerts: []
          },
          subsystems: [
            { name: "air-scrubber", status: "nominal", efficiency: randomInRange(0.92, 0.99) },
            { name: "water-recycler", status: randomPick(["nominal", "degraded"]), efficiency: randomInRange(0.70, 0.95) }
          ]
        }
      },
      {
        id: "LAB-2",
        type: "laboratory",
        experiments: [
          {
            id: "EXP-771",
            name: "Protein Crystal Growth",
            researcher: "Okafor Amara",
            status: randomPick(["active", "standby"]),
            progress: randomInRange(0.5, 0.9),
            resourceConsumption: { power: randomInRange(3, 6), cooling: randomInRange(1.5, 3) }
          },
          {
            id: "EXP-803",
            name: "Zero-G Combustion",
            researcher: "Chen Wei",
            status: "active",
            progress: randomInRange(0.3, 0.7),
            resourceConsumption: { power: randomInRange(2, 5), cooling: randomInRange(1, 2.5) }
          }
        ],
        systems: {
          cooling: {
            temperature: randomInRange(-5, 2),
            status: randomPick(["nominal", "warning"])
          }
        }
      },
      {
        id: "DOCK-1",
        type: "docking",
        vehicles: [
          { id: "CARGO-45", type: "supply", docked: true, fuel: randomInRange(60, 95) }
        ],
        systems: {
          pressure: randomInRange(98, 102),
          status: "nominal"
        }
      }
    ]
  });
});

app.listen(3000, () => console.log('Station API running on http://localhost:3000'));