import { SHOW_MESSAGE, HIDE_MESSAGE, ENTITY_CREATED, ENTITY_UPDATED, ENTITY_DELETED } from '../actions/messageBar'
export default function customersPage(state, action){
    const defaultState = {
        show: false
    }
    switch(action.type){
        case SHOW_MESSAGE:
            return {...state, ...{show: true, text: action.text, messageType: action.messageType}}
        case HIDE_MESSAGE:
            return {...state, ...{show: false}}
        case ENTITY_CREATED:
            return {...state, ...{show: true, text: "Se creó correctamente"} }
        case ENTITY_UPDATED:
            return {...state, ...{show: true, text: "Se actualizó correctamente"} }
        case ENTITY_DELETED:
            return { ...state, ...{show: true, text: "Se eliminó correctamente"} }
        default:
            return state || defaultState
    }
}