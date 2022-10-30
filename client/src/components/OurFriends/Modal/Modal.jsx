import s from './Modal.module.scss';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalContainer = document.getElementById('modal');

const Modal = ({ modalTime, setModalTime }) => {
  const handleModalClose = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
     setModalTime();
    }
  };

  useEffect(() => {
    if (modalTime) {
      window.addEventListener('keydown', handleModalClose);
    }

    return () => {
      window.removeEventListener('keydown', handleModalClose);
    };
  });

  return createPortal(
    <div className={s.overlay} onClick={handleModalClose}>
      <div className={s.modal}>
        <p>MN {modalTime}</p>
        <p>TU {modalTime}</p>
        <p>WE {modalTime}</p>
        <p>TH {modalTime}</p>
        <p>FR {modalTime}</p>
        <p>SA {modalTime}</p>
        <p>SU {modalTime}</p>
      </div>
    </div>,
    modalContainer
  );
};

export default Modal;