import s from './PetsList.module.scss';
import photoPet from '../../images/testNotice.jpg';

const PetsList = ({ deletePet, petsStore }) => {
  const btnDeletePet = () => {
    deletePet(petsStore.id);
  };

  return (
    <>
      <ul className={s.list}>
        {petsStore.map(pet => (
          <li key={pet.id} className={s.card}>
            <img src={photoPet} alt="Pet Foto" className={s.petFoto} />
            <div className={s.cardDiscription}>
              <button
                type="button"
                onClick={() => {
                  deletePet(pet.id);
                }}
                className={s.btnDelete}
              >
                <svg
                  className={s.iconDelete}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                >
                  <path d="M10.5 4.5h3a1.5 1.5 0 1 0-3 0ZM9 4.5a3 3 0 1 1 6 0h6A.75.75 0 1 1 21 6h-.846l-1.808 13.257a3.75 3.75 0 0 1-3.715 3.243H9.369a3.75 3.75 0 0 1-3.715-3.243L3.846 6H3a.75.75 0 0 1 0-1.5h6Zm1.5 5.25a.75.75 0 1 0-1.5 0v7.5a.75.75 0 1 0 1.5 0v-7.5ZM14.25 9a.75.75 0 0 0-.75.75v7.5a.75.75 0 1 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75Z" />
                </svg>
              </button>
              <p className={s.categoryDiscription}>Name: {pet.name}</p>
              <p className={s.categoryDiscription}>
                Date of birth: {pet.dateBidthday}
              </p>
              <p className={s.categoryDiscription}>Breed: {pet.breed}</p>
              <p className={s.categoryDiscription}>Comments:{pet.comments}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PetsList;
