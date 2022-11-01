import s from './OurFriendsPage.module.scss';
import { fetchFriends } from '../../utils/api';
import { useEffect, useState } from 'react';
import OurFriendsList from '../../components/OurFriends/OurFriendsList';
import { FallingLines } from 'react-loader-spinner';

const OurFriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchFriends()
      .then(data => {
        setFriends(data);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className={s.mainTitle}>Our friend</h1>
      {loading && (
        <FallingLines
          color="#F59256"
          width="100"
          visible={true}
          ariaLabel="falling-lines-loading"
        />
      )}
      <OurFriendsList friends={friends} />
    </>
  );
};

export default OurFriendsPage;
