import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { showAlertMessage } from '../../utils/showMessages';
import { showLoadingHourglass, removeLoading } from '../../utils/showLoading';
import {
  fetchAdsByCategory,
  fetchFavoriteAds,
  fetchOwnAds,
} from '../../utils/api';
import NoticeCategoryItem from 'components/NoticeCategoryItem/NoticeCategoryItem';
import AddNoticeButton from 'components/AddNoticeButton/AddNoticeButton';

import s from './NoticesCategoriesList.module.scss';

const categoriesForBack = {
  sell: 'sell',
  'lost-found': 'lostFound',
  'for-free': 'inGoodHands',
};

const NoticesCategoriesList = ({ category, searchQuery, setSearchQuery }) => {
  const [array, setArray] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    showLoadingHourglass('Loading ...');
    setIsLoading(true);

    if (category === 'favorite') {
      fetchFavoriteAds()
        .then(data => {
          setSearchQuery('');
          setArray(data);
        })
        .catch(error => showAlertMessage(error.response.data.message))
        .finally(() => {
          removeLoading();
          setIsLoading(false);
        });
      return;
    }

    if (category === 'own') {
      showLoadingHourglass('Loading ...');
      fetchOwnAds()
        .then(data => {
          setSearchQuery('');
          setArray(data);
        })
        .catch(error => showAlertMessage(error.response.data.message))
        .finally(() => {
          removeLoading();
          setIsLoading(false);
        });
      return;
    }

    fetchAdsByCategory(categoriesForBack[category])
      .then(data => {
        setSearchQuery('');
        setArray(data);
      })
      .catch(error => showAlertMessage(error.response.data.message))
      .finally(() => {
        removeLoading();
        setIsLoading(false);
      });

    // eslint-disable-next-line
  }, [category]);

  return (
    <>
      {!isLoading &&
        array.length === 0 &&
        category !== 'favorite' &&
        category !== 'own' && (
          <p className={s.noResults}>There are no results in this category</p>
        )}
      {!isLoading && array.length === 0 && category === 'favorite' && (
        <p className={s.noResults}>
          You haven't added anything to your favorite
        </p>
      )}
      {!isLoading && array.length === 0 && category === 'own' && (
        <p className={s.noResults}>You haven't added your own ads</p>
      )}
      <ul className={s.list}>
        {array &&
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
                setShowButton={setShowButton}
              />
            ))}
        {showButton && isMobile && (
          <AddNoticeButton title="Add pet" array={array} setArray={setArray} />
        )}
      </ul>
      {showButton && !isMobile && (
        <div className={s.boxAddPet}>
          <p className={s.textAddPet}>Add pet</p>
          <AddNoticeButton array={array} setArray={setArray} />
        </div>
      )}
    </>
  );
};

export default NoticesCategoriesList;
