import { useState } from 'react';

import NavMenu from './NavMenu';
import Modal from 'components/ModalMobile/MobileModal';
import MobileMenu from './MobileMenu';
import Container from 'components/Container/Container';

import s from './header.module.scss';

import useMail from 'hooks/useLogin';

const Header = () => {
  const [menuStatus, setMenuStatus] = useState(false);
  const body = document.querySelector('html');

  const isUserLoggedIn = useMail();

  const handleClick = () => {
    setMenuStatus(prev => !prev);

    if (body.classList.contains('on')) {
      body.classList.remove('on');
      body.classList.add('off');
    } else if (body.classList.contains('off')) {
      body.classList.remove('off');
      body.classList.add('on');
    }
    // if (document.body.style.overflow === 'hidden') {
    //   document.body.style.overflow = 'auto';
    //   return;
    // }
    // document.body.style.overflow = 'hidden';
  };

  const onClose = () => {
    // document.body.style.overflow = 'visible';
    setMenuStatus(false);
  };

  return (
    <Container>
      <div className={s.navContainer}>
        <NavMenu onClose={onClose} isUserLoggedIn={isUserLoggedIn} />

        <button onClick={handleClick} className={s.menuButton}>
          <svg viewBox=" 1 1 28 28" height={35} width={40}>
            <path d="M4 24h24v-2.666h-24v2.666zM4 17.334h24v-2.667h-24v2.667zM4 8v2.666h24v-2.666h-24z"></path>
          </svg>
        </button>

        {menuStatus && (
          <Modal
            close={onClose}
            children={<MobileMenu onClose={onClose} isUserLoggedIn={isUserLoggedIn} />}
          />
        )}
      </div>
    </Container>
  );
};

export default Header;

<symbol id="icon-baseline-menu-24px-1-1" viewBox="0 0 32 32"></symbol>;
