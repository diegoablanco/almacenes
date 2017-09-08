import { findIndex, filter } from 'lodash'
import { buildSortFromSortingColumns } from '../utils/reactabularHelpers'
import { getActionTypes } from '../actions/crudPage'

export function getCrudReducer(crudPage) {
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
        },
        confirmDialog: {
            show: false
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
    const actionTypes = getActionTypes(crudPage)
    return (state = initialState, action) => {
        switch(action.type){
            case actionTypes.SHOW_MODAL:
                return { ...state, showModal: true, id: action.id }
            case actionTypes.HIDE_MODAL:
                return { ...state, showModal: false }
            case actionTypes.SHOW_CONFIRM_MODAL:
                return { ...state, confirmDialog: {show: true, id: action.id} }
            case actionTypes.HIDE_CONFIRM_MODAL:
                return { ...state, confirmDialog: {show: false} }
            case actionTypes.SET_FILTER:
                return { ...state, filter: action.filter }
            case actionTypes.SET_SORTING_COLUMNS:
                return { ...state, sortingColumns: action.sortingColumns }
            case actionTypes.SET_PAGE_NUMBER:
                return { ...state, filter: { ...state.filter, $skip: action.pageNumber * 3 } }
            case actionTypes.RESET_PAGE_NUMBER:
                return { ...state, filter: { ...state.filter, $skip: 0 } }
            case actionTypes.INCREASE_PAGE_NUMBER:
                return { ...state, filter: { ...state.filter, $skip: (state.filter.$skip || 0) + 3 } }
            case actionTypes.RELOAD_GRID:
                return { ...state, reloadGrid: true }
            case actionTypes.GRID_RELOADED:
                return { ...state, reloadGrid: false }
            case actionTypes.BUILD_ROWS:
                const { concat, result: {data} } = action
                return { ...state, rows: concat ? state.rows.concat(data) : data }
            case actionTypes.ITEM_DELETED:
                {
                    let { rows } = state
                    const { deletedItem } = action            
                    return { ...state, rows: filter(rows, item => item._id !== deletedItem._id) }                
                }
            case actionTypes.ITEM_EDITED:
                {            
                    let { rows } = state
                    const { editedItem } = action
                    const itemIndex = findIndex(rows, item => item._id === editedItem._id)
                    const editedRows = rows.map((row, index) => index === itemIndex ? editedItem : row)
                    return { ...state, rows: editedRows }
                }
            default:
                return state
            }
        } 
    }