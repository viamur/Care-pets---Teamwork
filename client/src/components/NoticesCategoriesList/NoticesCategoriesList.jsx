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
  const [arrayFavorite, setArrayFavorite] = useState([]);
  const [arrayOwn, setArrayOwn] = useState([]);
  const { pathname } = useLocation();

  const path = pathname.split('/').reverse(0)[0];

  useEffect(() => {
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

  useEffect(() => {
    if (path === 'favorite') {
      setArray([...arrayFavorite]);
      return;
    }
    if (path === 'own') {
      setArray([...arrayOwn]);
      return;
    }
  }, [arrayFavorite.length, arrayOwn.length]);

  return (
    <ul className={s.list}>
      {array &&
        array.map(({ _id, ...rest }) => (
          <NoticeCategoryItem
            key={_id}
            data={rest}
            id={_id}
            setArrayFavorite={setArrayFavorite}
            setArrayOwn={setArrayOwn}
            array={array}
          />
        ))}
    </ul>
  );
};

export default NoticesCategoriesList;
