import { useSelector } from 'react-redux';
import Logout from 'components/Logout/Logout';
import PetsData from '../../components/PetsData/PetsData';
import UserInfoBlock from '../../components/UserInfoBlock/UserInfoBlock';
import Container from '../../components/Container/Container';
import {
  getUserEmail,
  getUserIsLoading,
} from '../../redux/user/userSelectrors';
import { showLoadingHourglass, removeLoading } from '../../utils/showLoading';
import style from './UserPage.module.scss';
import { useEffect } from 'react';

const UserPage = () => {
  const email = useSelector(getUserEmail);
  const isLoading = useSelector(getUserIsLoading);

  useEffect(() => {
    if (isLoading) {
      showLoadingHourglass('Loading ...');
      return;
    }
    removeLoading();
    // eslint-disable-next-line
  }, [isLoading]);

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
