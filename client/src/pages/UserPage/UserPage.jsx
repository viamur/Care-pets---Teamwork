import Logout from 'components/Logout/Logout';
import UserData from '../../components/UserData/UserData';
import PetsData from '../../components/PetsData/PetsData';
import ModalAddsPet from '../../components/ModalAddsPet/ModalAddsPet';
import UserInfoBlock from '../../components/UserInfoBlock/UserInfoBlock';
import style from './UserPage.module.scss';
import { useState } from 'react';

const UserPage = props => {
  const [showModal, setShowModal] = useState(false);

  const onBtnAddPetClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      <UserInfoBlock />
      <button onClick={onBtnAddPetClick}>Add pet</button>
      <Logout />
      {showModal && <ModalAddsPet setShowModal={setShowModal} />}
    </div>
  );
};

export default UserPage;
