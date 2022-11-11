import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import filterArrByTitle from '../../utils/filterArrByTitle';
import { showInfoMessage, showAlertMessage } from '../../utils/showMessages';
import s from './NewsSearch.module.scss';

const NewsSearch = ({ onSubmit, news, onChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleChange = e => {
    setIsOpen(true);
    const query = e.target.value.replace(/\s\s+/g, ' ');
    setSearchQuery(query);
    onChange(query);
  };

  const handleItemClick = e => {
    setSearchQuery(e.target.textContent);
    setIsOpen(false);
  };

  const handleSubmitClick = e => {
    e.preventDefault();
    if (!searchQuery) {
      showAlertMessage(t('errors.emptyQuery'));

      return;
    } else if (filterArrByTitle(news, searchQuery).length === 0) {
      showInfoMessage(t('errors.news'));
    }

    onSubmit(searchQuery);
    setIsOpen(false);
  };

  const searchClear = () => {
    setSearchQuery('');
    onSubmit('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmitClick}>
      <input
        type="text"
        className={s.input}
        placeholder={t('newsPage.placeholder')}
        autoComplete="off"
        autoFocus
        value={searchQuery}
        onChange={handleChange}
      />
      <ul className={s.autocomplete__List}>
        {searchQuery && isOpen
          ? filterArrByTitle(news, searchQuery).map(el => {
              const { title, _id } = el;

              return (
                <li className={s.autocomplete__Item} key={_id} onClick={handleItemClick}>
                  {title}
                </li>
              );
            })
          : null}
      </ul>
      {searchQuery && (
        <button
          className={`${s.btn} ${s.btn__delete}`}
          type="button"
          onClick={searchClear}
          title="Return to all news"
        ></button>
      )}
      <button type="submit" className={s.btn__submit} title="Submit"></button>
    </form>
  );
};

export default NewsSearch;
