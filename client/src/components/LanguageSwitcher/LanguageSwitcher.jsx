import { useState } from 'react';
import i18n from '../../i18n';
// import english from '../../images/languages/english.png';
// import ukrainian from '../../images/languages/ukrainian.png';
import s from './LanguageSwitcher.module.scss';

export default function LanguageSwitcher() {
  const [lang, setLang] = useState('en');
  const changeLanguage = language => {
    i18n.changeLanguage(language);
    setLang(language);
  };

  return (
    <div className={s.block}>
      <button
        className={lang === 'en' ? s.loclIconActive : s.loclIcon}
        onClick={() => changeLanguage('en')}
      >
        {/* <img className={s.icon} src={english} alt="" width="30" /> */}
        en
      </button>
      <button
        className={lang === 'ua' ? s.loclIconActive : s.loclIcon}
        onClick={() => changeLanguage('ua')}
      >
        {/* <img className={s.icon} src={ukrainian} alt="" width="30" /> */}
        ua
      </button>
    </div>
  );
}
