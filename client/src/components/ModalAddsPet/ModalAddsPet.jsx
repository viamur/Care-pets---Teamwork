import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import s from './ModalAddsPet.module.scss';

const modalContainer = document.getElementById('modal');

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
        <form class="modal__form">
          <label class="form__lable">
            <span class="form__title">Имя</span>
            <input type="text" name="name" placeholder="" class="form__input" />
 
          </label>

          <label class="form__lable">
            <span class="form__title">Телефон</span>
            <input type="tel" name="tel" class="form__input" />

          </label>

          <label class="form__lable">
            <span class="form__title">Почта</span>
            <input type="email" name="mail" class="form__input" />

          </label>

          <button type="submit" class="button">
            Отправить
          </button>
          <button type="submit" class="button">
            Отправить
          </button>
        </form>
      </div>
    </div>,
    modalContainer
  );
};

export default ModalAddsPet;
