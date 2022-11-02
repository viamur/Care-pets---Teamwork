import style from './PetsData.module.scss'
import PetElement from './PetElement'
const PetsData = (props) => {
    let createPetEl = props.petsStore.map((pet,index) => {
        return <PetElement {...pet} key={index} deletePet={props.deletePet}/>
    })
    return(
        <div className={style.petsBlock}>
            {createPetEl}
        </div>
    )
    
}

export default PetsData;
