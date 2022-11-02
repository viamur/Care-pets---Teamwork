import Logout from 'components/Logout/Logout';
import UserData from '../../components/UserData/UserData';
import PetsData from '../../components/PetsData/PetsData';
import style from './UserPage.module.scss';

const UserPage = (props) => {
  return (
    <div>
      <div className={style.headerBlock}>
        <p className={style.myInfoHeader}>My information:</p>
        <p className={style.myPetsHeader}>My pets:</p>
      </div>
      <div className={style.mainContent}>
        <UserData {...props} />
        <PetsData deletePet={props.deletePet} petsStore={props.petsStore} />
      </div>
    </div>
  )
};

export default UserPage;
