import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { showAlertMessage } from '../../utils/showMessages';
import { getAdInfo } from '../../utils/api';
import { getUserEmail } from '../../redux/auth/authSelectors';
import { useTranslation } from 'react-i18next';
import sprite from '../../images/icons/sprite.svg';
import s from './ModalNotice.module.scss';

const portalModal = document.querySelector('#modal-root');

const ModalNotice = ({
  id,
  categories,
  setShowModal,
  isFavorite,
  onClickFavorite,
  onDeleteAdClick,
}) => {
  const [info, setInfo] = useState(null);
  const { t } = useTranslation();
  const userEmail = useSelector(getUserEmail);

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

  useEffect(() => {
    getAdInfo(id)
      .then(data => {
        console.log(data);
        setInfo(data);
      })
      .catch(error => showAlertMessage(error.response.data.message));
    // eslint-disable-next-line
  }, []);

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) setShowModal(false);
  };

  const onBtnCloseClick = () => {
    setShowModal(false);
  };

  const convertBirthday = birthday => {
    const date = birthday.split('T')[0];
    const dateTransformed = date.split('-').reverse().join('.');
    return dateTransformed;
  };

  return createPortal(
    info && (
      <div className={s.backdrop} onClick={onBackdropClick}>
        <div className={s.modal}>
          <button
            type="button"
            className={s.btnClose}
            onClick={onBtnCloseClick}
          >
            <svg
              className={s.iconClose}
              aria-label="Close modal"
              width="16"
              height="16"
            >
              <use href={sprite + '#close-icon'} />
            </svg>
          </button>
          <div className={s.descrBox}>
            <div className={s.thumbImage}>
              <img src={info.imgURL} className={s.photo} alt="animal" />
              <p className={s.category}>{categories[info.category]}</p>
            </div>
            <div className={s.thumbDescr}>
              <h2 className={s.title}>{info.title}</h2>
              <table className={s.table}>
                <tbody>
                  <tr>
                    <td
                      className={`${s.descrTitle}  ${s.descrAccent} ${s.descrFirst}`}
                    >
                      <p>{t('noticesPage.modal.name')}:</p>
                    </td>
                    <td className={s.descr}>
                      <p>{info.name ? info.name : '-'}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className={`${s.descrTitle} ${s.descrAccent}`}>
                      <p>{t('noticesPage.modal.birthday')}:</p>
                    </td>
                    <td className={s.descr}>
                      <p>
                        {info.birthdate ? convertBirthday(info.birthdate) : '-'}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className={`${s.descrTitle} ${s.descrAccent}`}>
                      <p>{t('noticesPage.modal.breed')}:</p>
                    </td>
                    <td className={s.descr}>
                      <p>{info.breed ? info.breed : '-'}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className={`${s.descrTitle} ${s.descrAccent}`}>
                      <p>{t('noticesPage.modal.place')}:</p>
                    </td>
                    <td className={s.descr}>
                      <p>{info.location}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className={`${s.descrTitle} ${s.descrAccent}`}>
                      <p>{t('noticesPage.modal.sex')}:</p>
                    </td>
                    <td className={s.descr}>
                      <p>{info.sex}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className={`${s.descrTitle} ${s.descrAccent}`}>
                      <p>{t('noticesPage.modal.email')}:</p>
                    </td>
                    <td className={s.descr}>
                      <p>{info.owner?.email}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className={`${s.descrTitle} ${s.descrAccent}`}>
                      <p>{t('noticesPage.modal.phone')}:</p>
                    </td>
                    <td className={s.descr}>
                      <p>{info.owner?.phone}</p>
                    </td>
                  </tr>
                  {info.category === 'sell' && (
                    <tr>
                      <td
                        className={`${s.descrTitle} ${s.descrAccent} ${s.descrLast}`}
                      >
                        <p>{t('noticesPage.modal.sell')}:</p>
                      </td>
                      <td className={s.descr}>
                        <p>{info.price} UAH</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {info.comments && (
            <p className={s.commentsDescr}>
              {t('noticesPage.modal.comments')}:
              <span className={s.comments}>{info.comments}</span>
            </p>
          )}
          <div className={s.blockOfBtn}>
            {userEmail === info.owner?.email && (
              <button className={s.btn} type="button" onClick={onDeleteAdClick}>
                {t('noticesPage.buttons.delete')}
              </button>
            )}
            <button
              className={`${s.btn} ${s.btnToggleFavorite}`}
              type="button"
              onClick={onClickFavorite}
            >
              <span className={s.iconTitle}>
                {isFavorite
                  ? t('noticesPage.buttons.removeFavorite')
                  : t('noticesPage.buttons.addFavorite')}
              </span>
              <svg
                width="16px"
                height="16px"
                className={s.icon}
                aria-label="category favorite"
              >
                <use href={sprite + '#like2-icon'} />
              </svg>
            </button>
            <a className={s.btn} href={`tel:${info.owner?.phone}`}>
              {t('noticesPage.buttons.contact')}
            </a>
          </div>
        </div>
      </div>
    ),
    portalModal
  );
};

export default ModalNotice;
