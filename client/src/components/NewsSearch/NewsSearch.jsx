import { useState } from 'react';
import s from './NewsSearch.module.scss';

const NewsSearch = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    const query = e.target.value.trim();
    setSearchQuery(query);
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
        onChange={handleChange}
      />
      <button type="submit" className={s.btn}></button>
    </form>
  );
};

export default NewsSearch;
