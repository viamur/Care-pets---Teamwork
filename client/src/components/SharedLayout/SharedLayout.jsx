import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/Header/Header';

const SharedLayout = () => {
  return (
    <>
      <Suspense>
        <Header />
        <Suspense>
          <main>
            <Outlet />
          </main>
        </Suspense>
      </Suspense>
    </>
  );
};

export default SharedLayout;
