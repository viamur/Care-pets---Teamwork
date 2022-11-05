import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageUploading from 'react-images-uploading';
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

  /* Это для загрузки файла */
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const dispatch = useDispatch();

  const handleClick = e => {
    console.log('name', name);
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };
  return (
    <>
      <h2 className={s.infoTitle}>My information</h2>
      <img src={`https://pet-support.herokuapp.com/${photo}`} alt="avatar" />
      <input type="file" name="avatar" onChange={onSelectFile} />
      {selectedFile && <img src={preview} />}
      <ul>
        <li>
          <p>Name:</p>
          <input
            type="text"
            name="name"
            onChange={e => setName(e.target.value)}
            value={name}
          />
          <button type="button" name="name" onClick={handleClick}>
            change
          </button>
        </li>
        <li>
          <p>Email:</p>
          <input
            type="text"
            name="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
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
          <input
            type="text"
            name="phone"
            onChange={e => setName(e.target.value)}
            value={phone}
          />
          <button type="button" name="phone" onClick={handleClick}>
            change
          </button>
        </li>
        <li>
          <p>City:</p>
          <input
            type="text"
            name="city"
            onChange={e => setName(e.target.value)}
            value={city}
          />
          <button type="button" name="city" onClick={handleClick}>
            change
          </button>
        </li>
      </ul>
    </>
  );
};

export default UserInfoBlock;
