import { useState } from 'react';

import NavMenu from './NavMenu';
import Modal from 'components/ModalMobile/MobileModal';

import s from './header.module.scss';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [menuStatus, setMenuStatus] = useState(false);

  const handleClick = () => {
    setMenuStatus(prev => !prev);
  };

  const onClose = () => {
    setMenuStatus(false);
  };

  return (
    <div className={s.navContainer}>
      <p className={s.logo}>
        pe<span className={s.logoT}>t</span>ly
      </p>
      <div className={s.menu}>
        <NavMenu />
      </div>

      {!menuStatus && (
        <button onClick={handleClick} className={s.menuButton}>
          <svg height={35} width={40}>
            <path d="M0 32h48v-5.333h-48v5.333zM0 18.667h48v-5.333h-48v5.333zM0 0v5.333h48v-5.333h-48z"></path>
          </svg>
        </button>
      )}
      {menuStatus && <Modal close={onClose} children={<MobileMenu />} />}
    </div>
  );
};

export default Header;
