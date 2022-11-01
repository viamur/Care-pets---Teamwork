import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import s from './ModalAddsPet.module.scss';

const modalContainer = document.getElementById('modal-root');

const ModalAddsPet = ({ modal, setModal }) => {
  const handleModalClose = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      setModal();
    }
  };

  useEffect(() => {
    if (modal) {
      window.addEventListener('keydown', handleModalClose);
    }

    return () => {
      window.removeEventListener('keydown', handleModalClose);
    };
  });

  return createPortal(
    <div className={s.overlay} onClick={handleModalClose}>
      <div className={s.modal}>
        <button onClick={handleModalClose} className={s.modalClose}>
          +
        </button>
        <h1 className={s.modalTitle}>Add Pet</h1>
        <form className={s.modalForm}>
          <label className={s.modalFormLable}>
            <span>Name pet</span>
            <input type="text" name="name" placeholder="Type name pet"/>
          </label>

          <label className={s.modalFormLable}>
            <span className={s.modalFormLableTitle} >Date of birth</span>
            <input
              type="birthday"
              name="birthday"
              placeholder="Type date of birth"
            />
          </label>

          <label className={s.modalFormLable}>
            <span className={s.modalFormLableTitle} >Breed</span>
            <input type="breed" name="breed" placeholder="Type breed" />
          </label>

          <button type="submit">Cancel</button>
          <button type="submit">Next</button>
        </form>
      </div>
    </div>,
    modalContainer
  );
};

export default ModalAddsPet;
