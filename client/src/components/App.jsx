import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import SharedLayout from './SharedLayout/SharedLayout';

import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';

import { getMustCurUser } from 'redux/auth/authSelectors';
import { getCurUser } from 'redux/user/userOperations';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const OurFriendsPage = lazy(() => import('../pages/OurFriendsPage/OurFriendsPage'));
const NewsPage = lazy(() => import('../pages/NewsPage/NewsPage'));
const NoticesPage = lazy(() => import('../pages/NoticesPage/NoticesPage'));
const UserPage = lazy(() => import('../pages/UserPage/UserPage'));

export const App = () => {
  const dispatch = useDispatch();
  const mustCurUser = useSelector(getMustCurUser);

  useEffect(() => {
    mustCurUser && dispatch(getCurUser());
  }, [dispatch, mustCurUser]);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<PublicRoute restricted component={HomePage} />} />
        <Route path="register" element={<PublicRoute restricted component={RegisterPage} />} />
        <Route path="login" element={<PublicRoute restricted component={LoginPage} />} />
        <Route path="friends" element={<PublicRoute component={OurFriendsPage} />} />
        <Route path="news" element={<PublicRoute component={NewsPage} />} />
        <Route path="notices/:categoryName" element={<PublicRoute component={NoticesPage} />} />
        <Route path="user" element={<PrivateRoute component={UserPage} />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
