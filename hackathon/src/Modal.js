import React from 'react';
import ReactDOM from 'react-dom';
import './ModalStyles.css'; // Ensure this CSS file is correctly linked

export const Modal = ({ isOpen, onClose, children }) => {
    console.log("in modal");

    if (!isOpen) return null;
    
    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close-btn" onClick={onClose}>X</button>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root') // This is where the modal will be rendered
    );
};
