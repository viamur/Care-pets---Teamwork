import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageUploading from 'react-images-uploading';
import { getAllUserInfo } from '../../redux/user/userSelectrors';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import s from './UserInfoBlock.module.scss';
import { pathInfoUser } from 'redux/user/userOperations';

const UserInfoBlock = () => {
  /* Селекторы */
  const userInfo = useSelector(getAllUserInfo);

  /* UseState */
  const [photo, setPhoto] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  /* Это для загрузки файла */
  const [selectedFile, setSelectedFile] = useState();

  const dispatch = useDispatch();
  const listRef = useRef();

  /* Возможно тут можно обрабатывать ошибки типо нотификашку высвечивать */
  useEffect(() => {
    if (userInfo.error) {
      Notify.failure(userInfo.error);
    }
  }, [userInfo.error]);

  /* Записуем в стейт данные при загрузки страницы из селектора */
  useEffect(() => {
    setPhoto(userInfo.avatarURL);
    setEmail(userInfo.email);
    setName(userInfo.name);
    setCity(userInfo.city);
    setPhone(userInfo.phone);
    setBirthday(userInfo.birthday);
  }, [userInfo]);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      //   setPreview(undefined);
      return;
    }

    /* Создаем FormData и добовляем туда наш файл и отпарвляем */
    const bodyFormData = new FormData();
    bodyFormData.append('avatar', selectedFile);
    dispatch(pathInfoUser(bodyFormData));

    /* Создаем виртуальную ссылку на загруженный файл */
    const objectUrl = URL.createObjectURL(selectedFile);
    setPhoto(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  /* При клике на кнопку меняем disabled class отправлем на бек форму */
  const handleClick = e => {
    const btn = e.target;
    const listChildren = Object.values(listRef.current.children);

    listChildren.forEach(li => {
      const input = li.children['1'];
      if (input.name === btn.name) {
        if (input.disabled) {
          /* Меняем инпут дизейблид */
          input.disabled = false;
          /* Меняем класс кнопки */
          btn.className = 'galochka';
          return;
        }
        if (!input.disabled) {
          if (btn.name === 'name') {
            if (name.length < 2) {
              return Notify.failure('min length "name" 2');
            }
            if (name.length > 10) {
              return Notify.failure('max length "name" 10');
            }
          }
          if (btn.name === 'email') {
            if (email.length < 6) {
              return Notify.failure('min length "email" 6');
            }
            if (email.length > 25) {
              return Notify.failure('max length "email" 25');
            }
            /* REGEX надо провалидировать */
          }
          if (btn.name === 'birthday') {
            /* Надо придумать валидацию */
          }
          if (btn.name === 'phone') {
            if (phone.length !== 13) {
              return Notify.failure('length "phone" 13');
            }
            /* REGEX надо провалидировать */
          }
          if (btn.name === 'city') {
            /* REGEX надо провалидировать */
          }
          /* Отправка формы */
          dispatch(pathInfoUser({ email, name, city, phone, birthday }));

          /* Меняем класс кнопки */
          btn.className = 'pencil';
          /* Меняем инпут дизейблид */
          input.disabled = true;
          return;
        }
      }
    });
  };

  /* Для выбора файла  */
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
      <img src={photo} alt="avatar" width={200} height={200} />
      <input type="file" name="avatar" accept=".png, .jpg, .jpeg" onChange={onSelectFile} />
      <ul ref={listRef}>
        <li>
          <p>Name:</p>
          <input
            type="text"
            name="name"
            disabled={true}
            onChange={e => setName(e.target.value)}
            value={name}
          />
          <button type="button" name="name" className={'pencil'} onClick={handleClick}>
            change
          </button>
        </li>
        <li>
          <p>Email:</p>
          <input
            type="text"
            name="email"
            disabled={true}
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
            disabled={true}
            onChange={e => setBirthday(e.target.value)}
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
            disabled={true}
            onChange={e => setPhone(e.target.value)}
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
            disabled={true}
            onChange={e => setCity(e.target.value)}
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
