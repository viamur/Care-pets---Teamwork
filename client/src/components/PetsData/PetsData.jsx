import { useState } from 'react';
import ModalAddsPet from '..//ModalAddsPet/ModalAddsPet';
import s from './PetsData.module.scss';
import PetsList from 'components/PetsList/PetsList';

const PetsData = (props) => {
  const [showModal, setShowModal] = useState(false);

  const onBtnAddPetClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className={s.mainWrapper}>
        <div className={s.headerPetsData}>
          <h2 className={s.title}>My pets:</h2>
          <div className={s.addPetWrapper}>
            <h3 className={s.addPettTitle}>Add pet:</h3>
            <button onClick={onBtnAddPetClick} className={s.buttonToModal}>
              +
            </button>
          </div>
        </div>
        {showModal && <ModalAddsPet setShowModal={setShowModal} />}
        <PetsList deletePet={props.deletePet} petsStore={props.petsStore}/>
      </div>
    </>
  );
};

export default PetsData;
