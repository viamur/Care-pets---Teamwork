import { useEffect, useState } from 'react';
import ModalAddsPet from 'components/ModalAddsPet/ModalAddsPet';
import PetsList from 'components/PetsList/PetsList';
import s from './PetsData.module.scss';

const PetsData = () => {
    const [modal, setModal] = useState(false);
    
      const funcModal = (modal = false) => {
    setModal(modal);
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className={s.headerPetsData}>
        <h2 className={s.title}>My pets:</h2>
        <div className={s.addPetWrapper}>
          <h3 className={s.addPettTitle}>Add pet:</h3>
          <button
            type="button"
            className={s.buttonToModal}
            onClick={() => setModal(true)}
          >
            +
          </button>
        </div>
      </div>
      {modal && <ModalAddsPet modal={modal} setModal={funcModal}/>}
      <PetsList />
    </>
  );
};

export default PetsData;
