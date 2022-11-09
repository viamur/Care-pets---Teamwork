import { useState } from 'react';
import { showInfoMessage } from '../../utils/showMessages';
import filteArrByTitle from '../../utils/filteArrByTitle';
import s from './NewsSearch.module.scss';

const NewsSearch = ({ onSubmit, news, onChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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
      showInfoMessage('Sorry, your query is empty');
      return;
    } else if (filteArrByTitle(news, searchQuery).length === 0) {
      showInfoMessage(
        'Sorry, there are no news matching your search query. Please try again.'
      );
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
        placeholder="Search"
        autoComplete="off"
        autoFocus
        value={searchQuery}
        onChange={handleChange}
      />
      <ul className={s.autocomplete__List}>
        {searchQuery && isOpen
          ? filteArrByTitle(news, searchQuery).map(el => {
              const { title, _id } = el;

              return (
                <li
                  className={s.autocomplete__Item}
                  key={_id}
                  onClick={handleItemClick}
                >
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
