import { NavLink } from 'react-router-dom';

import s from './navMenu.module.scss';

const NavMenu = ({ isUserLoggedIn }) => {
  const getActiveLink = ({ isActive }) =>
    isActive ? s.linkActive + ' ' + s.link : s.link;
  const getActiveButton = ({ isActive }) =>
    isActive ? s.buttonActive + ' ' + s.button : s.button;

  return (
    <header className={s.header}>
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
        <NavLink className={getActiveLink} to="/notices/lost-found">
          Find pet
        </NavLink>
        <NavLink className={getActiveLink} to="/friends">
          Our Friend
        </NavLink>
      </div>
    </header>
  );
};

export default NavMenu;
