import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserToken } from '../../redux/auth/authSelectors';

const PrivateRoute = ({ component: Component, ...props }) => {
  const isAuth = useSelector(getUserToken);

  return isAuth ? <Component {...props} /> : <Navigate to="/" />;
};

export default PrivateRoute;