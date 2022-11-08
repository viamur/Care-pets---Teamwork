import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserName, getUserAvatar } from 'redux/user/userSelectrors';

// import { useState } from 'react';
// import { slide as Menu } from 'react-burger-menu';

import s from './mobileMenu.module.scss';
// import NavMenu from '../NavMenu';

const MobileMenu = ({ isUserLoggedIn }) => {
  const userName = useSelector(getUserName);
    const userAvatar = useSelector(getUserAvatar);
  const getActiveLink = ({ isActive }) => (isActive ? s.linkActive + ' ' + s.link : s.link);
  const getActiveButton = ({ isActive }) => (isActive ? s.buttonActive + ' ' + s.button : s.button);

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
    <>
      {/* <NavLink className={s.logo} to="/">
        pe<span className={s.logoT}>t</span>ly
      </NavLink> */}
      <div className={s.menuContainer}>
        <ul className={s.auth}>
          <li>
            {!isUserLoggedIn && (
              <NavLink onClick={handleClick} className={getActiveButton} to="/login">
                Login
              </NavLink>
            )}
          </li>
          <li>
            {' '}
            {!isUserLoggedIn && (
              <NavLink onClick={handleClick} className={getActiveButton} to="/register">
                Registration
              </NavLink>
            )}
          </li>
          <li>
            {isUserLoggedIn && (
              <NavLink onClick={handleClick} className={s.account} to="/user">
                {userAvatar ? (
                  <img
                    src={userAvatar}
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
                {userName ? userName : 'Account'}
              </NavLink>
            )}
          </li>
        </ul>
        <ul className={s.nav}>
          <li>
            <NavLink className={getActiveLink} onClick={handleClick} to="/news">
              News
            </NavLink>
          </li>

          <li>
            <NavLink className={getActiveLink} onClick={handleClick} to="/notices/sell">
              Find pet
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleClick} className={getActiveLink} to="/friends">
              Our Friends
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MobileMenu;
