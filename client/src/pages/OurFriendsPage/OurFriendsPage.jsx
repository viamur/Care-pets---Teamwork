import s from './OurFriendsPage.module.scss';
import { fetchFriends } from '../../utils/api';
import { useEffect, useState } from 'react';
import OurFriendsList from '../../components/OurFriends/OurFriendsList';
import { useTranslation } from 'react-i18next';
import Loader from '../../components/Loader/Loader';
import Container from '../../components/Container/Container';

const OurFriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    fetchFriends()
      .then(data => {
        setFriends(data);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Container>
      <h2 className={s.mainTitle}>{t('titles.friendsPage')}</h2>

      {isLoading ? <Loader /> : <OurFriendsList friends={friends} />}
    </Container>
  );
};

export default OurFriendsPage;
