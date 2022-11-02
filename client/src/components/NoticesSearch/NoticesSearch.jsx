import { useState } from 'react';
import Notiflix from 'notiflix';
import sprite from '../../images/icons/sprite.svg';

import s from './NoticesSearch.module.scss';

const NoticesSearch = ({ setSearchQuery }) => {
  const [query, setQuery] = useState('');

  const onHadleChange = e => {
    setQuery(e.target.value.trim());
  };

  const onHandleSubmit = e => {
    e.preventDefault();

    if (query === '') {
      Notiflix.Notify.failure('Please input your query');
      return;
    }
    setSearchQuery(query);
    setQuery('');
  };

  return (
    <>
      <h2 className={s.titlePage}>Find your favorite pet</h2>

      <form className={s.searchForm} onSubmit={onHandleSubmit}>
        <input
          className={s.searchInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search"
          value={query}
          onChange={onHadleChange}
        />

        <button className={s.btn} type="submit">
          <svg className={s.iconSearch}>
            <use href={sprite + '#search-icon'} />
          </svg>
        </button>
      </form>
    </>
  );
};

export default NoticesSearch;
