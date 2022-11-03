import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Notiflix from 'notiflix';
import { getIsAuth, getUserEmail } from '../../redux/auth/authSelectors';
import ModalAddNotice from 'components/ModalAddNotice/ModalAddNotice';
import sprite from '../../images/icons/sprite.svg';
import s from './AddNoticeButton.module.scss';

const AddNoticeButton = ({ title }) => {
  const [showModal, setShowModal] = useState(false);
  const isAuth = useSelector(getIsAuth);
  const userEmail = useSelector(getUserEmail);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const onBtnAddNoticeClick = () => {
    if (!isAuth || !userEmail) {
      Notiflix.Notify.info('Please, log in for adding notice');
      return;
    }
    setShowModal(true);
  };

  return (
    <>
      <button
        type="button"
        className={`${s.btnAddPet} ${isMobile && showModal && s.btnMobileHide}`}
        onClick={onBtnAddNoticeClick}
      >
        <svg className={s.iconAddPet}>
          <use href={sprite + '#addPet-icon'} />
          {title && title}
        </svg>
      </button>
      {showModal && <ModalAddNotice setShowModal={setShowModal} />}
    </>
  );
};

export default AddNoticeButton;
