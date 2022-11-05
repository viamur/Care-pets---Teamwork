import s from './PetsList.module.scss';
import PetElement from './PetElement';

const PetsList = props => {
  let createPetEl = props.petsStore.map((pet, index) => {
    return <PetElement {...pet} key={index} deletePet={props.deletePet} />;
  });

  return (
    <>
      <ul className={s.list}>
        <li>
          <div className={s.petsBlock}>{createPetEl}</div>
        </li>
      </ul>
    </>
  );
};

export default PetsList;
