import s from './mobileMenu.module.scss';
import NavMenu from '../NavMenu';

const MobileMenu = () => {
  return (
    <div className={s.menuContainer}>
      <div className={s.navContainer}>
        <NavMenu />
      </div>
    </div>
  );
};

export default MobileMenu;
