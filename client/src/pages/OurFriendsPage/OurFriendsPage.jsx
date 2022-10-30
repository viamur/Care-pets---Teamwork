import s from './OurFriendsPage.module.scss';
import axios from 'axios';

import { useEffect, useState } from 'react';

axios.defaults.baseURL = 'http://localhost:3005/';

// import { fetchQueryPhotos } from '../api/pixabay-api';
// import ImageGallery from './ImageGallery/ImageGallery';
// import Searchbar from './Searchbar/Searchbar';
// import Button from './Button/Button';
// import Modal from './Modal/Modal';
// import { Bars } from 'react-loader-spinner';

const OurFriendsPage = () => {
  const [friends, setFriends] = useState([]);

  const fetchQueryPhotos = () => {
  return axios
    .get('friends')
    .then(response => response.data);
};

  // const handleFormSubmit = query => {
  //   setQuery(query);
  //   setPage(1);
  // };

  // const updatePage = () => {
  //   setPage(page => page + 1);
  // };

  // const funcModalFoto = (modalFoto = null) => {
  //   setModalFoto(modalFoto);
  // };

  useEffect(() => {
    // setLoading(true);
    fetchQueryPhotos()
      .then((data) => {
        setFriends(data);
      })
      .catch(err => console.log(err))
      // .finally(() => setLoading(false));
  }, []);

  console.log(friends);
  return <>
    <h1 className={s.mainTitle}>Our friend</h1>
      <ul className={s.list}>
    {friends.map(friend => (
      <li key={friend._id} className={s.card}>
        <p className={s.cardTitle}>{friend.title}</p>
        <img src={friend.icon} className={s.icon} alt="" width="158" height="112" />
        <div className={s.discriptionWrapper}> 
        <p className={s.discription}>Time: {friend.time}</p>
        <p className={s.discription}>Adress:{friend.adress}</p>
        <p className={s.discription}>Email: {friend.email}</p>
          <p className={s.discription}>Phone: {friend.phone}</p>
          </div>
    </li>
    ))}
  </ul>
  </>;
};

export default OurFriendsPage;
