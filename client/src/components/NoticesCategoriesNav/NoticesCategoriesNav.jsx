import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {getUserEmail } from '../../redux/auth/authSelectors';
import AddNoticeButton from 'components/AddNoticeButton/AddNoticeButton';
import s from './NoticesCategoriesNav.module.scss';

const setActiveLinkClass = ({ isActive }) =>
  isActive ? `${s.siteNav} ${s.activeSiteNav}` : s.siteNav;

const NoticesCategoriesNav = showButton => {
  const userEmail = useSelector(getUserEmail);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  console.log(showButton);

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
      {showButton.showButton && isMobile && <AddNoticeButton title="Add pet" />}
      {showButton.showButton && !isMobile && (
        <div className={s.boxAddPet}>
          <p className={s.textAddPet}>Add pet</p>
          <AddNoticeButton />
        </div>
      )}
    </div>
  );
};

export default NoticesCategoriesNav;
