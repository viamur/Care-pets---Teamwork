import { NavLink } from 'react-router-dom';

// import { useState } from 'react';
// import { slide as Menu } from 'react-burger-menu';

import s from './mobileMenu.module.scss';
// import NavMenu from '../NavMenu';

const MobileMenu = ({ isUserLoggedIn }) => {
  const getActiveLink = ({ isActive }) =>
    isActive ? s.linkActive + ' ' + s.link : s.link;
  const getActiveButton = ({ isActive }) =>
    isActive ? s.buttonActive + ' ' + s.button : s.button;

  // const setMenuStatus = useState(false);
  // setMenuStatus(prev => !prev);

  // const onClose = () => {
  //   setMenuStatus(false);
  // };

  const handleClick = e => {
    // e.preventDefault();
    const id = document.getElementById('modal-root');
    if (id.contains('modal-root')) {
      id.remove('modal-root');
    }
    // if (e.code === 'Escape') {
    //   close();
    //   changeClass('on', 'off');
    //   return;
    // }
    // if (e.target === e.currentTarget) {
    //   close();
    //   changeClass('on', 'off');
  };

  return (
    <div className={s.menuContainer}>
      <div className={s.auth}>
        {!isUserLoggedIn && (
          <NavLink
            onClick={handleClick}
            className={getActiveButton}
            to="/login"
          >
            Login
          </NavLink>
        )}
        {!isUserLoggedIn && (
          <NavLink
            onClick={handleClick}
            className={getActiveButton}
            to="/register"
          >
            Registration
          </NavLink>
        )}
        {isUserLoggedIn && (
          <NavLink onClick={handleClick} className={s.account} to="/user">
            Account
          </NavLink>
        )}
      </div>
      <div className={s.nav}>
        <NavLink className={getActiveLink} onClick={handleClick} to="/news">
          News
        </NavLink>
        <NavLink
          className={getActiveLink}
          onClick={handleClick}
          to="/notices/sell"
        >
          Find pet
        </NavLink>
        <NavLink onClick={handleClick} className={getActiveLink} to="/friends">
          Our Friend
        </NavLink>
      </div>
    </div>
  );
};

export default MobileMenu;
