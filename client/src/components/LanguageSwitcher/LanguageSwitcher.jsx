import i18n from '../../i18n';
import english from '../../images/languages/english.png';
import ukrainian from '../../images/languages/ukrainian.png';
import s from './LanguageSwitcher.module.scss';

export default function LanguageSwitcher() {
  const changeLanguage = language => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <button className={s.loclIcon} onClick={() => changeLanguage('en')}>
        <img className={s.icon} src={english} alt="" width="30" />
      </button>
      <button className={s.loclIcon} onClick={() => changeLanguage('ua')}>
        <img className={s.icon} src={ukrainian} alt="" width="30" />
      </button>
    </div>
  );
}
