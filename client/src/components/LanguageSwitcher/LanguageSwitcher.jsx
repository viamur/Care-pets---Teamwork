import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import s from './LanguageSwitcher.module.scss';

export default function LanguageSwitcher() {
  const {
    i18n: { language },
  } = useTranslation();

  const changeLanguage = language => {
    i18n.changeLanguage(language);
  };

  return (
    <div className={s.block}>
      <button
        className={language === 'en' ? s.loclIconActive : s.loclIcon}
        onClick={() => changeLanguage('en')}
      >
        en
      </button>
      <button
        className={language === 'ua' ? s.loclIconActive : s.loclIcon}
        onClick={() => changeLanguage('ua')}
      >
        ua
      </button>
    </div>
  );
}
