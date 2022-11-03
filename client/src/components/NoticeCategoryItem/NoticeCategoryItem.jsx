import { useState } from 'react';
import { useSelector } from 'react-redux';
import Notiflix from 'notiflix';
import sprite from '../../images/icons/sprite.svg';
import { addFavoriteAd, removeFavoriteAd, deleteOwnAd } from '../../utils/api';
import { getIsAuth } from '../../redux/auth/authSelectors';
import ModalNotice from 'components/ModalNotice/ModalNotice';
import s from './NoticeCategoryItem.module.scss';

const categoriesForFront = {
  sell: 'sell',
  lostFound: 'lost/found',
  inGoodHands: 'In good hands',
};

const NoticeCategoryItem = ({ data, id, array, setArray, category: path }) => {
  const {
    birthdate,
    category,
    favorite,
    imgURL,
    location,
    price,
    title,
    breed,
  } = data;
  const [isFavorite, setIsFavorite] = useState(favorite);
  const isAuth = useSelector(getIsAuth);
  const [showModal, setShowModal] = useState(false);

  const onClickFavorite = e => {
    if (!isAuth) {
      Notiflix.Notify.info('Please, log in for adding to favorite');
      return;
    }

    if (isFavorite) {
      removeFavoriteAd(id)
        .then(data => {
          if (path === 'favorite') {
            const arrayNew = array.filter(({ _id }) => _id !== id);
            setArray(arrayNew);
          }
        })
        .catch(error => Notiflix.Notify.failure(error.response.data.message));
      setIsFavorite(!isFavorite);
      return;
    }

    addFavoriteAd(id)
      .then(data => console.log(data))
      .catch(error => Notiflix.Notify.failure(error.response.data.message));
    setIsFavorite(!isFavorite);
  };

  const onDeleteAdClick = () => {
    deleteOwnAd(id)
      .then(data => {
        const arrayNew = array.filter(({ _id }) => _id !== id);
        setArray(arrayNew);
      })
      .catch(error => Notiflix.Notify.failure(error.response.data.message));
  };

  const onLearnMoreClick = () => {
    setShowModal(true);
  };

  function convertAge(date) {
    const dif = Date.now() - new Date(date.split('T')[0]);
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(dif / day);
    const months = Math.floor(days / 30.4);
    const years = months / 12;
    const transformedYear = years.toString().split('.')[0];
    const restDivision = years.toString().split('.')[1];
    const transformedMonth = restDivision
      ? Math.floor(Number(`0.${restDivision}` * 12))
      : null;

    if (transformedYear > 0) {
      if (transformedMonth) {
        return `${transformedYear} ${
          transformedYear === 1 ? 'year' : 'years'
        } ${transformedMonth} ${transformedMonth === 1 ? 'month' : 'months'} `;
      }
      return `${transformedYear} ${transformedYear === 1 ? 'year' : 'years'}`;
    }

    return `${transformedMonth} ${transformedMonth === 1 ? 'month' : 'months'}`;
  }

  return (
    <>
      <li className={s.item}>
        <img
          src={`https://pet-support.herokuapp.com/${imgURL}`}
          className={s.imgCard}
          alt="animal"
        />
        <p className={s.status}>{categoriesForFront[category]}</p>

        {path !== 'own' && (
          <button
            type="button"
            className={s.btnToggleFavorite}
            onClick={onClickFavorite}
          >
            {!isFavorite ? (
              <svg className={s.iconFavorite}>
                <use href={sprite + '#like0-icon'} />
              </svg>
            ) : (
              <svg className={s.iconFavorite}>
                <use href={sprite + '#like1-icon'} />
              </svg>
            )}
          </button>
        )}

        <div className={s.commonContainerDescription}>
          <h3 className={s.titleDescr}>{title}</h3>

          <div className={s.descrBox}>
            <div className={s.containerDescr}>
              <div>
                <p className={s.descr}>Breed:</p>
                <p className={s.descr}>Place:</p>
                <p className={s.descr}>Age:</p>
                <p className={s.descr}>Price:</p>
              </div>

              <div>
                <p className={s.descr}>{breed ? breed : '-'}</p>
                <p className={s.descr}>{location}</p>
                <p className={s.descr}>
                  {birthdate ? convertAge(birthdate) : '-'}
                </p>
                <p className={s.descr}>{price ? `${price}$` : '-'}</p>
              </div>
            </div>

            <button
              className={s.btnMore}
              type="button"
              onClick={onLearnMoreClick}
            >
              Learn more
            </button>
            {path === 'own' && (
              <button
                className={`${s.btnMore} ${s.btnDelete}`}
                type="button"
                onClick={onDeleteAdClick}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </li>
      {showModal && <ModalNotice id={id} setShowModal={setShowModal} />}
    </>
  );
};

export default NoticeCategoryItem;
