import Logout from 'components/Logout/Logout';
import UserData from '../../components/UserData/UserData';
import PetsData from '../../components/PetsData/PetsData';
import style from './UserPage.module.scss';


const UserPage = props => {
  return (
      <div className={style.wrapper}>
        <UserData {...props} />
        <PetsData deletePet={props.deletePet} petsStore={props.petsStore} />
      </div>
  );
};

export default UserPage;
