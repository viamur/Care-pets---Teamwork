import { useState } from 'react';
import ModalAddsPet from '..//ModalAddsPet/ModalAddsPet';
import PetsList from 'components/PetsList/PetsList';
import sprite from '../../images/icons/sprite.svg';
import s from './PetsData.module.scss';

const PetsData = props => {
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
            <h3 className={s.addPettTitle}>Add pet</h3>
            <button onClick={onBtnAddPetClick} className={s.buttonToModal}>
              <svg width="24" height="24">
                <use href={sprite + '#addPet-icon'} />
              </svg>
            </button>
          </div>
        </div>
        {showModal && <ModalAddsPet setShowModal={setShowModal} />}
        <PetsList deletePet={props.deletePet} petsStore={props.petsStore} />
      </div>
    </>
  );
};

export default PetsData;
