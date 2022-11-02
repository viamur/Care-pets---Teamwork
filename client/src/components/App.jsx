import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SharedLayout from './SharedLayout/SharedLayout';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const OurFriendsPage = lazy(() =>
  import('../pages/OurFriendsPage/OurFriendsPage')
);
const NewsPage = lazy(() => import('../pages/NewsPage/NewsPage'));
const NoticesPage = lazy(() => import('../pages/NoticesPage/NoticesPage'));
const UserPage = lazy(() => import('../pages/UserPage/UserPage'));

const NoticesCategoriesList = lazy(() =>
  import('components/NoticesCategoriesList/NoticesCategoriesList')
);

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="friends" element={<OurFriendsPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="notices/" element={<NoticesPage />}>
          <Route path="sell" element={<NoticesCategoriesList />} />
          <Route path="lost-found" element={<NoticesCategoriesList />} />
          <Route path="for-free" element={<NoticesCategoriesList />} />
          <Route path="favorite" element={<NoticesCategoriesList />} />
          <Route path="own" element={<NoticesCategoriesList />} />
        </Route>
        <Route path="notices/:categoryName" element={<NoticesPage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
