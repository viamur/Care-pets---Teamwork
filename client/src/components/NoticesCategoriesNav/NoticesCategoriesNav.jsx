// import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { getIsAuth } from '../../redux/auth/authSelectors';
import sprite from '../../images/icons/sprite.svg';
import s from './NoticesCategoriesNav.module.scss';

const setActiveLinkClass = ({ isActive }) =>
  isActive ? `${s.siteNav} ${s.activeSiteNav}` : s.siteNav;

const NoticesCategoriesNav = () => {
  // const [isFavoriteAds, setIsFavoriteAds] = useState(true);
  // const [isMyAds, setIsMyAds] = useState(false);
  const isAuth = useSelector(getIsAuth);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  // const onClickSelectAds = e => {
  //   setIsFavoriteAds(!isFavoriteAds);
  //   setIsMyAds(!isMyAds);
  // };

  return (
    <div className={s.navigationWrapper}>
      <nav className={s.navigation}>
        <NavLink to="/notices/lost-found" className={setActiveLinkClass}>
          lost/found
        </NavLink>

        <NavLink to="/notices/for-free" className={setActiveLinkClass}>
          In good hands
        </NavLink>

        <NavLink to="/notices/sell" className={setActiveLinkClass}>
          sell
        </NavLink>
        {isAuth && (
          <>
            <NavLink to="/notices/favorite" className={setActiveLinkClass}>
              Favorite ads
            </NavLink>
            <NavLink to="/notices/own" className={setActiveLinkClass}>
              My ads
            </NavLink>
            {/* <button
              type="button"
              className={
                isFavoriteAds ? `${s.siteNav} ${s.activeSiteNav}` : s.siteNav
              }
              name="favoriteAds"
              onClick={onClickSelectAds}
            >
              Favorite ads
            </button>
            <button
              type="button"
              className={
                isMyAds ? `${s.siteNav} ${s.activeSiteNav}` : s.siteNav
              }
              name="myAds"
              onClick={onClickSelectAds}
            >
              My ads
            </button> */}
          </>
        )}
      </nav>
      {isMobile ? (
        <button type="button" className={s.btnAddPet}>
          <svg className={s.iconAddPet}>
            <use href={sprite + '#icon-addPet-icon'} />
          </svg>
          Add pet
        </button>
      ) : (
        <div className={s.boxAddPet}>
          <p className={s.textAddPet}>Add pet</p>
          <button type="button" className={s.btnAddPet}>
            <svg className={s.iconAddPet}>
              <use href={sprite + '#icon-addPet-icon'} />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default NoticesCategoriesNav;
