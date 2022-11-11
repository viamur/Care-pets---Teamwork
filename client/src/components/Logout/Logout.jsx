import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logOutUser } from '../../redux/auth/authOperations';
import logout from '../../images/icons/logout-2.png';
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
      <img src={logout} alt="Pet Foto" className={s.icon} width={18} height={18} />
      {t('userPage.buttons.logout')}
    </button>
  );
};

export default Logout;
