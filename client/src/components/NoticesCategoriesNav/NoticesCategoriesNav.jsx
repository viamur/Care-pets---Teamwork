import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserEmail } from '../../redux/auth/authSelectors';
import { useTranslation } from 'react-i18next';
import s from './NoticesCategoriesNav.module.scss';

const setActiveLinkClass = ({ isActive }) =>
  isActive ? `${s.siteNav} ${s.activeSiteNav}` : s.siteNav;

const NoticesCategoriesNav = () => {
  const userEmail = useSelector(getUserEmail);
  const { t } = useTranslation();

  return (
    <div className={s.navigationWrapper}>
      <nav className={s.navigation}>
        <NavLink to="/notices/sell" className={setActiveLinkClass}>
          {t('noticesPage.buttons.sell')}
        </NavLink>

        <NavLink to="/notices/lost-found" className={setActiveLinkClass}>
          {t('noticesPage.buttons.lostFound')}
        </NavLink>

        <NavLink to="/notices/for-free" className={setActiveLinkClass}>
          {t('noticesPage.buttons.goodHands')}
        </NavLink>

        {userEmail && (
          <>
            <NavLink to="/notices/favorite" className={setActiveLinkClass}>
              {t('noticesPage.buttons.favorite')}
            </NavLink>
            <NavLink to="/notices/own" className={setActiveLinkClass}>
              {t('noticesPage.buttons.ownAds')}
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default NoticesCategoriesNav;
