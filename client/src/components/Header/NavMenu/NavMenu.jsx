import { NavLink } from 'react-router-dom';

import s from './navMenu.module.scss';

const NavMenu = ({ isUserLoggedIn }) => {
  const getActiveLink = ({ isActive }) =>
    isActive ? s.linkActive + ' ' + s.link : s.link;
  return (
    <header>
      <NavLink className={getActiveLink} to="/news">
        News
      </NavLink>
      <NavLink className={getActiveLink} to="/notices">
        Find pet
      </NavLink>
      <NavLink className={getActiveLink} to="/friends">
        Friends
      </NavLink>
      {isUserLoggedIn && (
        <NavLink className={getActiveLink} to="/login">
          Login
        </NavLink>
      )}
      {isUserLoggedIn && (
        <NavLink className={getActiveLink} to="/register">
          Registration
        </NavLink>
      )}
    </header>
  );
};

export default NavMenu;
