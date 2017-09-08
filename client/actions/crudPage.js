import { createAction, handleActions } from 'redux-actions';
import { entityDeleted } from './messageBar'
export function getActionTypes(crudPage = ''){
    return {
        SHOW_MODAL: `${crudPage}/SHOW_MODAL`,
        HIDE_MODAL: `${crudPage}/HIDE_MODAL`,
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
export function getCrudPageActions(crudPage, serviceActions, selectors){
    const actionTypes = getActionTypes(crudPage)
    return {
        buildRows(result, concat = false){
            return {
                type: actionTypes.BUILD_ROWS,
                concat,
                result
            }
        },
        itemAdded(addedItem){
            return (dispatch) => {
                dispatch(this.reloadGrid())
            }
        },
        itemEdited(editedItem){
            return {
                type: actionTypes.ITEM_EDITED,
                editedItem
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
                    dispatch({ type: actionTypes.HIDE_CONFIRM_MODAL })
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
        showModal(id){
            return{
                type: actionTypes.SHOW_MODAL,
                id
            }
        },
        hideModal(){
            return{
                type: actionTypes.HIDE_MODAL
            }
        },
        showConfirmModal(id){
            return{
                type: actionTypes.SHOW_CONFIRM_MODAL,
                id
            }
        },
        hideConfirmModal(){
            return{
                type: actionTypes.HIDE_CONFIRM_MODAL
            }
        },
        setFilter(filter){
            return {
                type: actionTypes.SET_FILTER,
                filter
            }
        },
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
        resetPageNumber(){
            return {
                type: actionTypes.RESET_PAGE_NUMBER
            }
        },
        increasePageNumber(){
            return {
                type: actionTypes.INCREASE_PAGE_NUMBER
            }
        }
    }
}
