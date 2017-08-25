import { SHOW_MODAL, HIDE_MODAL, SET_FILTER, SET_SORTING_COLUMNS } from '../actions/customers'

const initialState = {
    showModal: false,
    filter: {},
    sortingColumns: {
        'name': {
            direction: 'asc',
            position: 0
        }
    }
}

export default function customersPage(state = initialState, action){
    switch(action.type){
        case SHOW_MODAL:
            return {...state, showModal: true, id: action.id}
        case HIDE_MODAL:
            return {...state, showModal: false}
        case SET_FILTER:
            return { ...state, filter: action.filter }
        case SET_SORTING_COLUMNS:
            return { ...state, sortingColumns: action.sortingColumns }
        default:
            return state
    }
}