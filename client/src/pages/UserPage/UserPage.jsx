import { useState } from 'react';
import Logout from 'components/Logout/Logout';
import PetsData from '../../components/PetsData/PetsData';
import UserInfoBlock from '../../components/UserInfoBlock/UserInfoBlock';
import ModalAddsPet from '../../components/ModalAddsPet/ModalAddsPet';
import style from './UserPage.module.scss';
import Container from '../../components/Container/Container';

const UserPage = () => {
  return (
    <Container>
      <div className={style.pageWrapper}>
        <div className={style.userWrapper}>
          <UserInfoBlock />
          <Logout />
        </div>
        <PetsData />
      </div>
    </Container>
  );
};

export default UserPage;
