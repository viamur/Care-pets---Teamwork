import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Notiflix from 'notiflix';
import sprite from '../../images/icons/sprite.svg';
import {
  addFavoriteAd,
  removeFavoriteAd,
  fetchFavoriteAds,
  deleteOwnAd,
  fetchOwnAds,
} from '../../utils/api';
import { getIsAuth } from '../../redux/auth/authSelectors';
import s from './NoticeCategoryItem.module.scss';

const categoriesForFront = {
  sell: 'sell',
  lostFound: 'lost/found',
  inGoodHands: 'In good hands',
};

const NoticeCategoryItem = ({
  data,
  id,
  setArrayFavorite,
  setArrayOwn,
  array,
}) => {
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
  const { pathname } = useLocation();

  const path = pathname.split('/').reverse(0)[0];

  const onClickFavorite = async e => {
    if (!isAuth) {
      Notiflix.Notify.info('Please, log in for adding to favorite');
      return;
    }

    if (isFavorite) {
      removeFavoriteAd(id)
        .then(data => {
          if (path === 'favorite') {
            setArrayFavorite(array);
            return fetchFavoriteAds();
          }
        })
        .then(arrayFavorite => {
          if (path === 'favorite') {
            setArrayFavorite(arrayFavorite);
          }
        })
        .catch(error => console.log(error));
      setIsFavorite(!isFavorite);
      return;
    }

    addFavoriteAd(id)
      .then(data => console.log(data))
      .catch(error => console.log(error));
    setIsFavorite(!isFavorite);
  };

  const onDeleteAdClick = () => {
    deleteOwnAd(id)
      .then(data => {
        setArrayOwn(array);
        return fetchOwnAds();
      })
      .then(array => {
        setArrayOwn(array);
      })
      .catch(error => console.log(error));
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
    <li className={s.item}>
      <img
        src={`https://pet-support.herokuapp.com/${imgURL}`}
        className={s.imgCard}
        alt="animal"
      />
      <p className={s.status}>{categoriesForFront[category]}</p>

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

      <div className={s.commonContainerDescription}>
        <h3 className={s.titleDescr}>{title}</h3>

        <div className={s.descrBox}>
          <div className={s.containerDescr}>
            <div>
              {<p className={s.descr}>Breed:</p>}
              <p className={s.descr}>Place:</p>
              {<p className={s.descr}>Age:</p>}
              {<p className={s.descr}>Price:</p>}
            </div>

            <div>
              {<p className={s.descr}>{breed ? breed : 'Unknown'}</p>}
              <p className={s.descr}>{location}</p>
              {
                <p className={s.descr}>
                  {birthdate ? convertAge(birthdate) : 'Unknown'}
                </p>
              }
              {<p className={s.descr}>{price ? `${price}$` : 'Unknown'}</p>}
            </div>
          </div>

          <button className={s.btnMore} type="button">
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
  );
};

export default NoticeCategoryItem;
