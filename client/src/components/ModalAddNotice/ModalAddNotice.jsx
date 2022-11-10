import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-date-picker';
import { useParams } from 'react-router-dom';
import { showAlertMessage } from '../../utils/showMessages';
import { addNotice, fetchOwnAds } from '../../utils/api';
import imgLoad from '../../images/modals/loadMobile.png';
import Loader from '../../components/Loader/Loader';
import sprite from '../../images/icons/sprite.svg';
import { useTranslation } from 'react-i18next';
import s from './ModalAddNotice.module.scss';

const portalModal = document.querySelector('#modal-root');

const ModalAddNotice = ({ setShowModal, array, setArray }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [photo, setPhoto] = useState('');
  const { categoryName } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') setShowModal(false);
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) setShowModal(false);
  };

  const onBtnCloseClick = () => {
    setShowModal(false);
  };

  const formik = useFormik({
    initialValues: {
      category: 'sell',
      title: '',
      name: '',
      birthdate: '',
      breed: '',
      sex: 'male',
      location: '',
      price: '',
      comments: '',
      notices: '',
    },

    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },

    validationSchema: Yup.object({
      category: Yup.string().required(t('validation.required')),
      title: Yup.string()
        .min(2, t('validation.min'))
        .max(48, t('validation.titleMax'))
        .required(t('validation.required')),
      name: Yup.string()
        .min(2, t('validation.min'))
        .max(16, t('validation.namePetMax')),
      breed: Yup.string()
        .min(2, t('validation.min'))
        .max(24, t('validation.max')),
      sex: Yup.string().required(t('validation.required')),
      location: Yup.string()
        .min(2, t('validation.min'))
        .max(24, t('validation.max'))
        .required(t('validation.required')),
      price: Yup.number()
        .typeError(t('validation.priceNum'))
        .integer(t('validation.priceInt'))
        .required(t('validation.required')),
      comments: Yup.string()
        .min(8, t('validation.commentsMin'))
        .max(120, t('validation.commentsMax')),
    }),
  });

  const {
    category,
    title,
    name,
    birthdate,
    breed,
    sex,
    location,
    price,
    comments,
    notices,
  } = formik.values;

  const {
    title: titleError,
    name: nameError,
    breed: breedError,
    location: locationError,
    price: priceError,
    comments: commentsError,
  } = formik.errors;

  useEffect(() => {
    if (!notices) {
      return;
    }

    /* Создаем виртуальную ссылку на загруженный файл */
    const objectUrl = URL.createObjectURL(notices);
    setPhoto(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [notices]);

  const onFormSubmit = async e => {
    e.preventDefault();

    if (location === '' || (category === 'sell' && price === '')) {
      showAlertMessage(t('errors.allFields'));
      return;
    }
    if (locationError || commentsError || (category === 'sell' && priceError)) {
      showAlertMessage(t('errors.allFieldsFormat'));
      return;
    }
    setIsLoading(true);
    const transformedPrice = category === 'sell' ? Number(price) : '';

    const arrayOfData = Object.entries({
      category,
      title,
      name,
      birthdate,
      breed,
      sex,
      location,
      price: transformedPrice,
      comments,
      notices,
    });
    const filteredArray = arrayOfData.filter(item => item[1]);
    const info = filteredArray.reduce((previousValue, feature) => {
      return { ...previousValue, [feature[0]]: feature[1] };
    }, {});

    try {
      await addNotice(info);
      if (categoryName !== 'own') {
        setShowModal(false);
        navigate('/notices/own');
        return;
      }
      const response = await fetchOwnAds();
      setShowModal(false);
      setArray(response);
    } catch (error) {
      showAlertMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onPageChange = () => {
    if (page === 1) {
      if (title === '') {
        showAlertMessage(t('errors.allFields'));
        return;
      }

      if (titleError || nameError || breedError) {
        showAlertMessage(t('errors.allFieldsFormat'));
        return;
      }
      setPage(2);
      return;
    }
    setPage(1);
  };

  return createPortal(
    <div className={s.backdrop} onClick={onBackdropClick}>
      <div className={s.modal}>
        <button type="button" className={s.btnClose} onClick={onBtnCloseClick}>
          <svg
            className={s.iconClose}
            aria-label="Close modal"
            width="16"
            height="16"
          >
            <use href={sprite + '#close-icon'} />
          </svg>
        </button>
        <h2 className={s.title}> {t('noticesPage.addNotice.title')}</h2>
        {page === 1 && (
          <p className={s.descr}>{t('noticesPage.addNotice.descr')}</p>
        )}
        <form onSubmit={onFormSubmit}>
          {page === 1 && (
            <>
              <div className={s.radioToolbar}>
                <label
                  className={
                    category === 'lostFound'
                      ? s.activeCategory
                      : s.notActiveCategory
                  }
                >
                  {t('noticesPage.categories.lostFound')}
                  <input
                    type="radio"
                    id="radio1"
                    name="category"
                    value="lostFound"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
                <label
                  className={
                    category === 'inGoodHands'
                      ? s.activeCategory
                      : s.notActiveCategory
                  }
                >
                  {t('noticesPage.categories.inGoodHands')}
                  <input
                    type="radio"
                    id="radio2"
                    name="category"
                    value="inGoodHands"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
                <label
                  className={
                    category === 'sell' ? s.activeCategory : s.notActiveCategory
                  }
                >
                  {t('noticesPage.categories.sell')}
                  <input
                    type="radio"
                    id="radio3"
                    name="category"
                    value="sell"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
              </div>
              <label forhtml="title" className={s.label}>
                {t('noticesPage.addNotice.titleAd')}
                <span className={s.accent}>*</span>
              </label>
              <input
                className={s.input}
                type="text"
                name="title"
                id="title"
                placeholder={t('noticesPage.addNotice.placeholders.titleAd')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={title}
              />
              <p className={s.error}>
                {formik.touched.title && titleError && titleError}
              </p>
              <label forhtml="name" className={s.label}>
                {t('noticesPage.addNotice.name')}
              </label>
              <input
                className={s.input}
                type="text"
                name="name"
                id="name"
                placeholder={t('noticesPage.addNotice.placeholders.name')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={name}
              />
              <p className={s.error}>
                {formik.touched.name && nameError && nameError}
              </p>
              <label forhtml="birthdate" className={s.label}>
                {t('noticesPage.addNotice.date')}
              </label>
              <DatePicker
                clearIcon={null}
                calendarIcon={
                  <svg width={20} height={20}>
                    <use href={sprite + '#icon-calendar'} />
                  </svg>
                }
                format="dd.MM.yyyy"
                className={s.input}
                dateFormat="dd.MM.yyyy"
                selected={birthdate}
                maxDate={new Date()}
                yearPlaceholder={t('noticesPage.addNotice.placeholders.years')}
                monthPlaceholder={t(
                  'noticesPage.addNotice.placeholders.months'
                )}
                dayPlaceholder={t('noticesPage.addNotice.placeholders.days')}
                id="birthdate"
                name="birthdate"
                value={birthdate}
                onChange={value => {
                  if (!value) {
                    return;
                  }
                  formik.setFieldValue(
                    'birthdate',
                    new Date(Date.parse(value))
                  );
                }}
              />
              <p className={s.error}></p>
              <label forhtml="breed" className={s.label}>
                {t('noticesPage.addNotice.breed')}
              </label>
              <input
                className={s.input}
                type="text"
                name="breed"
                id="breed"
                placeholder={t('noticesPage.addNotice.placeholders.breed')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={breed}
              />
              <p className={s['error--last']}>
                {formik.touched.breed && breedError && breedError}
              </p>
              <div className={s.blockOfButtons}>
                <button
                  className={s.button}
                  type="button"
                  onClick={onBtnCloseClick}
                >
                  {t('noticesPage.buttons.cancel')}
                </button>
                <button
                  className={s.button}
                  type="button"
                  onClick={onPageChange}
                >
                  {t('noticesPage.buttons.next')}
                </button>
              </div>
            </>
          )}
          {page === 2 && (
            <>
              <div className={s.radioToolbarPage2}>
                <p className={`${s.label} ${s.labelDistance}`}>
                  {t('noticesPage.addNotice.sex.title')}
                  <span className={s.accent}>*</span>:
                </p>
                <div className={s.blockOfRadio}>
                  <label className={`${s.sexLabel} ${s.labelMale}`}>
                    <input
                      type="radio"
                      name="sex"
                      value="male"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span
                      className={`${s.sexDescr} ${
                        sex === 'male' ? s.active : s.notActive
                      }`}
                    >
                      {t('noticesPage.addNotice.sex.male')}
                    </span>
                  </label>
                  <label className={`${s.sexLabel} ${s.labelFemale}`}>
                    <input
                      type="radio"
                      name="sex"
                      value="female"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span
                      className={`${s.sexDescr} ${
                        sex === 'female' ? s.active : s.notActive
                      }`}
                    >
                      {t('noticesPage.addNotice.sex.female')}
                    </span>
                  </label>
                </div>
              </div>
              <label forhtml="location" className={s.label}>
                {t('noticesPage.addNotice.location')}
                <span className={s.accent}>*</span>:
              </label>
              <input
                className={s.input}
                type="text"
                name="location"
                id="location"
                placeholder={t('noticesPage.addNotice.placeholders.location')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={location}
              />
              <p className={s.error}>
                {formik.touched.location && locationError && locationError}
              </p>
              <div className={s.loadImgGroup}>
                <p className={s.titleLoad}>
                  {' '}
                  {t('noticesPage.addNotice.load')}
                </p>
                <label forhtml="file" className={s.labelLoad}>
                  {!photo && (
                    <img src={imgLoad} alt="add_photo" width="71" height="71" />
                  )}
                  {photo && (
                    <div className={s.thumbLoadImg}>
                      <img
                        src={photo}
                        alt="pet_photo"
                        className={s.loadImage}
                      />
                    </div>
                  )}
                  <input
                    id="file"
                    name="notices"
                    type="file"
                    onChange={event => {
                      formik.setFieldValue(
                        'notices',
                        event.currentTarget.files[0]
                      );
                    }}
                    className={s.inputLoad}
                  />
                </label>
              </div>
              {category === 'sell' && (
                <>
                  <label forhtml="price" className={s.label}>
                    {t('noticesPage.addNotice.price')}
                    <span className={s.accent}>*</span>:
                  </label>
                  <input
                    className={s.input}
                    type="text"
                    name="price"
                    id="price"
                    placeholder={t('noticesPage.addNotice.placeholders.price')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={price}
                  />
                  <p className={s.error}>
                    {formik.touched.price && priceError && priceError}
                  </p>
                </>
              )}
              <label forhtml="comments" className={s.label}>
                {t('noticesPage.addNotice.comments')}
              </label>
              <textarea
                className={s.textarea}
                name="comments"
                id="comments"
                placeholder={t('noticesPage.addNotice.placeholders.comments')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={comments}
              ></textarea>
              <p className={s['error--last']}>
                {formik.touched.comments && commentsError && commentsError}
              </p>
              <div className={s.blockOfButtons}>
                <button
                  className={`${s.button} ${s.buttonDistance}`}
                  type="button"
                  onClick={onPageChange}
                >
                  {t('noticesPage.buttons.back')}
                </button>
                <button
                  className={isLoading ? s.disabled : s.button}
                  type="submit"
                  disabled={isLoading ? true : false}
                >
                  {t('noticesPage.buttons.done')}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
      {isLoading && (
        <div className={s.loader}>
          <Loader />
        </div>
      )}
    </div>,
    portalModal
  );
};

export default ModalAddNotice;
