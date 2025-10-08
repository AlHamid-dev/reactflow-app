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

  function generateUniqueID() {
    let id = Math.floor(1000 + Math.random() * 9000)
    return id.toString()
  }

  const createNode = (param, id) => {
    console.log("param", param, "id", id)
    console.log("nodeNameRef", nodeNameRef)
    if (nodeNameRef.current == "") {
      alert("Enter Node name")
      return
    }
    let nodeObj
    if (param == "parent") {
      nodeObj = {
        id: `node_${generateUniqueID()}`,
        type: "ResizableGroup",
        data: {
          label: nodeNameRef.current, customProp: "Hello",
          addChild: (id, data, param) => {
            console.log("addChild", id, data, param)
            openChildModal(id, data)
          }
        },
        position: { x: 0, y: 0 },
        style: { width: 170, height: 140, background: "white", border: "1px solid black", borderRadius: 15, fontSize: 12 }
      }

    }
    else if (param == "child") {
      nodeObj = {
        id: `node_${generateUniqueID()}`,
        type: "ResizableNode",
        data: {
          label: nodeNameRef.current,
        },
        parentId: id,
        extent: "parent",
        position: { x: 10, y: 30 },
        style: { width: 80, background: "white", border: "1px solid black", borderRadius: 10, fontSize: 10 }
      }
    }
    setNodeData(nodeObj)
    setIsModalOpen(false)
  }

  const inputRef = useRef(null)

  useEffect(() => {
    if (isModalOpen) {
      inputRef.current?.focus();
    }
  }, [isModalOpen]);

  const openChildModal = (id) => {
    setNodeName("")
    setModalName("Add Child Node")
    setIsModalOpen(prev => !prev)
    let children
    children = <div>
      <input ref={inputRef} className='d-block m-2' type='text' onChange={(e) => {
        setNodeName(e.target.value)
        nodeNameRef.current = e.target.value
      }}
        onKeyDown={(e) => { if (e.key == "Enter") { createNode("child", id) } }} />
      <button className='btn btn-primary' onClick={() => createNode("child", id)}>Create Child Node</button>
    </div>
    setModalChildren(children)
  }

  const toggleModal = useCallback((params) => {
    setNodeName("")
    setModalName(params)
    setIsModalOpen(prev => !prev)
    let children
    if (params == "Add Node") {
      children = <div>
        <input ref={inputRef} className='d-block m-2' type='text' onChange={(e) => {
          setNodeName(e.target.value)
          nodeNameRef.current = e.target.value
        }}
          onKeyDown={(e) => { if (e.key == "Enter") { createNode("parent") } }} />
        
        <button className='btn btn-primary' onClick={() => createNode("parent")}>Create Node</button>
      </div>
    }
    else if (params == "Update Node") {
      children = <div>
        <input ref={inputRef} className='d-block m-2' type='text' onChange={(e) => {
          setNodeName(e.target.value)
          nodeNameRef.current = e.target.value
        }}
          onKeyDown={(e) => { if (e.key == "Enter") { createNode("parent") } }} />
        <button className='btn btn-primary' onClick={() => createNode("parent")}>Update Node</button>
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
