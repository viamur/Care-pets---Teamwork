import Logout from 'components/Logout/Logout';
import UserData from '../../components/UserData/UserData';
import PetsData from '../../components/PetsData/PetsData';
import ModalAddsPet from '../../components/ModalAddsPet/ModalAddsPet';
import style from './UserPage.module.scss';
import { useState } from 'react';

const UserPage = props => {
  const [showModal, setShowModal] = useState(false);

  const onBtnAddPetClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      <div className={style.headerBlock}>
        <p className={style.myInfoHeader}>My information:</p>
        <p className={style.myPetsHeader}>My pets:</p>
      </div>
      <button onClick={onBtnAddPetClick}>Add pet</button>
      <div className={style.mainContent}>
        <UserData {...props} />
        <PetsData deletePet={props.deletePet} petsStore={props.petsStore} />
      </div>
      {showModal && <ModalAddsPet setShowModal={setShowModal} />}
    </div>
  );
};

export default UserPage;
