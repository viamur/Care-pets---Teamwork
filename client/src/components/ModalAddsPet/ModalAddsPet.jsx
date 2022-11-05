import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFormik } from 'formik';
import { showAlertMessage } from '../../utils/showMessages';
import * as Yup from 'yup';
import { addPet } from '../../utils/api';
import sprite from '../../images/icons/sprite.svg';
import s from './ModalAddsPet.module.scss';

const modalContainer = document.getElementById('modal-root');

const ModalAddsPet = ({ setShowModal }) => {
  const [page, setPage] = useState(1);

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

  const onPageChange = () => {
    if (page === 1) {
      setPage(2);
      return;
    }
    setPage(1);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      birthday: '',
      breed: '',
      comments: '',
    },

    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Field must include more tnan 2 characters')
        .max(16, 'Field must be less tnan 16 characters')
        .required('This is a required field'),
      birthday: Yup.date()
        .max(new Date(), 'Choose date in the past')
        .required('This is a required field'),
      breed: Yup.string()
        .min(2, 'Field must include more tnan 2 characters')
        .max(24, 'Field must be less tnan 24 characters')
        .required('This is a required field'),
      comments: Yup.string()
        .min(8, 'Field must include more tnan 8 characters')
        .max(120, 'Field must be less tnan 120 characters'),
    }),
  });

  const { name, birthday, breed, comments } = formik.values;
  const {
    name: nameError,
    birthday: birthdayError,
    breed: breedError,
    comments: commentsError,
  } = formik.errors;

  const onFormSubmit = e => {
    e.preventDefault();

    const arrayOfData = Object.entries({ name, birthday, breed, comments });
    const filteredArray = arrayOfData.filter(item => item[1]);
    const info = filteredArray.reduce((previousValue, feature) => {
      return { ...previousValue, [feature[0]]: feature[1] };
    }, {});

    addPet(info)
      .then(data => {
        setShowModal(false);
      })
      .catch(error => showAlertMessage(error.response.data.message));
  };

  return createPortal(
    <div className={s.backdrop} onClick={onBackdropClick}>
      <div className={`${s.modal} ${page === 2 && s.modalSecondPage}`}>
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
        <form onSubmit={onFormSubmit}>
          {page === 1 && (
            <>
              <h2 className={s.title}>Add pet</h2>
              <label forhtml="name" className={s.label}>
                Name pet
              </label>
              <input
                className={s.input}
                type="text"
                name="name"
                id="name"
                placeholder="Type name pet"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={name}
              />
              <p className={s.error}>
                {formik.touched.name && nameError && nameError}
              </p>
              <label forhtml="birthday" className={s.label}>
                Date of birth
              </label>
              <input
                lang="en"
                className={s.input}
                type="date"
                name="birthday"
                id="birthday"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={birthday}
              />
              <p className={s.error}>
                {formik.touched.birthday && birthdayError && birthdayError}
              </p>
              <label forhtml="breed" className={s.label}>
                Breed
              </label>
              <input
                className={s.input}
                type="text"
                name="breed"
                id="breed"
                placeholder="Type breed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={breed}
              />
              <p className={s['error--last']}>
                {formik.touched.breed && breedError && breedError}
              </p>
              <div className={s.blockOfButtons}>
                <button
                  className={`${s.button} ${s.buttonDistance}`}
                  type="button"
                  onClick={onBtnCloseClick}
                >
                  Cancel
                </button>
                <button
                  className={s.button}
                  type="button"
                  onClick={onPageChange}
                  disabled={
                    name === '' ||
                    birthday === '' ||
                    breed === '' ||
                    nameError ||
                    birthdayError ||
                    breedError
                      ? true
                      : false
                  }
                >
                  Next
                </button>
              </div>
            </>
          )}
          {page === 2 && (
            <>
              <h2 className={s.titleSecondPage}>Add pet</h2>
              <p className={s.descr}>Add photo and some comments</p>
              {/* <input
                className={s.inputLoad}
                type="file"
                name="imgURL"
                // enctype="multipart/form-data"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={imgURL}
              /> */}
              <label forhtml="comments" className={s.label}>
                Comments
              </label>
              <textarea
                className={s.textarea}
                name="comments"
                id="comments"
                placeholder="Type comments"
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
                  Back
                </button>
                <button
                  className={s.button}
                  type="submit"
                  disabled={commentsError ? true : false}
                >
                  Done
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>,
    modalContainer
  );
};

export default ModalAddsPet;
