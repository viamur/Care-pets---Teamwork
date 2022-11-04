import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
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
  setShowButton,
}) => {
  const [info, setInfo] = useState(null);
  const userEmail = useSelector(getUserEmail);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') setShowModal(false);
      if (isMobile) {
        setShowButton(true);
      }
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

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) setShowModal(false);
    if (isMobile) {
      setShowButton(true);
    }
  };

  const onBtnCloseClick = () => {
    setShowModal(false);
    if (isMobile) {
      setShowButton(true);
    }
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
              <img
                src={`https://pet-support.herokuapp.com/${info.imgURL}`}
                className={s.photo}
                alt="animal"
              />
              <p className={s.category}>{categories[info.category]}</p>
            </div>
            <div className={s.thumbDescr}>
              <h2 className={s.title}>{info.title}</h2>
              {/* <div className={s.containerDescr}>
                <div className={s.blockDescrTitle}>
                  <p className={`${s.descr} ${s.descrAccent}`}>Name:</p>
                  <p className={`${s.descr} ${s.descrAccent}`}>Birthday:</p>
                  <p className={`${s.descr} ${s.descrAccent}`}>Breed:</p>
                  <p className={`${s.descr} ${s.descrAccent}`}>Place:</p>
                  <p className={`${s.descr} ${s.descrAccent}`}>The sex:</p>
                  <p className={`${s.descr} ${s.descrAccent}`}>Email:</p>
                  <p className={`${s.descr} ${s.descrAccent}`}>Phone:</p>
                  {info.category === 'sell' && (
                    <p className={`${s.descr} ${s.descrAccent}`}>Sell:</p>
                  )}
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
              </div> */}
              <table className={s.table}>
                <tbody>
                  <tr>
                    <td
                      className={`${s.descrTitle}  ${s.descrAccent} ${s.descrFirst}`}
                    >
                      <p>Name:</p>
                    </td>
                    <td className={s.descr}>
                      <p>{info.name ? info.name : '-'}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className={`${s.descrTitle} ${s.descrAccent}`}>
                      <p>Birthday:</p>
                    </td>
                    <td className={s.descr}>
                      <p>
                        {info.birthday ? convertBirthday(info.birthday) : '-'}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className={`${s.descrTitle} ${s.descrAccent}`}>
                      <p>Breed:</p>
                    </td>
                    <td className={s.descr}>
                      <p>{info.breed ? info.breed : '-'}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className={`${s.descrTitle} ${s.descrAccent}`}>
                      <p>Place:</p>
                    </td>
                    <td className={s.descr}>
                      <p>{info.location}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className={`${s.descrTitle} ${s.descrAccent}`}>
                      <p>The sex:</p>
                    </td>
                    <td className={s.descr}>
                      <p>{info.sex}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className={`${s.descrTitle} ${s.descrAccent}`}>
                      <p>Email:</p>
                    </td>
                    <td className={s.descr}>
                      <p>{info.owner?.email}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className={`${s.descrTitle} ${s.descrAccent}`}>
                      <p>Phone:</p>
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
                        <p>Sell:</p>
                      </td>
                      <td className={s.descr}>
                        <p>{info.price}$</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {info.comments && (
            <p className={s.commentsDescr}>
              Comments: <span className={s.comments}>{info.comments}</span>
            </p>
          )}
          <div className={s.blockOfBtn}>
            {userEmail === info.owner?.email && (
              <button className={s.btn} type="button" onClick={onDeleteAdClick}>
                Delete
              </button>
            )}
            <button
              className={`${s.btn} ${s.btnToggleFavorite}`}
              type="button"
              onClick={onClickFavorite}
            >
              {isFavorite ? 'Remove from' : 'Add to'}
              {/* <svg width="16px" height="16px">
                  <use href={sprite + '#like0-icon'} />
                </svg> */}
              <svg
                width="16px"
                height="16px"
                className={s.icon}
                aria-label="category favorite"
              >
                <use href={sprite + '#like2-icon'} />
              </svg>
            </button>
            <a className={s.btn} href={`tel:{info.owner?.phone}`}>
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
