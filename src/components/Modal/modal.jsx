import React from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose, children }) => {

  return (
    <>
      {isOpen && (     
       <div className="modal">
          <div className="modal-content">
            {children}
              <button className="modal-close" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;