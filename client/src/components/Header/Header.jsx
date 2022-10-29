import NavMenu from './NavMenu';

import s from './header.module.scss';

const Header = () => {
  return (
    <div className={s.navContainer}>
      <p className={s.logo}>
        pe<span className={s.logoT}>t</span>ly
      </p>
      <div className={s.menu}>
        <NavMenu />
      </div>

      <button className={s.menuButton}>
        <svg height={35} width={40}>
          <path d="M0 32h48v-5.333h-48v5.333zM0 18.667h48v-5.333h-48v5.333zM0 0v5.333h48v-5.333h-48z"></path>
        </svg>
      </button>
    </div>
  );
};

export default Header;
