import style from './PetsData.module.scss'

import photoPet from '../../images/testNotice.jpg'
import deleteIco from '../../images/icons/delete-icon.svg'
const PetElement = (props) => {
    const btnDeletePet = () => { 
        props.deletePet(props.id)
    }
    return(
        <div className={style.petBlock}>  
            <img className={style.photoPet} src={photoPet} alt=""/>
            <div className={style.infoAboutPets}>
                <p>Name: {props.name}</p>
                <p>Date of birthday:{props.dateBidthday}</p>
                <p>Breed: {props.breed}</p>
                <p>Comments: {props.comments}</p>
            </div> 
            <img onClick={btnDeletePet}className={style.deletePetIco} src={deleteIco} alt="" />
        </div>
    )
};

export default PetElement;
