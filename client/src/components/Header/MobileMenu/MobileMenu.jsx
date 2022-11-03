import { NavLink } from 'react-router-dom';
// import { slide as Menu } from 'react-burger-menu';

import s from './mobileMenu.module.scss';
// import NavMenu from '../NavMenu';

const MobileMenu = () => {
  const getActiveLink = ({ isActive }) =>
    isActive ? s.linkActive + ' ' + s.link : s.link;
  // const body = document.querySelector('body');
  // const handleClick = () => {
  //   if (body.classList.contains('on')) {
  //     body.classList.remove('on');
  //     body.classList.add('off');
  //   } else if (body.classList.contains('off')) {
  //     body.classList.remove('off');
  //     body.classList.add('on');
  //   }
  // };
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
        <NavLink className={getActiveLink} to="/notices/lost-found">
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
