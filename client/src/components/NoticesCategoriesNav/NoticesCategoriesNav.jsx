import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserEmail } from '../../redux/auth/authSelectors';
import s from './NoticesCategoriesNav.module.scss';

const setActiveLinkClass = ({ isActive }) =>
  isActive ? `${s.siteNav} ${s.activeSiteNav}` : s.siteNav;

const NoticesCategoriesNav = () => {
  const userEmail = useSelector(getUserEmail);

  return (
    <div className={s.navigationWrapper}>
      <nav className={s.navigation}>
        <NavLink to="/notices/lost-found" className={setActiveLinkClass}>
          lost/found
        </NavLink>

        <NavLink to="/notices/for-free" className={setActiveLinkClass}>
          In good hands
        </NavLink>

        <NavLink to="/notices/sell" className={setActiveLinkClass}>
          sell
        </NavLink>
        {userEmail && (
          <>
            <NavLink to="/notices/favorite" className={setActiveLinkClass}>
              Favorite ads
            </NavLink>
            <NavLink to="/notices/own" className={setActiveLinkClass}>
              My ads
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default NoticesCategoriesNav;
