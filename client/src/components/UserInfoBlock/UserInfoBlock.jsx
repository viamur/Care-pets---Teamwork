import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-date-picker';
import { useTranslation } from 'react-i18next';
import { getAllUserInfo } from '../../redux/user/userSelectrors';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { pathInfoUser } from 'redux/user/userOperations';
import Logout from '../Logout/Logout';

import s from './UserInfoBlock.module.scss';
import sprite from '../../images/icons/sprite.svg';

/* ----------REGEX--------------- */
const emailRegex = /^[\w-.]+@[a-zA-Z^\s@]+\.[a-zA-Z^\s@]+$/;
const phoneRegex = /^\+380\d{9}/;
const cityRegex =
  /^(?=.*[a-zа-я])(?=.*[A-ZА-Я]).{3,32},(?=.*[a-zа-я])(?=.*[A-ZА-Я]).{3,32}$/;

const UserInfoBlock = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  /* Селекторы */
  const userInfo = useSelector(getAllUserInfo);

  /* UseState */
  const [isDisabled, setIsDisabled] = useState(true);
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
    setBirthday(userInfo.birthday && new Date(userInfo.birthday));
  }, [userInfo]);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      //   setPreview(undefined);
      return;
    }

    /* Создаем виртуальную ссылку на загруженный файл */
    const objectUrl = URL.createObjectURL(selectedFile);
    setPhoto(objectUrl);

    /* Создаем FormData и добовляем туда наш файл и отпарвляем */
    const bodyFormData = new FormData();
    bodyFormData.append('avatar', selectedFile);
    dispatch(pathInfoUser(bodyFormData));

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, dispatch]);

  const datepickerClick = event => {
    if (isDisabled) {
      setIsDisabled(false);
      event.target.className = 'galochka';
      return;
    }
    event.target.className = 'pencil';
    setIsDisabled(true);
    dispatch(pathInfoUser({ birthday }));
  };

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
              return Notify.failure(t('validation.nameMin'));
            }
            if (name.length > 10) {
              return Notify.failure(t('validation.nameMax'));
            }
            dispatch(pathInfoUser({ name }));
          }
          if (btn.name === 'email') {
            if (email.length < 6) {
              return Notify.failure(t('validation.emailMin'));
            }
            if (email.length > 25) {
              return Notify.failure(t('validation.emailMax'));
            }
            if (!emailRegex.exec(email)) {
              /* REGEX надо провалидировать */
              return Notify.failure(t('validation.email'));
            }
            dispatch(pathInfoUser({ email }));
          }
          if (btn.name === 'phone') {
            if (phone.length !== 13) {
              return Notify.failure(t('validation.phoneLength'));
            }
            if (!phoneRegex.exec(phone)) {
              /* REGEX надо провалидировать */
              return Notify.failure(t('validation.phone'));
            }
            dispatch(pathInfoUser({ phone }));
          }
          if (btn.name === 'city') {
            if (!cityRegex.exec(city)) {
              /* REGEX надо провалидировать */
              return Notify.failure(t('validation.cityRegion'));
            }
            dispatch(pathInfoUser({ city }));
          }

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
      // setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <h2 className={s.title}>{t('userPage.infoBlock.title')}:</h2>
      <div className={s.infoWrapper}>
        <div className={s.avatarWrapper}>
          <img
            src={photo}
            alt="avatar"
            width={200}
            height={200}
            className={s.avatar}
          />
          <label className={s.avatarInputFile}>
            <svg className={s.iconInputFile}>
              <use href={sprite + '#camera-icon'} />
            </svg>
            {t('userPage.infoBlock.photo')}
            <input
              type="file"
              name="avatar"
              accept=".png, .jpg, .jpeg"
              onChange={onSelectFile}
              className={s.avatarInput}
              placeholder="Edit photo"
            />
          </label>
        </div>
        <ul ref={listRef} className={s.list}>
          <li className={language === 'ua' ? s.itemUA : s.itemUS}>
            <p className={s.item__title}>{t('userPage.infoBlock.name')}:</p>
            <input
              type="text"
              name="name"
              disabled={true}
              onChange={e => setName(e.target.value)}
              value={name}
              className={s.item__input}
            />
            <button
              type="button"
              name="name"
              className={'pencil'}
              onClick={handleClick}
            ></button>
          </li>
          <li className={language === 'ua' ? s.itemUA : s.itemUS}>
            <p className={s.item__title}>{t('userPage.infoBlock.email')}:</p>
            <input
              type="text"
              name="email"
              disabled={true}
              onChange={e => setEmail(e.target.value.trim())}
              value={email}
              className={s.item__input}
            />
            <button
              type="button"
              name="email"
              className={'pencil'}
              onClick={handleClick}
            ></button>
          </li>
          <li className={language === 'ua' ? s.itemUA : s.itemUS}>
            <p className={s.item__title}>{t('userPage.infoBlock.birthday')}:</p>
            <DatePicker
              clearIcon={null}
              calendarIcon={null}
              format="dd.MM.yyyy"
              className={
                isDisabled ? s.itemDatepicker__disabled : s.item__input
              }
              disabled={isDisabled}
              selected={birthday}
              maxDate={new Date()}
              yearPlaceholder="yyyy"
              monthPlaceholder="mm"
              dayPlaceholder="dd"
              name="birthday"
              value={birthday}
              onChange={value => {
                if (!value) {
                  return;
                }
                setBirthday(new Date(Date.parse(value)));
              }}
            />
            <button
              type="button"
              name="birthday"
              className="pencil"
              onClick={datepickerClick}
            ></button>
          </li>
          <li className={language === 'ua' ? s.itemUA : s.itemUS}>
            <p className={s.item__title}>{t('userPage.infoBlock.phone')}:</p>
            <input
              type="text"
              name="phone"
              disabled={true}
              onChange={e => setPhone(e.target.value.trim())}
              value={phone}
              className={s.item__input}
            />
            <button
              type="button"
              name="phone"
              className={'pencil'}
              onClick={handleClick}
            ></button>
          </li>
          <li className={language === 'ua' ? s.itemUA : s.itemUS}>
            <p className={s.item__title}>{t('userPage.infoBlock.city')}:</p>
            <input
              type="text"
              name="city"
              disabled={true}
              onChange={e => setCity(e.target.value)}
              value={city}
              className={s.item__input}
            />
            <button
              type="button"
              name="city"
              className={'pencil'}
              onClick={handleClick}
            ></button>
          </li>
        </ul>
        <Logout />
      </div>
    </>
  );
};

export default UserInfoBlock;
