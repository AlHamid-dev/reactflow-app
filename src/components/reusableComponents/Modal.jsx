import { createPortal } from "react-dom"
import classes from "./modal.module.css"

const Modal = ({ isOpen, name, children, closeModal }) => {
    if (!isOpen) return null
    return createPortal(
        <>
            {isOpen && <div className={classes.modalStyles}>
                <div className={classes.modalContentSytles}>
                    <h4>{name}</h4>
                    <div>
                        {children}
                    </div>
                    <button className="mt-2" onClick={closeModal}>Close</button>
                </div>
            </div>}
        </>,
        document.getElementById("modal-root")
    )
}
export default Modal