import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import FlowCanvas from './components/FlowCanvas'
import CanvasButtons from './components/CanvasButtons'
import Modal from './components/reusableComponents/Modal'

function App() {
  const [isMiniMap, setIsMiniMap] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalName, setModalName] = useState("")
  const [modalChildren, setModalChildren] = useState()
  const [nodeName, setNodeName] = useState("")
  const [nodeData, setNodeData] = useState()
  const nodeNameRef = useRef("")

  const toggleMiniMap = useCallback(() => {
    setIsMiniMap(prev => !prev)

  }, [])

  useEffect(() => {
    console.log("nodeName", nodeName)
  }, [nodeName])

  function generateUniqueID(){
    let id = Math.floor(1000 + Math.random() * 9000)
    return id.toString()
  }

  const createNode = () => {
    console.log("nodeNameRef", nodeNameRef)
    if (nodeNameRef.current == "") {
      alert("Enter Node name")
      return
    }
    let nodeObj = {
      id: `node_${generateUniqueID()}`,
      type: "resizableGroup", data: { label: nodeNameRef.current }, position: { x: 0, y: 0 },
      style: { width: 170, height: 140, background: "transparent", border: "1px solid black", borderRadius: 15, fontSize: 12 }
    }
    setNodeData(nodeObj)
    setIsModalOpen(false)
  }

  const toggleModal = useCallback((params) => {
    setNodeName("")
    setModalName(params)
    setIsModalOpen(prev => !prev)
    let children
    if (params == "Add Nodes") {
      children = <div>
        <input className='d-block m-2' type='text' onChange={(e) => {
          setNodeName(e.target.value)
          nodeNameRef.current = e.target.value
        }} />
        <button onClick={createNode}>Create Node</button>
        {/* <input className='d-block m-2' type='text' onChange={} /> */}
      </div>
    }
    setModalChildren(children)

  }, [])

  return (
    <>
      <div className='m-2 container-fluid'>
        <Modal name={modalName} isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} >
          {modalChildren}
        </Modal>
        <CanvasButtons toggleMiniMap={toggleMiniMap} isMiniMap={isMiniMap} openModal={toggleModal} />
        <div className='my-2' style={{ border: "1px solid black", width: "90vw", height: "90vh", overflow: "hidden" }}>
          <FlowCanvas nodeData={nodeData} isMiniMap={isMiniMap} />
        </div>
      </div>
    </>
  )
}

export default App
