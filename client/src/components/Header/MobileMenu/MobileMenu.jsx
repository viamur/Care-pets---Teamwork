import { NavLink } from 'react-router-dom';
// import { slide as Menu } from 'react-burger-menu';

import s from './mobileMenu.module.scss';
// import NavMenu from '../NavMenu';

const MobileMenu = ({ isUserLoggedIn }) => {
  const getActiveLink = ({ isActive }) =>
    isActive ? s.linkActive + ' ' + s.link : s.link;
  const getActiveButton = ({ isActive }) =>
    isActive ? s.buttonActive + ' ' + s.button : s.button;

  return (
    <div className={s.menuContainer}>
      <div className={s.auth}>
        {!isUserLoggedIn && (
          <NavLink className={getActiveButton} to="/login">
            Login
          </NavLink>
        )}
        {!isUserLoggedIn && (
          <NavLink className={getActiveButton} to="/register">
            Registration
          </NavLink>
        )}
        {isUserLoggedIn && (
          <NavLink className={s.account} to="/user">
            Account
          </NavLink>
        )}
      </div>
      <div className={s.nav}>
        <NavLink className={getActiveLink} to="/news">
          News
        </NavLink>
        <NavLink className={getActiveLink} to="/notices/sell">
          Find pet
        </NavLink>
        <NavLink className={getActiveLink} to="/friends">
          Friends
        </NavLink>
      </div>
    </div>
  );
};

export default MobileMenu;
