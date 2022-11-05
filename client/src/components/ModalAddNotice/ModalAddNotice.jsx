import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import sprite from '../../images/icons/sprite.svg';
import s from './ModalAddNotice.module.scss';

const portalModal = document.querySelector('#modal-root');

const ModalAddNotice = ({ setShowModal }) => {
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

  const formik = useFormik({
    initialValues: {
      title: '',
      name: '',
      date: '',
      breed: '',
    },

    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .min(2, 'Field must include more tnan 2 characters')
        .max(48, 'Field must include less tnan 48 characters')
        .required('This is a required field'),
      name: Yup.string()
        .min(2, 'Field must include more tnan 2 characters')
        .max(16, 'Field must be less tnan 16 characters'),
      date: Yup.date(),
      breed: Yup.string()
        .min(2, 'Field must include more tnan 2 characters')
        .max(24, 'Field must be less tnan 24 characters'),
    }),
  });

  const { title, name, date, breed } = formik.values;

  const {
    title: titleError,
    name: nameError,
    date: dateError,
    breed: breedError,
  } = formik.errors;

  const onPageChange = () => {
    if (page === 1) {
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
        <h2 className={s.title}>Add pet</h2>
        {page === 1 && (
          <p className={s.descr}>
            Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet,
            consectetur
          </p>
        )}
        <form>
          {page === 1 && (
            <>
              <label forHtml="title" className={s.label}>
                Tittle of ad<span className={s.accent}>*</span>
              </label>
              <input
                className={s.input}
                type="text"
                name="title"
                id="title"
                placeholder="Type name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={title}
              />
              <p className={s.error}>
                {formik.touched.title && titleError && titleError}
              </p>
              <label forHtml="name" className={s.label}>
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
              <label forHtml="date" className={s.label}>
                Date of birth
              </label>
              <input
                className={s.input}
                type="date"
                name="date"
                id="date"
                placeholder="Type date of birth"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={date}
              />
              <p className={s.error}>
                {formik.touched.date && dateError && dateError}
              </p>
              <label forHtml="breed" className={s.label}>
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
                >
                  Next
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>,
    portalModal
  );
};

export default ModalAddNotice;
