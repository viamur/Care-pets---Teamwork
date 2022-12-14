import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getUserName, getUserAvatar } from 'redux/user/userSelectrors';
import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher';

import s from './navMenu.module.scss';

const NavMenu = ({ isUserLoggedIn, onClose }) => {
  const { categoryName } = useParams();
  const userName = useSelector(getUserName);
  const userAvatar = useSelector(getUserAvatar);

  const { t } = useTranslation();

  const getActiveLink = ({ isActive }) => (isActive ? `${s.linkActive} ${s.link}` : s.link);

  const getActiveNotice = () => {
    if (
      categoryName === 'sell' ||
      categoryName === 'for-free' ||
      categoryName === 'lost-found' ||
      categoryName === 'favorite' ||
      categoryName === 'own'
    ) {
      return `${s.linkActive} ${s.link}`;
    }
    return s.link;
  };

  const getActiveButton = ({ isActive }) => (isActive ? `${s.buttonActive} ${s.button}` : s.button);

  return (
    <header className={s.header}>
      <ul className={s.navAll}>
        <li>
          <NavLink className={s.logo} onClick={() => onClose()} to="/">
            pe<span className={s.logoT}>t</span>ly
          </NavLink>
        </li>
        <li className={s.navLi}>
          <NavLink className={getActiveLink} to="/news">
            {t('navigation.newsPage')}
          </NavLink>
        </li>
        <li className={s.navLi}>
          <NavLink className={getActiveNotice} to={`notices/sell`}>
            {t('navigation.noticesPage')}
          </NavLink>
        </li>
        <div className={s.nav}>
          <NavLink className={getActiveLink} to="/friends">
            {t('navigation.friendsPage')}
          </NavLink>
        </div>
      </ul>
      <LanguageSwitcher />
      <ul className={s.auth}>
        <li className={s.buttonL}>
          {!isUserLoggedIn && (
            <NavLink className={getActiveButton} to="/login">
              {t('navigation.login')}
            </NavLink>
          )}
        </li>
        <li>
          {!isUserLoggedIn && (
            <NavLink className={getActiveButton} to="/register">
              {t('navigation.registration')}
            </NavLink>
          )}
        </li>
        <li>
          {isUserLoggedIn && (
            <NavLink className={s.account} to="/user">
              {userAvatar ? (
                <img
                  src={
                    userAvatar === 'https://pet-support.herokuapp.com/avatar/default.jpg'
                      ? 'https://care-pets-backend.goit.global/avatar/default.jpg'
                      : userAvatar
                  }
                  alt="avatar user"
                  height={23}
                  width={23}
                  className={s.img}
                />
              ) : (
                <svg viewBox="3 0 45 30" width={38} height={23} className={s.icon}>
                  <path
                    fill="#fff"
                    d="M16.007 2.667c-7.363 0-13.339 5.976-13.339 13.339s5.976 13.339 13.339 13.339c7.363 0 13.339-5.976 13.339-13.339s-5.976-13.339-13.339-13.339zM16.007 8.003c2.577 0.003 4.665 2.091 4.668 4.668v0c-0.003 2.577-2.091 4.666-4.668 4.669h-0c-2.577-0.003-4.666-2.092-4.668-4.669v-0c0.003-2.577 2.091-4.665 4.668-4.668h0zM16.007 26.677c-2.707 0-5.909-1.093-8.19-3.842 2.232-1.764 5.086-2.829 8.19-2.829s5.958 1.066 8.218 2.851l-0.028-0.021c-2.281 2.749-5.482 3.842-8.19 3.842z"
                  ></path>
                </svg>
              )}
              {userName ? userName : t('navigation.account')}
            </NavLink>
          )}
        </li>
      </ul>
    </header>
  );
};

export default NavMenu;
