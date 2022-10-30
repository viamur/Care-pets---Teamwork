import { useState } from 'react';
import sprite from '../../images/icons/sprite.svg';
import testImg from '../../images/testNotice.jpg';

import s from './NoticeCategoryItem.module.scss';

const NoticeCategoryItem = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const isExistPrice = true;

  const onClickFavorite = e => {
    setIsFavorite(!isFavorite);
  };

  return (
    <li className={s.item}>
      <img src={testImg} className={s.imgCard} alt="animal" />
      <p className={s.status}>In good hands</p>

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
        <h3 className={s.titleDescr}>Сute dog looking for a home</h3>

        <div className={s.descrBox}>
          <div className={s.containerDescr}>
            <div>
              <p className={s.descr}>Breed:</p>
              <p className={s.descr}>Place:</p>
              <p className={s.descr}>Age:</p>
              {isExistPrice && <p className={s.descr}>Price:</p>}
            </div>

            <div>
              <p className={s.descr}>Pomeranian</p>
              <p className={s.descr}>Lviv</p>
              <p className={s.descr}>one year</p>
              {isExistPrice && <p className={s.descr}>50$</p>}
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
