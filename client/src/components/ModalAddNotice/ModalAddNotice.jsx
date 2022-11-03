import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import sprite from '../../images/icons/sprite.svg';
import s from './ModalAddNotice.module.scss';

const portalModal = document.querySelector('#modal-root');

const ModalAddNotice = ({ setShowModal }) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') setShowModal(false);
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) setShowModal(false);
  };

  const onBtnCloseClick = () => {
    setShowModal(false);
  };

  return createPortal(
    <div className={s.backdrop} onClick={onBackdropClick}>
      <div className={s.modal}>
        <button type="button" className={s.btnClose} onClick={onBtnCloseClick}>
          <svg
            className={s.iconClose}
            aria-label="Close modal"
            width="16"
            height="16"
          >
            <use href={sprite + '#close-icon'} />
          </svg>
        </button>
      </div>
    </div>,
    portalModal
  );
};

export default ModalAddNotice;
