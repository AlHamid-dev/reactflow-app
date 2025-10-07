import { useState, useCallback } from 'react';
import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: 'n1',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1' },
    type: 'input',
  },
  {
    id: 'n2',
    position: { x: 100, y: 100 },
    data: { label: 'Node 2' },
    style: {
      width: 170,
      height: 140,
    },
  },
  {
    id: 'n3',
    position: { x: 100, y: 100 },
    data: { label: 'child node 1' },
    parentId: 'n2',
    extent: 'parent',
  },
]

const initialEdges = [
  { id: 'n1-n2', source: 'n1', target: 'n2', label: 'connects with', type: 'step' },
]

const FlowCanvas = ({ isMiniMap }) => {
  const proOptions = { hideAttribution: true };
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  )
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  )

  const onConnect = useCallback(
    (connection) => {
      setEdges((oldEdges) => addEdge(connection, oldEdges));
    },
    [setEdges],
  )

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        proOptions={proOptions}
        fitView
      >
        {isMiniMap && <MiniMap zoomable pannable />}
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default FlowCanvas