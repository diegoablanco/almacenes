import { findIndex, filter } from 'lodash'
import { buildSortFromSortingColumns } from '../utils/reactabularHelpers'
import { 
    SHOW_MODAL, 
    HIDE_MODAL, 
    SET_FILTER, 
    SET_SORTING_COLUMNS,
    SET_PAGE_NUMBER,
    RESET_PAGE_NUMBER,
    INCREASE_PAGE_NUMBER,
    RELOAD_GRID,
    GRID_RELOADED,
    LOAD_ITEMS,
    ITEM_DELETED } from '../actions/customers'

const initialState = {
    reloadGrid: false,
    showModal: false,
    filter: {},
    rows: [],
    sortingColumns: {
        'name': {
            direction: 'asc',
            position: 0
        }
    }
}
function getQuery(state) {
    const { filter, sortingColumns } = state
    const query = {
        $sort: buildSortFromSortingColumns(sortingColumns),
        $limit: 3,
        // $select: ['_id', 'name', 'email', 'phone'],
    };

    return Object.assign(query, filter)
}

export default function customersPage(state = initialState, action){
    switch(action.type){
        case SHOW_MODAL:
            return { ...state, showModal: true, id: action.id }
        case HIDE_MODAL:
            return { ...state, showModal: false }
        case SET_FILTER:
            return { ...state, filter: action.filter }
        case SET_SORTING_COLUMNS:
            return { ...state, sortingColumns: action.sortingColumns }
        case SET_PAGE_NUMBER:
            return { ...state, filter: { ...state.filter, $skip: action.pageNumber * 3 } }
        case RESET_PAGE_NUMBER:
            return { ...state, filter: { ...state.filter, $skip: 0 } }
        case INCREASE_PAGE_NUMBER:
            return { ...state, filter: { ...state.filter, $skip: (state.filter.$skip || 0) + 3 } }
        case RELOAD_GRID:
            return { ...state, reloadGrid: true }
        case GRID_RELOADED:
            return { ...state, reloadGrid: false }
        case LOAD_ITEMS:
            const { serviceActions } = action
            serviceActions.find(getQuery(state)).then(result => {
                const {queryResult} = result
                return { ...state, rows: queryResult ? queryResult.data : []}
            })
        // case ITEM_ADDED:
        //     {
        //         let { rows } = state
        //         const { addedItem } = action            
        //         return { ...state, rows: filter(rows, item => item._id === deletedItem._id) }
        //     }
        case ITEM_DELETED:
            {
                let { rows } = state
                const { deletedItem } = action            
                return { ...state, rows: filter(rows, item => item._id === deletedItem._id) }                
            }
        // case ITEM_EDITED:
        //     {            
        //         let { rows } = state
        //         const { editedItem } = action
        //         const itemIndex = findIndex(rows, item => item._id === editedItem._id)
        //         rows[itemIndex] = editedItem
        //         return { ...state, rows: rows }
        //     }
        default:
            return state
    }
}