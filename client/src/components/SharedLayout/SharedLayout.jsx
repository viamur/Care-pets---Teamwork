import { Suspense } from 'react';
import Container from 'components/Container/Container';
import Header from 'components/Header/Header';
import s from './SharedLayout.module.css';
import { Outlet } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <Container>
      <Header />
      <main>
        <Suspense fallback={<></>}>
          <Outlet />
        </Suspense>
      </main>
    </Container>
  );
};

export default SharedLayout;
