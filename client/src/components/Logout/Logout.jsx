import { useDispatch } from 'react-redux';
import { logOutUser } from '../../redux/auth/authOperations';
import logout from '../../images/icons/logout-2.png';
import { useTranslation } from 'react-i18next';
import s from './Logout.module.scss';

const Logout = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <button
      onClick={() => {
        dispatch(logOutUser());
      }}
      type="button"
      className={s.btn}
    >
      <img src={logout} alt="Pet Foto" className={s.icon} />
      {t('userPage.buttons.logout')}
    </button>
  );
};

export default Logout;
