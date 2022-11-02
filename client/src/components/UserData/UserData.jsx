import s from './UserData.module.scss';

// import photoUser from 
import logOutIco from '../../../images/logout-icon.svg'
import UserForm from './components/UserData/UserForm'
import { getFormName,getFormObj } from '../../../utils/getForm'
import UserFormChanger from './components/UserData/UserFormChanger';

const UserData = (props) => {
    let formsCreate = props.userStore.forms.map((form,index) => {
        if (props.userStore.newUpdate.formName !== form.formName){
            return <UserForm 
                {...form} 
                key={index}
                formValue={getFormName(form.formName, props.userStore)}
                createChanger={props.createChanger}
                />
        } else { 
            return <UserFormChanger 
                {...form} 
                key={index}
                formObj = {getFormObj(form.formName, props.userStore.newUpdate.newText)}
                onChangeUser = {props.onChangeUser}
                saveChange = {props.saveChange}
            />
        }
    })
    return (
        <div className={style.userInfo}>
                <img className={style.imgPhoto} src={photoUser} alt="" />
                {formsCreate}
                <div>
                    <img className={style.icoLogOut} src={logOutIco} alt=''/>
                    <span>Log out</span>
                </div>
            </div>
    )
};

export default UserData;
