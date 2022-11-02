import { combineReducers, createStore } from 'redux'
import userReducer from './userReducer'
import petsReducer from './petsReducer'

let reducers = combineReducers({
    userInfo: userReducer,
    petsStore: petsReducer
})

let store = createStore(reducers)
window.store = store

export default store
