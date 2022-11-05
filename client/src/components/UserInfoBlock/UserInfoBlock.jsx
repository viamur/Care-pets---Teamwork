import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserName,
  getUserEmail,
  getUserBirthday,
  getUserPhone,
  getUserCity,
  getUserAvatar,
} from '../../redux/user/userSelectrors';

import s from './UserInfoBlock.module.scss';

const UserInfoBlock = () => {
  /* Селекторы */
  const avatarSelector = useSelector(getUserAvatar);
  const emailSelector = useSelector(getUserEmail);
  const nameSelector = useSelector(getUserName);
  const citySelector = useSelector(getUserCity);
  const phoneSelector = useSelector(getUserPhone);
  const birthdaySelector = useSelector(getUserBirthday);

  /* UseState */
  const [photo, setPhoto] = useState(avatarSelector);
  const [email, setEmail] = useState(emailSelector);
  const [name, setName] = useState(nameSelector);
  const [city, setCity] = useState(citySelector);
  const [phone, setPhone] = useState(phoneSelector);
  const [birthday, setBirthday] = useState(birthdaySelector);

  const dispatch = useDispatch();

  /* Записуем в стейт данные с селекторов */
  //   useEffect(() => {
  //     setPhoto()
  //     setEmail()
  //     setName(nameSelector);
  //       setCity()
  //       setPhone()
  //       setBirthday()
  //   }, []);

  const handleClick = e => {
    console.log('name', name);
  };
  return (
    <>
      <img src={`https://pet-support.herokuapp.com/${photo}`} alt="avatar" />
      <button type="file" name="avatar">
        Edit photo
      </button>
      <ul>
        <li>
          <p>Name:</p>
          <input type="text" name="name" onChange={e => setName(e.target.value)} value={name} />
          <button type="button" name="name" onClick={handleClick}>
            change
          </button>
        </li>
        <li>
          <p>Email:</p>
          <input type="text" name="email" onChange={e => setEmail(e.target.value)} value={email} />
          <button type="button" name="email" onClick={handleClick}>
            change
          </button>
        </li>
        <li>
          <p>Birthday:</p>
          <input
            type="text"
            name="birthday"
            onChange={e => setName(e.target.value)}
            value={birthday}
          />
          <button type="button" name="birthday" onClick={handleClick}>
            change
          </button>
        </li>
        <li>
          <p>Phone:</p>
          <input type="text" name="phone" onChange={e => setName(e.target.value)} value={phone} />
          <button type="button" name="phone" onClick={handleClick}>
            change
          </button>
        </li>
        <li>
          <p>City:</p>
          <input type="text" name="city" onChange={e => setName(e.target.value)} value={city} />
          <button type="button" name="city" onClick={handleClick}>
            change
          </button>
        </li>
      </ul>
    </>
  );
};

export default UserInfoBlock;
