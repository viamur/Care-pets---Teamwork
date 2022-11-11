import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/Header/Header';

const SharedLayout = () => {
  return (
    <>
      <Suspense fallback={<></>}>
        <Header />
        <main>
          <Outlet />
        </main>
      </Suspense>
    </>
  );
};

export default SharedLayout;
