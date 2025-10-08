import { useState, useCallback, useEffect } from 'react';
import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ResizableNode from './ResizableNode';
import ResizableGroup from './ResizableGroup';

// const initialNodes = [
//   {
//     id: 'n1',
//     position: { x: 0, y: 0 },
//     data: { label: 'Node 1' },
//     type: 'input',
//   },
//   {
//     id: 'n2',
//     position: { x: 100, y: 100 },
//     data: { label: 'Node 2' },
//     style: {
//       width: 170,
//       height: 140,
//     },
//   },
//   {
//     id: 'n3',
//     position: { x: 100, y: 100 },
//     data: { label: 'child node 1' },
//     parentId: 'n2',
//     extent: 'parent',
//   },
// ]

// const initialEdges = [
//   { id: 'n1-n2', source: 'n1', target: 'n2', label: 'connects with', type: 'step' },
// ]

const initialNodes = []
const initialEdges = []

const FlowCanvas = ({ nodeData, isMiniMap }) => {
  const proOptions = { hideAttribution: true };
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  useEffect(() => {
    console.log("nodeData",nodeData)
    if (undefined !== nodeData) {
      setNodes((prev) => prev.concat(nodeData))
    }
  }, [nodeData])

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

  const memoizedNodeTypes = (() => ({
    resizable: ResizableNode,
    resizableGroup: (props) => (<ResizableGroup {...props} />)
  }), [])

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        nodeTypes={memoizedNodeTypes}
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