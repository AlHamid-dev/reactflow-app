import { memo } from "react"


const CanvasButtons = ({ toggleMiniMap,isMiniMap,openModal }) => {
  
    return (
        <div className="d-flex justify-content-start gap-2">
            <button className='btn btn-primary' onClick={toggleMiniMap}>
                {!isMiniMap ? "Enable Mini Map" : "Disable Mini Map"}
            </button>
            <button className='btn btn-primary' onClick={(e) => openModal(e.target.innerText)} >Add Nodes</button>
        </div>
    )
}
export default memo(CanvasButtons)