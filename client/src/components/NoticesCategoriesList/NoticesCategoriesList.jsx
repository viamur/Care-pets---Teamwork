import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { showAlertMessage } from '../../utils/showMessages';
import { fetchAdsByCategory, fetchFavoriteAds, fetchOwnAds } from '../../utils/api';
import Loader from '../../components/Loader/Loader';
import NoticeCategoryItem from 'components/NoticeCategoryItem/NoticeCategoryItem';
import AddNoticeButton from 'components/AddNoticeButton/AddNoticeButton';

import s from './NoticesCategoriesList.module.scss';

const categoriesForBack = {
  sell: 'sell',
  'lost-found': 'lostFound',
  'for-free': 'inGoodHands',
};

const NoticesCategoriesList = ({ category, searchQuery }) => {
  const { t } = useTranslation();
  const [array, setArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    setIsLoading(true);

    if (category === 'favorite') {
      fetchFavoriteAds()
        .then(data => {
          setArray(data);
        })
        .catch(error => showAlertMessage(error.response.data.message))
        .finally(() => {
          setIsLoading(false);
        });
      return;
    }

    if (category === 'own') {
      fetchOwnAds()
        .then(data => {
          setArray(data);
        })
        .catch(error => showAlertMessage(error.response.data.message))
        .finally(() => {
          setIsLoading(false);
        });
      return;
    }

    fetchAdsByCategory(categoriesForBack[category])
      .then(data => {
        setArray(data);
      })
      .catch(error => showAlertMessage(error.response.data.message))
      .finally(() => {
        setIsLoading(false);
      });

    // eslint-disable-next-line
  }, [category]);

  return (
    <>
      {!isLoading && array.length === 0 && category !== 'favorite' && category !== 'own' && (
        <p className={s.noResults}>{t('noticesPage.noResults.category')}</p>
      )}
      {!isLoading && array.length === 0 && category === 'favorite' && (
        <p className={s.noResults}>{t('noticesPage.noResults.favorite')}</p>
      )}
      {!isLoading && array.length === 0 && category === 'own' && (
        <p className={s.noResults}>{t('noticesPage.noResults.ownAds')}</p>
      )}
      {isLoading && (
        <div className={s.loader}>
          <Loader />
        </div>
      )}
      <ul className={s.list}>
        {!isLoading &&
          array &&
          array
            .filter(
              ({ title, breed }) =>
                title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
                breed?.toLowerCase().includes(searchQuery?.toLowerCase())
            )
            .map(({ _id, ...rest }) => (
              <NoticeCategoryItem
                key={_id}
                data={rest}
                id={_id}
                array={array}
                setArray={setArray}
                category={category}
              />
            ))}
        {isMobile && (
          <AddNoticeButton
            title={t('noticesPage.buttons.addPet')}
            array={array}
            setArray={setArray}
          />
        )}
      </ul>
      {!isMobile && (
        <div className={s.boxAddPet}>
          <p className={s.textAddPet}>{t('noticesPage.buttons.addPet')}</p>
          <AddNoticeButton array={array} setArray={setArray} />
        </div>
      )}
    </>
  );
};

export default NoticesCategoriesList;
