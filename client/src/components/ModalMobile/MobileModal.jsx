import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import s from './mobileModal.module.scss';

const modalRoot = document.getElementById('modal-root');

function Modal({ close, children }) {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  });

  function changeClass(on, off) {
    const body = document.querySelector('body');
    if (body.classList.contains(on)) {
      body.classList.remove(on);
      body.classList.add(off);
    } else if (body.classList.contains(off)) {
      body.classList.remove(off);
      body.classList.add(on);
    }
  }

  const closeModal = e => {
    if (e.code === 'Escape') {
      close();
      changeClass('on', 'off');
      return;
    }
    if (e.target === e.currentTarget) {
      close();
      changeClass('on', 'off');
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={closeModal}>
      <div className={s.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  close: PropTypes.func.isRequired,
};

export default Modal;
