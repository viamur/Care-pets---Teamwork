import {connect} from 'react-redux'
import UserPage from './UserPage'

import {onChangeUser,createChanger, saveChange} from '../../redux/user/userReducer'
import {deletePet} from '../../redux/user/petsReducer'

let mapStateToProps = (state) => { 
    return {
        userStore: state.userInfo,
        petsStore: state.petsStore.pets
    }
}

let mapDispatchToProps = {
    onChangeUser,
    createChanger,
    saveChange,
    deletePet
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
