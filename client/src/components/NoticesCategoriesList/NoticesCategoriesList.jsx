import { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
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
    if (category === 'favorite') {
      fetchFavoriteAds()
        .then(data => {
          setSearchQuery('');
          setArray(data);
        })
        .catch(error => Notiflix.Notify.failure(error.response.data.message));
      return;
    }

    if (category === 'own') {
      fetchOwnAds()
        .then(data => {
          setSearchQuery('');
          setArray(data);
        })
        .catch(error => Notiflix.Notify.failure(error.response.data.message));
      return;
    }

    fetchAdsByCategory(categoriesForBack[category])
      .then(data => {
        setSearchQuery('');
        setArray(data);
      })
      .catch(error => Notiflix.Notify.failure(error.response.data.message));

    // eslint-disable-next-line
  }, [category]);

  return (
    <ul className={s.list}>
      {array &&
        array
          .filter(({ title }) => title.includes(searchQuery))
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
