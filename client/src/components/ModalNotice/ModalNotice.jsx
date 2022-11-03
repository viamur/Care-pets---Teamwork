import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import Notiflix from 'notiflix';
import { getAdInfo } from '../../utils/api';
import { getUserEmail } from '../../redux/auth/authSelectors';
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
  const userEmail = useSelector(getUserEmail);

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) setShowModal(false);
  };

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
        setInfo(data);
      })
      .catch(error => Notiflix.Notify.failure(error.response.data.message));
    // eslint-disable-next-line
  }, []);

  const convertBirthday = birthday => {
    const date = birthday.split('T')[0];
    const dateTransformed = date.split('-').reverse().join('.');
    return dateTransformed;
  };

  return createPortal(
    info && (
      <div className={s.backdrop} onClick={onBackdropClick}>
        <div className={s.modal}>
          <div className={s.descrBox} style={{ display: 'flex' }}>
            <div className={s.thumbImage}>
              <img
                src={`https://pet-support.herokuapp.com/${info.imgURL}`}
                className={s.photo}
                alt="animal"
              />
              <p className={s.category}>{categories[info.category]}</p>
            </div>
            <div className={s.thumbDescr}>
              <h2 className={s.title}>{info.title}</h2>
              <div className={s.containerDescr}>
                <div className={s.blockDescrTitle}>
                  <p className={s.descr}>Name:</p>
                  <p className={s.descr}>Birthday:</p>
                  <p className={s.descr}>Breed:</p>
                  <p className={s.descr}>Place:</p>
                  <p className={s.descr}>The sex:</p>
                  <p className={s.descr}>Email:</p>
                  <p className={s.descr}>Phone:</p>
                  {info.category === 'sell' && <p className={s.descr}>Sell:</p>}
                </div>

                <div>
                  <p className={s.descr}>{info.name ? info.name : '-'}</p>
                  <p className={s.descr}>
                    {info.birthday ? convertBirthday(info.birthday) : '-'}
                  </p>
                  <p className={s.descr}>{info.breed ? info.breed : '-'}</p>
                  <p className={s.descr}>{info.location}</p>
                  <p className={s.descr}>{info.sex}</p>
                  <p className={s.descr}>{info.owner?.email}</p>
                  <p className={s.descr}>{info.owner?.phone}</p>
                  {info.category === 'sell' && (
                    <p className={s.descr}>{info.price ? info.price : '-'}$</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {info.comments && (
            <p className={s.commentsDescr}>
              Comments: <span className={s.comments}>{info.comments}</span>
            </p>
          )}
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            {userEmail === info.owner?.email && (
              <button className={s.btn} type="button" onClick={onDeleteAdClick}>
                Delete
              </button>
            )}
            {userEmail !== info.owner?.email && (
              <button
                className={`${s.btn} ${s.btnToggleFavorite}`}
                type="button"
                onClick={onClickFavorite}
              >
                {isFavorite ? 'Remove from' : 'Add to'}
                {/* <svg width="16px" height="16px">
                  <use href={sprite + '#like0-icon'} />
                </svg> */}
                <svg width="16px" height="16px" className={s.icon}>
                  <use href={sprite + '#like2-icon'} />
                </svg>
              </button>
            )}
            <a className={s.btn} href="tel:info.owner?.phone">
              Contact
            </a>
          </div>
        </div>
      </div>
    ),
    portalModal
  );
};

export default ModalNotice;
