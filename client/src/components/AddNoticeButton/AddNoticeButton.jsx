import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { showInfoMessage } from '../../utils/showMessages';
import { getUserEmail } from '../../redux/auth/authSelectors';
import ModalAddNotice from 'components/ModalAddNotice/ModalAddNotice';
import { useTranslation } from 'react-i18next';
import sprite from '../../images/icons/sprite.svg';
import s from './AddNoticeButton.module.scss';

const AddNoticeButton = ({ title, array, setArray }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const userEmail = useSelector(getUserEmail);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const onBtnAddNoticeClick = () => {
    if (!userEmail) {
      showInfoMessage(t('errors.noAddNotice'));
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
        </svg>
        {title && <p className={s.title}>{title}</p>}
      </button>
      {showModal && (
        <ModalAddNotice
          setShowModal={setShowModal}
          array={array}
          setArray={setArray}
        />
      )}
    </>
  );
};

export default AddNoticeButton;
