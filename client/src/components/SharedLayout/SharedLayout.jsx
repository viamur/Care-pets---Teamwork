import { Suspense } from 'react';
// import Container from 'components/Container/Container';
import Header from 'components/Header/Header';
import s from './SharedLayout.module.scss';
import { Outlet } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <>
      {/* need to move <Container> to each Page component  to wrap the rendering code */}
      {/* <Container> */}
      <Header />
      <main>
        <Suspense fallback={<></>}>
          <Outlet />
        </Suspense>
      </main>
      {/* </Container> */}
    </>
  );
};

export default SharedLayout;
