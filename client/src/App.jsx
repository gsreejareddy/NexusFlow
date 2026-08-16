import { useEffect, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 150 },
    data: { label: "🌡️ Temperature Sensor" },
  },
  {
    id: "2",
    position: { x: 450, y: 150 },
    data: { label: "⚙️ Rule Engine" },
  },
  {
    id: "3",
    position: { x: 800, y: 150 },
    data: { label: "🚨 Alert" },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
  },
];

function App() {
  const [status, setStatus] = useState("Checking backend...");

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((response) => response.json())
      .then((data) => {
        setStatus(data.message);
      })
      .catch(() => {
        setStatus("Backend not connected");
      });
  }, []);

  // Send telemetry data to backend
  const sendTelemetry = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/telemetry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deviceId: "device-001",
            temperature: 28.5,
            pressure: 101.2,
            vibration: 0.35,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Telemetry data saved successfully!");
        console.log(data);
      } else {
        alert("Failed to save telemetry data");
      }
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>

      {/* Header */}
      <div
  style={{
    padding: "15px 25px",
    background: "#0f766e",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <div>
    <h2 style={{ margin: 0 }}>NexusFlow</h2>
    <p style={{ margin: "5px 0 0" }}>{status}</p>
  </div>

  <button
    onClick={sendTelemetry}
    style={{
      padding: "10px 18px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Send Telemetry
  </button>
</div>

      {/* React Flow */}
      <div style={{ height: "calc(100vh - 90px)" }}>
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background />
        </ReactFlow>
      </div>

    </div>
  );
}

export default App;