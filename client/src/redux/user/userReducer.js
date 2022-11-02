const NEW_UPDATE = 'NEW-UPDATE'
const CREATE_CHANGER = 'CREATE-CHANGER'
const SAVE_CHANGE = 'SAVE-CHANGE'

let initialState = { 
    name: 'Anna',
    email:'example@gmail.com',
    birthday: '00.00.0000',
    phone: '+3800000000',
    city: 'Kiev',
    forms: [
        {formName:'Name'},
        {formName:'Email'},
        {formName:'Birthday'},
        {formName:'Phone'},
        {formName:'City'}
    ],
    newUpdate: {
        formName: null,
        newText: null
    }
};

const onChangeUserR = (state,action) => ({
    ...state,
    newUpdate: {...state.newUpdate, newText:action.newText}
});

const createChangerR = (state, action) => {
    return {
    ...state,
    newUpdate: {...state.newUpdate, formName: action.formName}
    }
};

const saveChangeR = (state, action) => {
    return {
        ...state,
        ...action.formObj,
        newUpdate: {
            formName: null,
            newText: null
        }
    }
};

const userReducer = (state = initialState, action) => {
    switch (action.type){ 
        case CREATE_CHANGER: return createChangerR(state,action)
        case NEW_UPDATE: return onChangeUserR(state,action)
        case SAVE_CHANGE: return saveChangeR(state,action)
        default: return state
    }
};

export default userReducer

export const onChangeUser = (newText) => ({
    type:NEW_UPDATE,
    newText
});

export const createChanger = (formName) => ({
    type: CREATE_CHANGER,
    formName
});

export const saveChange = (formObj) => ({
    type: SAVE_CHANGE,
    formObj
});
