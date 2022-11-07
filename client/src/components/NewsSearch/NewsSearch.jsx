import { useState } from 'react';
import s from './NewsSearch.module.scss';

const NewsSearch = ({ onSubmit, news, onChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const handleInputClick = e => {
    setIsOpen(true);
  };

  const handleChange = e => {
    const query = e.target.value.replace(/\s\s+/g, ' ');

    setSearchQuery(query);

    onChange(query);
  };

  const handleItemClick = e => {
    setSearchQuery(e.target.textContent);
    setIsOpen(!isOpen);
  };

  const handleSubmitClick = e => {
    e.preventDefault();

    onSubmit(searchQuery);

    setSearchQuery('');
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
        onClick={handleInputClick}
        onChange={handleChange}
      />
      <ul className={s.autocomplete__List}>
        {searchQuery && isOpen
          ? news
              .filter(el =>
                el.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map(el => {
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
      <button type="submit" className={s.btn} title="Submit"></button>
    </form>
  );
};

export default NewsSearch;
