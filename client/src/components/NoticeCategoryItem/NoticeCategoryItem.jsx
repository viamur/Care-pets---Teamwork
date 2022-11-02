import { useState } from 'react';
import sprite from '../../images/icons/sprite.svg';

import s from './NoticeCategoryItem.module.scss';

const categoriesForFront = {
  sell: 'sell',
  lostFound: 'lost/found',
  inGoodHands: 'In good hands',
};

const NoticeCategoryItem = ({
  data: {
    birthdate,
    category,
    favorite,
    imgURL,
    location,
    price,
    title,
    breed,
  },
}) => {
  const [isFavorite, setIsFavorite] = useState(favorite);

  const onClickFavorite = e => {
    setIsFavorite(!isFavorite);
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
        return `${transformedYear} years ${transformedMonth} months`;
      }
      return `${transformedYear} years`;
    }

    return `${transformedMonth} months`;
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
            <use href={sprite + '#icon-like0-icon'} />
          </svg>
        ) : (
          <svg className={s.iconFavorite}>
            <use href={sprite + '#icon-like1-icon'} />
          </svg>
        )}
      </button>

      <div className={s.commonContainerDescription}>
        <h3 className={s.titleDescr}>{title}</h3>

        <div className={s.descrBox}>
          <div className={s.containerDescr}>
            <div>
              {breed && <p className={s.descr}>Breed:</p>}
              <p className={s.descr}>Place:</p>
              {birthdate && <p className={s.descr}>Age:</p>}
              {price && <p className={s.descr}>Price:</p>}
            </div>

            <div>
              {breed && <p className={s.descr}>{breed}</p>}
              <p className={s.descr}>{location}</p>
              {birthdate && <p className={s.descr}>{convertAge(birthdate)}</p>}
              {price && <p className={s.descr}>{price}$</p>}
            </div>
          </div>

          <button className={s.btnMore} type="button">
            Learn more
          </button>
        </div>
      </div>
    </li>
  );
};

export default NoticeCategoryItem;
