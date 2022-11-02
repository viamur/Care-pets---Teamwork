import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
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

const NoticesCategoriesList = ({ category, searchQuery, setSearchQuery }) => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    if (category === 'favorite') {
      fetchFavoriteAds()
        .then(data => {
          setSearchQuery('');
          setArray(data);
        })
        .catch(error => console.log(error));
      return;
    }

    if (category === 'own') {
      fetchOwnAds()
        .then(data => {
          setSearchQuery('');
          setArray(data);
        })
        .catch(error => console.log(error));
      return;
    }

    fetchAdsByCategory(categoriesForBack[category])
      .then(data => {
        setSearchQuery('');
        setArray(data);
      })
      .catch(error => console.log(error));

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
            />
          ))}
    </ul>
  );
};

export default NoticesCategoriesList;
