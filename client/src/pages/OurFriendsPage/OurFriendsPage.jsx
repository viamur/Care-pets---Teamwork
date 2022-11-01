import s from './OurFriendsPage.module.scss';
import { fetchFriends } from '../../utils/api';
import { useEffect, useState } from 'react';
import OurFriendsList from '../../components/OurFriends/OurFriendsList';

const OurFriendsPage = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriends()
      .then(data => {
        setFriends(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <h1 className={s.mainTitle}>Our friend</h1>
      <OurFriendsList friends={friends} />
    </>
  );
};

export default OurFriendsPage;
