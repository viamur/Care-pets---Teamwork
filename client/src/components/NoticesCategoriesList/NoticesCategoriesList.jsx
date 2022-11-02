import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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

const NoticesCategoriesList = () => {
  const [array, setArray] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.split('/').reverse(0)[0];
    if (path === 'favorite') {
      fetchFavoriteAds()
        .then(data => setArray(data))
        .catch(error => console.log(error));
      return;
    }

    if (path === 'own') {
      fetchOwnAds()
        .then(data => setArray(data))
        .catch(error => console.log(error));
      return;
    }

    fetchAdsByCategory(categoriesForBack[path])
      .then(data => setArray(data))
      .catch(error => console.log(error));

    // eslint-disable-next-line
  }, [pathname]);

  return (
    <ul className={s.list}>
      {array.length > 0 &&
        array.map(({ _id, ...rest }) => (
          <NoticeCategoryItem key={_id} data={rest} />
        ))}
    </ul>
  );
};

export default NoticesCategoriesList;
