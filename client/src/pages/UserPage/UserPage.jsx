import Logout from 'components/Logout/Logout';
import UserData from '../../components/UserData/UserData';
import PetsData from '../../components/PetsData/PetsData';
import s from './UserPage.module.scss';

const UserPage = () => {
  return <>
        <Logout />
        <UserData />
        <PetsData />
  </>;
};

export default UserPage;
