import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { showAlertMessage, showInfoMessage } from '../../utils/showMessages';
import sprite from '../../images/icons/sprite.svg';
import { addFavoriteAd, removeFavoriteAd, deleteOwnAd } from '../../utils/api';
import { getUserEmail } from '../../redux/auth/authSelectors';
import ModalNotice from 'components/ModalNotice/ModalNotice';
import { useTranslation } from 'react-i18next';
import s from './NoticeCategoryItem.module.scss';

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
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [showModal, setShowModal] = useState(false);
  const userEmail = useSelector(getUserEmail);

  const categoriesForFront = {
    sell: t('noticesPage.categories.sell'),
    lostFound: t('noticesPage.categories.lostFound'),
    inGoodHands: t('noticesPage.categories.inGoodHands'),
  };

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const onClickFavorite = e => {
    if (!userEmail) {
      showInfoMessage(t('errors.noAddFavorite'));
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
        .catch(error => showAlertMessage(error.response.data.message));
      setIsFavorite(!isFavorite);
      return;
    }

    addFavoriteAd(id)
      .then(data => console.log(data))
      .catch(error => showAlertMessage(error.response.data.message));
    setIsFavorite(!isFavorite);
  };

  const onDeleteAdClick = () => {
    deleteOwnAd(id)
      .then(data => {
        const arrayNew = array.filter(({ _id }) => _id !== id);
        setArray(arrayNew);
      })
      .catch(error => showAlertMessage(error.response.data.message));
  };

  const onLearnMoreClick = () => {
    setShowModal(true);
  };

  function convertAge(date) {
    const dif = Date.now() - new Date(date);
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(dif / day);
    const months = Math.floor(days / 30.4);
    const years = months / 12;
    const transformedYear = Number(years.toString().split('.')[0]);
    const restDivision = years.toString().split('.')[1];
    const transformedMonth = restDivision
      ? Math.floor(Number(`0.${restDivision}` * 12))
      : null;

    if (transformedYear > 0) {
      if (transformedMonth) {
        return `${transformedYear} ${
          transformedYear === 1
            ? t('noticesPage.age.year')
            : transformedYear <= 4
            ? t('noticesPage.age.years')
            : t('noticesPage.age.yearsMoreFour')
        } ${transformedMonth} ${
          transformedMonth === 1
            ? t('noticesPage.age.month')
            : transformedMonth <= 4
            ? t('noticesPage.age.months')
            : t('noticesPage.age.monthMoreFour')
        } `;
      }
      return `${transformedYear} ${
        transformedYear === 1
          ? t('noticesPage.age.year')
          : transformedYear <= 4
          ? t('noticesPage.age.years')
          : t('noticesPage.age.yearsMoreFour')
      }`;
    }

    if (transformedMonth) {
      return `${transformedMonth} ${
        transformedMonth === 1
          ? t('noticesPage.age.month')
          : transformedMonth <= 4
          ? t('noticesPage.age.months')
          : t('noticesPage.age.monthMoreFour')
      }`;
    }
    return `< 1 ${t('noticesPage.age.lessOne')}`;
  }

  return (
    <>
      <li className={s.item}>
        <div className={s.thumbImage}>
          <img src={imgURL} className={s.imgCard} alt="animal" />
          <p className={s.status}>{categoriesForFront[category]}</p>

          <button
            type="button"
            className={s.btnToggleFavorite}
            onClick={onClickFavorite}
          >
            {!isFavorite ? (
              <svg className={s.iconFavorite} aria-label="Add to favorite">
                <use href={sprite + '#like0-icon'} />
              </svg>
            ) : (
              <svg className={s.iconFavorite} aria-label="Remove from favorite">
                <use href={sprite + '#like1-icon'} />
              </svg>
            )}
          </button>
        </div>
        <div className={s.containerDescr}>
          <div className={s.descrBox}>
            <h3 className={s.titleDescr}>{title}</h3>
            <table className={s.table}>
              <tbody>
                <tr>
                  <td className={`${s.descrTitle} ${s.descrFirst}`}>
                    <p>{t('noticesPage.item.breed')}:</p>
                  </td>
                  <td className={`${s.descr} ${s.descrFirst}`}>
                    <p>{breed ? breed : '-'}</p>
                  </td>
                </tr>
                <tr>
                  <td className={s.descrTitle}>
                    <p>{t('noticesPage.item.place')}:</p>
                  </td>
                  <td className={s.descr}>
                    <p>{location}</p>
                  </td>
                </tr>
                <tr>
                  <td className={s.descrTitle}>
                    <p>{t('noticesPage.age.title')}:</p>
                  </td>
                  <td className={s.descr}>
                    <p>{birthdate ? convertAge(birthdate) : '-'}</p>
                  </td>
                </tr>
                <tr>
                  <td className={`${s.descrTitle} ${s.descrLast}`}>
                    {category === 'sell' && (
                      <p>{t('noticesPage.item.price')}:</p>
                    )}
                  </td>
                  <td className={`${s.descrTitle} ${s.descrLast}`}>
                    {category === 'sell' && (
                      <p>{price ? `${price} UAH` : '-'}</p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            className={s.btnMore}
            type="button"
            onClick={onLearnMoreClick}
          >
            {t('noticesPage.buttons.learnMore')}
          </button>
          {path === 'own' && (
            <button
              className={`${s.btnMore} ${s.btnDelete}`}
              type="button"
              onClick={onDeleteAdClick}
            >
              {t('noticesPage.buttons.delete')}
            </button>
          )}
        </div>
      </li>
      {showModal && (
        <ModalNotice
          id={id}
          setShowModal={setShowModal}
          isFavorite={isFavorite}
          onClickFavorite={onClickFavorite}
          onDeleteAdClick={onDeleteAdClick}
          categories={categoriesForFront}
        />
      )}
    </>
  );
};

export default NoticeCategoryItem;
