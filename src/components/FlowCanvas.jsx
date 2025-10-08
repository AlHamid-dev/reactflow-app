import { useState, useCallback, useEffect, useRef } from 'react';
import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ResizableNode from './ResizableNode';
import ResizableGroup from './ResizableGroup';
import DownloadButton from './DownloadFlow';
import Modal from './reusableComponents/Modal';

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
const connectionLineStyle = { stroke: '#ffff' }
const snapGrid = [25, 25]
const proOptions = { hideAttribution: true }
const defaultEdgeOptions = {
  animated: false,
  type: 'smoothstep',
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const FlowCanvas = ({ nodeData, isMiniMap }) => {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  //child modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalName, setModalName] = useState("")
  const [modalChildren, setModalChildren] = useState()
  const [nodeName, setNodeName] = useState("")
  const nodeNameRef = useRef("")

  useEffect(() => {
    console.log("nodeData", nodeData)
    if (undefined !== nodeData) {
      setNodes((prev) => prev.concat(nodeData))
    }
  }, [nodeData])

  //   useEffect(() => {
  //   console.log("nodes", nodes)
    
  // }, [nodes])

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
    resizableGroup: (props) => (<ResizableGroup {...props} addChild={handleChildModal} />)
  }), [])

  const nodeTypes = {
    ResizableNode,
    // resizableGroup: (props) => (<ResizableGroup {...props} addChild={handleChildModal} />),
    ResizableGroup
  }
console.log("nodeTypes",nodeTypes)

  useEffect(() => {
    if (isModalOpen) {
      inputRef.current?.focus();
    }
  }, [isModalOpen]);

  const handleChildModal = useCallback((id, data) => {
    setNodeName("")
    setModalName("Add Child Node")
    setIsModalOpen(prev => !prev)
    children = <div>
      <input ref={inputRef} className='d-block m-2' type='text' onChange={(e) => {
        setNodeName(e.target.value)
        nodeNameRef.current = e.target.value
      }}
        onKeyDown={(e) => { if (e.key == "Enter") { createNode() } }} />
      <button className='btn btn-primary' onClick={createNode}>Create Node</button>
    </div>
    setModalChildren(children)
  }, [])

  return (
    <div style={{ height: "100%" }}>
      <Modal name={modalName} isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} >
        {modalChildren}
      </Modal>
      <ReactFlow
        // nodeTypes={memoizedNodeTypes}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        proOptions={proOptions}
        connectionLineStyle={connectionLineStyle}
        connectionLineType="smoothstep"
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultViewport={defaultViewport}
        defaultEdgeOptions={defaultEdgeOptions}
        className="download-image"
        fitView
      >
        {isMiniMap && <MiniMap zoomable pannable />}
        <Background />
        <Controls />
        <DownloadButton />
      </ReactFlow>
    </div>
  )
}

export default FlowCanvas