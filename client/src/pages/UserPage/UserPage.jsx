import { useState } from 'react';
import Logout from 'components/Logout/Logout';
import PetsData from '../../components/PetsData/PetsData';
import UserInfoBlock from '../../components/UserInfoBlock/UserInfoBlock';
import style from './UserPage.module.scss';

const UserPage = () => {
  return (
    <>
      <div className={style.pageWrapper}>
        <div className={style.userWrapper}>
          <UserInfoBlock />
          <Logout />
        </div>
        <PetsData />
      </div>
    </>
  );
};

export default UserPage;
