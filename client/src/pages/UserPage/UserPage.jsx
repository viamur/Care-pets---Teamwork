import Logout from 'components/Logout/Logout';
import UserData from '../../components/UserData/UserData';
import PetsData from '../../components/PetsData/PetsData';
import ModalAddsPet from '../../components/ModalAddsPet/ModalAddsPet';
import UserInfoBlock from '../../components/UserInfoBlock/UserInfoBlock';
import style from './UserPage.module.scss';

const UserPage = props => {
  return (
    <>
      <div>
        <UserInfoBlock />
        <button onClick={onBtnAddPetClick}>Add pet</button>
        <Logout />
        {showModal && <ModalAddsPet setShowModal={setShowModal} />}
      </div>
      <div className={style.pageWrapper}>
        <UserData {...props} />
        <PetsData deletePet={props.deletePet} petsStore={props.petsStore} />
      </div>
    </>
  );
};

export default UserPage;
