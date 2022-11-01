import s from './OurFriendsPage.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';

axios.defaults.baseURL = 'http://localhost:3005/';

const OurFriendsPage = () => {
  const [friends, setFriends] = useState([]);

  const fetchQueryPhotos = () => {
    return axios.get('friends').then(response => response.data.data);
  };

  useEffect(() => {
    fetchQueryPhotos()
      .then(data => {
        setFriends(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <h1 className={s.mainTitle}>Our friend</h1>
      <ul className={s.list}>
        {friends.map(friend => (
          <li key={friend._id} className={s.card}>
            <h2 className={s.cardTitle}>{friend.title}</h2>
            <div className={s.iconDescriptionWrapper}>
              <img
                src={`https://pet-support.herokuapp.com/${friend.icon}`}
                className={s.icon}
                alt="Our Friend Icon"
              />
              <ul className={s.discriptionList}>
                <li className={s.discriptionEl}>
                  <div className={s.projectProduct}>
                    <p className={s.discription}>Time:</p>
                    <p className={s.discription}>{friend.time}</p>
                    <div className={s.projectOverlay}>
                      <p>MN {friend.time}</p>
                      <p>TU {friend.time}</p>
                      <p>WE {friend.time}</p>
                      <p>TH {friend.time}</p>
                      <p>FR {friend.time}</p>
                      <p>SA {friend.time}</p>
                      <p>SU {friend.time}</p>
                    </div>
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
    </>
  );
};

export default OurFriendsPage;
