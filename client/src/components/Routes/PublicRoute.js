import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserToken } from '../../redux/auth/authSelectors';

const PublicRoute = ({ restricted, component: Component, ...props }) => {
    const isAuth = useSelector(getUserToken);

  return isAuth && restricted ? (
    <Navigate to="/user" />
  ) : (
    <Component {...props} />
  );
};

export default PublicRoute;