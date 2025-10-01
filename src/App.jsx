import { useState } from 'react'
import './App.css'
import FlowCanvas from './components/FlowCanvas'

function App() {
  const [isMiniMap, setIsMiniMap] = useState(false)
  const toggleMiniMap = () => {
    setIsMiniMap(!isMiniMap)
  }
  
  return (
    <>
      <div className='container-fluid'>
        <div className="d-flex justify-content-start g-2">
          <button className='btn btn-primary' onClick={toggleMiniMap}>
            {!isMiniMap ? "Enable Mini Map" : "Disable MiniMap"}
          </button>
          <button className='btn btn-primary'>Clear</button>
        </div>
        <div className='my-2' style={{ border: "1px solid black", width: "90vw", height: "90vh", overflow: "hidden" }}>
          <FlowCanvas isMiniMap={isMiniMap} />
        </div>
      </div>
    </>
  )
}

export default App
