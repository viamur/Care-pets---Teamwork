import { useSelector } from 'react-redux';
import Logout from 'components/Logout/Logout';
import PetsData from '../../components/PetsData/PetsData';
import UserInfoBlock from '../../components/UserInfoBlock/UserInfoBlock';
import Container from '../../components/Container/Container';
import { getUserEmail } from '../../redux/user/userSelectrors';
import style from './UserPage.module.scss';

const UserPage = () => {
  const email = useSelector(getUserEmail);

  return (
    <Container>
      {email && (
        <div className={style.pageWrapper}>
          <div className={style.userWrapper}>
            <UserInfoBlock />
            <Logout />
          </div>
          <PetsData />
        </div>
      )}
    </Container>
  );
};

export default UserPage;
