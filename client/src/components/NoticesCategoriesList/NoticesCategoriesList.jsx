import { useEffect, useState } from 'react';
import { showAlertMessage } from '../../utils/showMessages';
import { showLoadingHourglass, removeLoading } from '../../utils/showLoading';
import {
  fetchAdsByCategory,
  fetchFavoriteAds,
  fetchOwnAds,
} from '../../utils/api';
import NoticeCategoryItem from 'components/NoticeCategoryItem/NoticeCategoryItem';

import s from './NoticesCategoriesList.module.scss';

const categoriesForBack = {
  sell: 'sell',
  'lost-found': 'lostFound',
  'for-free': 'inGoodHands',
};

const NoticesCategoriesList = ({
  category,
  searchQuery,
  setSearchQuery,
  setShowButton,
}) => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    showLoadingHourglass('Loading ...');
    if (category === 'favorite') {
      fetchFavoriteAds()
        .then(data => {
          setSearchQuery('');
          setArray(data);
        })
        .catch(error => showAlertMessage(error.response.data.message))
        .finally(() => removeLoading());
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
        .finally(() => removeLoading());
      return;
    }

    fetchAdsByCategory(categoriesForBack[category])
      .then(data => {
        setSearchQuery('');
        setArray(data);
      })
      .catch(error => showAlertMessage(error.response.data.message))
      .finally(() => removeLoading());

    // eslint-disable-next-line
  }, [category]);

  return (
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
    </ul>
  );
};

export default NoticesCategoriesList;
