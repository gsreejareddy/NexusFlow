import { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
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
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection) => {
      setEdges((currentEdges) => addEdge(connection, currentEdges));
    },
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div
        style={{
          padding: "15px 25px",
          background: "#0f766e",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        NexusFlow
        <span
          style={{
            marginLeft: "15px",
            fontSize: "14px",
            fontWeight: "normal",
          }}
        >
          Visual IoT Telemetry & Rule Engine
        </span>
      </div>

      <div style={{ height: "calc(100vh - 65px)" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
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