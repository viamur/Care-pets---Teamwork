import { NavLink } from 'react-router-dom';

import s from './navMenu.module.scss';

const NavMenu = ({ isUserLoggedIn }) => {
  const getActiveLink = ({ isActive }) =>
    isActive ? s.linkActive + ' ' + s.link : s.link;
  return (
    <header className={s.header}>
      <div className={s.auth}>
        <NavLink className={s.login} to="/login">
          Login
        </NavLink>
        <NavLink className={s.register} to="/register">
          Registration
        </NavLink>
      </div>
      <div className={s.nav}>
        <NavLink className={getActiveLink} to="/news">
          News
        </NavLink>
        <NavLink className={getActiveLink} to="/notices">
          Find pet
        </NavLink>
        <NavLink className={getActiveLink} to="/our-friends">
          Friends
        </NavLink>
      </div>
    </header>
  );
};

export default NavMenu;
