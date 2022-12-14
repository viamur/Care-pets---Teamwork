import { useState } from 'react';
import { showAlertMessage } from '../../utils/showMessages';
import sprite from '../../images/icons/sprite.svg';
import { useTranslation } from 'react-i18next';
import s from './NoticesSearch.module.scss';

const NoticesSearch = ({ setSearchQuery, title }) => {
  const [query, setQuery] = useState('');
  const { t } = useTranslation();
  const onHadleChange = e => {
    setQuery(e.target.value);
  };

  const onHandleSubmit = e => {
    e.preventDefault();
    if (!query) {
      showAlertMessage(t('errors.emptyQuery'));
      return;
    }
    setSearchQuery(query);
  };

  const searchClear = () => {
    setQuery('');
    setSearchQuery('');
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
          placeholder={t('noticesPage.placeholder')}
          value={query}
          onChange={onHadleChange}
        />
        {query && (
          <button
            className={`${s.btn} ${s.btnDelete}`}
            type="button"
            onClick={searchClear}
          >
            <svg className={s.iconDelete}>
              <use href={sprite + '#close-icon'} />
            </svg>
          </button>
        )}
        <button className={`${s.btn} ${s.btnSearch} `} type="submit">
          <svg className={s.iconSearch}>
            <use href={sprite + '#search-icon'} />
          </svg>
        </button>
      </form>
    </>
  );
};

export default NoticesSearch;
