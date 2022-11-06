import { useDispatch } from 'react-redux';
import { logOutUser } from '../../redux/auth/authOperations';
import logout from '../../images/icons/logout-2.png';
import s from './Logout.module.scss';

const Logout = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(logOutUser());
      }}
      type="button"
      className={s.btn}
    >
      <img src={logout} alt="Pet Foto" className={s.icon}/>
      Logout
    </button>
  );
};

export default Logout;
