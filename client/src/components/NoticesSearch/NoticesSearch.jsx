import { useState } from 'react';
import sprite from '../../images/icons/sprite.svg';

import s from './NoticesSearch.module.scss';

const NoticesSearch = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onHadleChange = e => {
    const query = e.target.value.trim();
    setSearchQuery(query);
  };

  const onHandleSubmit = e => {
    e.preventDefault();

    onSubmit(searchQuery);
    setSearchQuery('');
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
          value={searchQuery}
          onChange={onHadleChange}
        />

        <button className={s.btn} type="submit">
          <svg className={s.iconSearch}>
            <use href={sprite + '#icon-search-icon'} />
          </svg>
        </button>
      </form>
    </>
  );
};

export default NoticesSearch;
