import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import NavMenu from './NavMenu';
import Modal from 'components/ModalMobile/MobileModal';
import MobileMenu from './MobileMenu';

import s from './header.module.scss';
import useMail from 'hooks/useLogin';

const Header = () => {
  const [menuStatus, setMenuStatus] = useState(false);
  const body = document.querySelector('body');

  const isUserLoggenIn = useMail();

  const handleClick = () => {
    setMenuStatus(prev => !prev);

    if (body.classList.contains('on')) {
      body.classList.remove('on');
      body.classList.add('off');
    } else if (body.classList.contains('off')) {
      body.classList.remove('off');
      body.classList.add('on');
    }
  };

  const onClose = () => {
    setMenuStatus(false);
  };

  return (
    <div className={s.navContainer}>
      <NavLink className={s.logo} to="/">
        pe<span className={s.logoT}>t</span>ly
      </NavLink>
      <NavMenu />

      <button onClick={handleClick} className={s.menuButton}>
        <svg height={35} width={40}>
          <path d="M4 24h24v-2.666h-24v2.666zM4 17.334h24v-2.667h-24v2.667zM4 8v2.666h24v-2.666h-24z"></path>
        </svg>
      </button>

      {menuStatus && <Modal close={onClose} children={<MobileMenu />} />}
    </div>
  );
};

export default Header;

<symbol id="icon-baseline-menu-24px-1-1" viewBox="0 0 32 32"></symbol>;
