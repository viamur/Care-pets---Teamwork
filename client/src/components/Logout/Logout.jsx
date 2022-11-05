import { useDispatch } from 'react-redux';
import { logOutUser } from '../../redux/auth/authOperations';
import s from './Logout.module.scss';

const Logout = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(logOutUser());
      }}
      type="button"
    >
      Logout
    </button>
  );
};

export default Logout;
