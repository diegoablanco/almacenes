import { createAction, handleActions } from 'redux-actions';
import { entityDeleted } from './messageBar'
import { buildSortFromSortingColumns } from '../utils/reactabularHelpers'

export function getActionTypes(crudPage = ''){
    return {
        SHOW_MODAL: `${crudPage}/SHOW_MODAL`,
        SHOW_MODAL_LOADING_INDICATOR: `${crudPage}/SHOW_MODAL_LOADING_INDICATOR`,
        HIDE_MODAL: `${crudPage}/HIDE_MODAL`,
        HIDE_MODAL_LOADING_INDICATOR: `${crudPage}/HIDE_MODAL_LOADING_INDICATOR`,
        SHOW_CONFIRM_MODAL: `${crudPage}/SHOW_CONFIRM_MODAL`,
        HIDE_CONFIRM_MODAL: `${crudPage}/HIDE_CONFIRM_MODAL`,
        SET_FILTER: `${crudPage}/SET_FILTER`,
        SET_SORTING_COLUMNS: `${crudPage}/SET_SORTING_COLUMNS`,
        SET_PAGE_NUMBER: `${crudPage}/SET_PAGE_NUMBER`,
        RESET_PAGE_NUMBER: `${crudPage}/RESET_PAGE_NUMBER`,
        INCREASE_PAGE_NUMBER: `${crudPage}/INCREASE_PAGE_NUMBER`,
        RELOAD_GRID: `${crudPage}/RELOAD_GRID`,
        GRID_RELOADED: `${crudPage}/GRID_RELOADED`,
        DELETE_ITEM: `${crudPage}/DELETE_ITEM`,
        ITEM_DELETED: `${crudPage}/ITEM_DELETED`,
        ITEM_EDITED: `${crudPage}/ITEM_EDITED`,
        ITEM_ADDED: `${crudPage}/ITEM_ADDED`,
        BUILD_ROWS: `${crudPage}/BUILD_ROWS`
    }
}
function getQuery(state) {
    const { filter, sortingColumns } = state
    const query = {
        $sort: buildSortFromSortingColumns(sortingColumns),
        // $limit: 3,
        // $select: ['_id', 'name', 'email', 'phone'],
    };

    return Object.assign(query, filter)
}
export function getCrudPageActions(crudPage, serviceActions, selectors){
    const actionTypes = getActionTypes(crudPage)
    function hideModal(){
        return{
            type: actionTypes.HIDE_MODAL
        }
    }
    function hideConfirmModal(){
        return{
            type: actionTypes.HIDE_CONFIRM_MODAL
        }
    }
    function buildRows(result, concat = false){
        return {
            type: actionTypes.BUILD_ROWS,
            concat,
            result
        }
    }
    function resetPageNumber(){
        return {
            type: actionTypes.RESET_PAGE_NUMBER
        }
    }
    return {
        buildRows,
        itemAdded(addedItem){
            return (dispatch) => {
                dispatch(this.reloadGrid())
            }
        },
        itemCreated(addedItem){
            return (dispatch, getState) => {
                dispatch(hideModal())
                dispatch(resetPageNumber())
                const query = getQuery(selectors.getUiState(getState()))
                dispatch(serviceActions.find({query})).then(result => {
                    dispatch(buildRows(result.value))
                })
            }
        },
        itemEdited(editedItem){
            return (dispatch) => {
                dispatch(hideModal())
                dispatch({type: actionTypes.ITEM_EDITED, editedItem})
            }
        },
        loadGrid(){
            return (dispatch, getState) => {
                const query = getQuery(selectors.getUiState(getState()))
                dispatch(serviceActions.find({query})).then(result => {
                    dispatch(buildRows(result.value))
                })
            }
        },        
        filterGrid(filter){
            return (dispatch, getState) => {
                dispatch(resetPageNumber())
                dispatch({type: actionTypes.SET_FILTER, filter})
                const query = getQuery(selectors.getUiState(getState()))
                dispatch(serviceActions.find({query})).then(result => {
                    dispatch(buildRows(result.value))
                })
            }
        },        
        loadMore(){
            return (dispatch, getState) => {
                dispatch({type: actionTypes.INCREASE_PAGE_NUMBER})
                const query = getQuery(selectors.getUiState(getState()))
                dispatch(serviceActions.find({query})).then(result => {
                    dispatch(buildRows(result.value, true))
                })
            }
        },        
        sortGrid(sortingColumns){
            return (dispatch, getState) => {
                    dispatch({type: actionTypes.SET_SORTING_COLUMNS, sortingColumns})
                    dispatch(resetPageNumber())
                    const query = getQuery(selectors.getUiState(getState()))
                    dispatch(serviceActions.find({query})).then(result => {
                        dispatch(buildRows(result.value))
                    })
            }
        },        
        reloadGrid(){
            return {
                type: actionTypes.RELOAD_GRID
            }
        },        
        confirmDeleteItem(){
            return (dispatch, getState) => {
                const {confirmDialog: {id}} = selectors.getUiState(getState())
                dispatch(serviceActions.remove(id))
                .then(result => {
                    dispatch(hideConfirmModal())
                    dispatch({ type: actionTypes.ITEM_DELETED, deletedItem: result.value }) 
                    dispatch(entityDeleted()) 
                })
            }
        },
        itemDeleted(deletedItem){
            return {
                type: actionTypes.ITEM_DELETED,
                deletedItem
            }
        },
        gridReloaded(){
            return {
                type: actionTypes.GRID_RELOADED
            }
        },
        showFormModal(id){
            return{
                type: actionTypes.SHOW_MODAL,
                id
            }
        },
        hideModal,
        showConfirmModal(id){
            return{
                type: actionTypes.SHOW_CONFIRM_MODAL,
                id
            }
        },
        hideConfirmModal,
        setSortingColumns(sortingColumns){
            return {
                type: actionTypes.SET_SORTING_COLUMNS,
                sortingColumns
            }
        },
        setPageNumber(pageNumber){
            return {
                type: actionTypes.SET_PAGE_NUMBER,
                pageNumber
            }
        },
        resetPageNumber,
        increasePageNumber(){
            return {
                type: actionTypes.INCREASE_PAGE_NUMBER
            }
        }
    }
}
