import { SHOW_MESSAGE, HIDE_MESSAGE, ENTITY_CREATED, ENTITY_UPDATED, ENTITY_DELETED } from '../actions/messageBar'
export default function customersPage(state, action){
    const defaultState = {
        show: false
    }
    switch(action.type){
        case SHOW_MESSAGE:
            return {...state, ...{show: true, text: action.text}}
        case HIDE_MESSAGE:
            return {...state, ...{show: false}}
        case ENTITY_CREATED:
            return {...state, ...{show: true, text: "Se creó satisfactoriamente"} }
        case ENTITY_UPDATED:
            return {...state, ...{show: true, text: "Se actualizó satisfactoriamente"} }
        case ENTITY_DELETED:
            return { ...state, ...{show: true, text: "Se eliminó satisfactoriamente"} }
        default:
            return state || defaultState
    }
}