import s from './OurFriendsPage.module.scss';
import { fetchFriends } from '../../utils/api';
import { useEffect, useState } from 'react';
import OurFriendsList from '../../components/OurFriends/OurFriendsList';
import { showLoadingHourglass, removeLoading } from '../../utils/showLoading';
import { useTranslation } from 'react-i18next';
import Container from '../../components/Container/Container';

const OurFriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    showLoadingHourglass('Loading ...');

    fetchFriends()
      .then(data => {
        setFriends(data);
      })
      .catch(err => console.log(err))
      .finally(() => removeLoading());
  }, []);

  return (
    <Container>
      <h1 className={s.mainTitle}>{t('titles.friendsPage')}</h1>

      <OurFriendsList friends={friends} />
    </Container>
  );
};

export default OurFriendsPage;
