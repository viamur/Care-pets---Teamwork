import s from './OurFriendsPage.module.scss';
import axios from 'axios';

import { useEffect, useState } from 'react';

import Modal from '../../components/OurFriends/Modal/Modal';
axios.defaults.baseURL = 'http://localhost:3005/';

// import { fetchQueryPhotos } from '../api/pixabay-api';
// import ImageGallery from './ImageGallery/ImageGallery';
// import Searchbar from './Searchbar/Searchbar';
// import Button from './Button/Button';
// import { Bars } from 'react-loader-spinner';

const OurFriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [modalTime, setModalTime] = useState(null);

  const fetchQueryPhotos = () => {
    return axios.get('friends').then(response => response.data);
  };

  const funcModalTime = (modalTime = null) => {
    setModalTime(modalTime);
  };

  useEffect(() => {
    // setLoading(true);
    fetchQueryPhotos()
      .then(data => {
        setFriends(data);
      })
      .catch(err => console.log(err));
    // .finally(() => setLoading(false));
  }, []);

  // console.log(modalTime);
  return (
    <>
      <h1 className={s.mainTitle}>Our friend</h1>
      <ul className={s.list}>
        {friends.map(friend => (
          <li key={friend._id} className={s.card}>
            <h2 className={s.cardTitle}>{friend.title}</h2>
            <div className={s.iconDescriptionWrapper}>
              <img src={friend.icon} className={s.icon} alt="Our Friend Icon" />
              <ul className={s.discriptionList}>
                <li
                  className={s.discriptionEl}
                  onClick={() => funcModalTime(friend.time)}
                >
                  <p className={s.discription}>Time:</p>
                  <div className={s.time}>
                    <p className={s.discription}>{friend.time}</p>
                  </div>
                </li>
                <li className={s.discriptionEl}>
                  <p className={s.discription}>Adress:</p>
                  <p className={s.discription}>{friend.adress}</p>
                </li>
                <li className={s.discriptionEl}>
                  <p className={s.discription}>Email:</p>
                  <p className={s.discription}>{friend.email}</p>
                </li>
                <li className={s.discriptionEl}>
                  <p className={s.discription}>Phone:</p>
                  <p className={s.discription}>{friend.phone}</p>
                </li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
      {modalTime && (
        <Modal modalTime={modalTime} setModalTime={funcModalTime} />
      )}
    </>
  );
};

export default OurFriendsPage;
