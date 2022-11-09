import { Suspense } from 'react';
// import Container from 'components/Container/Container';
import Header from 'components/Header/Header';
// import s from './SharedLayout.module.scss';
import { Outlet } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <>
      {/* need to move <Container> to each Page component  to wrap the rendering code */}
      {/* <Container> */}
      <Suspense fallback={<></>}>
        <Header />
        <main>
          <Outlet />
        </main>
      </Suspense>
      {/* </Container> */}
    </>
  );
};

export default SharedLayout;
