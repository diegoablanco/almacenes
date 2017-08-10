import { SHOW_MODAL, HIDE_MODAL, SET_FILTER } from '../actions/customers'
export default function customersPage(state, action){
    const defaultState = {
        showModal: false,
        filter: {}
    }
    switch(action.type){
        case SHOW_MODAL:
            return {...state, showModal: true, id: action.id}
        case HIDE_MODAL:
            return {...state, showModal: false}
        case SET_FILTER:
            return { ...state, filter: {...state.filter, ...action.filter} }
        default:
            return state || defaultState
    }
}