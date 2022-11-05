import { useState } from 'react';
import sprite from '../../images/icons/sprite.svg';

import s from './NoticesSearch.module.scss';

const NoticesSearch = ({ setSearchQuery, title }) => {
  const [query, setQuery] = useState('');

  const onHadleChange = e => {
    setQuery(e.target.value.trim());
  };

  const onHandleSubmit = e => {
    e.preventDefault();
    setSearchQuery(query);
    setQuery('');
  };

  return (
    <>
      <h2 className={s.titlePage}>{title}</h2>

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
