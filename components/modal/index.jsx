import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 modal">
      <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md p-4 mx-auto rounded-3xl shadow-lg z-50 overflow-y-auto">
        <div className="modal-content p-4">{children}</div>
        {onClose && (
          <div
            className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
            onClick={closeModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
