import { useCallback, useState } from 'react'
import './App.css'
import FlowCanvas from './components/FlowCanvas'
import CanvasButtons from './components/CanvasButtons'
import Modal from './components/reusableComponents/Modal'

function App() {
  const [isMiniMap, setIsMiniMap] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalName, setModalName] = useState("")
  const [modalChildren, setModalChildren] = useState()

  const toggleMiniMap = useCallback(() => {
    setIsMiniMap(prev => !prev)

  }, [])

  const toggleModal = useCallback((params) => {
    console.log("param", params)
    setModalName(params)
    setIsModalOpen(prev => !prev)
    let children
    if (params == "Add Nodes") {
      children = <div>
        <input className='d-block m-2' type='text' />
        <input className='d-block m-2' type='number' />
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
          <FlowCanvas isMiniMap={isMiniMap} />
        </div>
      </div>
    </>
  )
}

export default App
