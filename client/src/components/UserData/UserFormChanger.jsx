import React from 'react'
import style from './UserData.module.scss'
import checkMarkIco from '../../images/icons/pencil-icon.svg'

const UserFormChanger = (props) => { 
    let inputRef = React.createRef()
    let changeInput = () => {
        props.onChangeUser(inputRef.current.value)
    }
    let saveChange = () => {
        props.saveChange(props.formObj)
    }
    return (
        <div className={style.userInput}>
            <span className={style.inputParams}>{props.formName}:</span>
            <input ref={inputRef} onChange={changeInput} className={style.inputForm}/>
            <div className={style.inputIcon}>
                <img onClick={saveChange}src={checkMarkIco} alt=""/>
            </div>
        </div>
    )
};

export default UserFormChanger;
