import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NoticesCategoriesNav from 'components/NoticesCategoriesNav/NoticesCategoriesNav';
import NoticesSearch from 'components/NoticesSearch/NoticesSearch';

const NoticesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onSubmitSearch = searchQuery => {
    setSearchQuery(searchQuery);
  };
  return (
    <>
      <NoticesSearch onSubmit={onSubmitSearch} />
      <NoticesCategoriesNav />
      <Suspense fallback={''}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default NoticesPage;
