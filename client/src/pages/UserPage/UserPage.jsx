import { useState } from 'react';
import Logout from 'components/Logout/Logout';
import PetsData from '../../components/PetsData/PetsData';
import UserInfoBlock from '../../components/UserInfoBlock/UserInfoBlock';
import style from './UserPage.module.scss';


const UserPage = () => {
  const [showModal, setShowModal] = useState(false);

  const onBtnAddPetClick = () => {
    setShowModal(true);
  };
  return (
    <>
      <div className={style.pageWrapper}>
        <div className={style.userWrapper}>
          <UserInfoBlock />
          <Logout />
         {showModal && <ModalAddsPet setShowModal={setShowModal} />}
        </div>
        <button onClick={onBtnAddPetClick}>Add pet</button>
        <PetsData />
      </div>
    </>
  );
};

export default UserPage;
