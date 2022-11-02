import changeInputIco from '../../../images/search-icon.svg'
import s from './UserData.module.scss'
const UserForm = (props) => {
    const getChange = () => {
        props.createChanger(props.formName)
    }
    return (
        <div className={style.userInput}>
            <span className={style.inputParams}>{props.formName}:</span>
            <span className={style.inputValue}>{props.formValue}</span>
            <div className={style.inputIcon}>
                <img onClick={getChange} src={changeInputIco} alt=""/>
            </div>
        </div>
    )
};

export default UserForm;
