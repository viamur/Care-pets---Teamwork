import { NavLink } from 'react-router-dom';

import s from './mobileMenu.module.scss';
// import NavMenu from '../NavMenu';

const MobileMenu = () => {
  const getActiveLink = ({ isActive }) =>
    isActive ? s.linkActive + ' ' + s.link : s.link;
  return (
    <div className={s.menuContainer}>
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
    </div>
  );
};

export default MobileMenu;
