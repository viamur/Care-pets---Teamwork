import {connect} from 'react-redux'
import UserPage from './pages/Userpage/UserPage'

import {onChangeUser,createChanger, saveChange} from '../../Redux/userReducer'
import {deletePet} from '../../Redux/petsReducer'

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
