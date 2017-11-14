import { createAction, handleActions } from 'redux-actions'
import { initialize as initializeReduxForm} from 'redux-form'
import { entityDeletedMessage, entityCreatedMessage, entityUpdatedMessage } from './messageBar'
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
        BUILD_ROWS: `${crudPage}/BUILD_ROWS`,
        TOGGLE_CAN_ADD: `${crudPage}/TOGGLE_CAN_ADD`,

    }
}
export function defaultGetQuery(state, selectors) {
    const { filter, sortingColumns } = selectors.getUiState(state)
    const query = {
        $sort: buildSortFromSortingColumns(sortingColumns)
    };

    return Object.assign(query, filter)
}
export function getCrudPageActions(crudPage, serviceActions, selectors, getQueryFunction){
    const getQuery = getQueryFunction || defaultGetQuery
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
    function reloadGrid(){
        return (dispatch, getState) => new Promise((resolve, reject) => {
            dispatch(resetPageNumber())
            const query = getQuery(getState(), selectors)
            dispatch(serviceActions.find({query})).then(result => {
                dispatch(buildRows(result.value))
                resolve()
            })
        })
    }
    return {
        initializeForm(formName, id, defaultData){
            return (dispatch, getState) => {                
                if(id)
                    dispatch(serviceActions.get(id))
                        .then((response) => {
                            dispatch(initializeReduxForm(formName, response.value))
                            dispatch({ type: actionTypes.HIDE_MODAL_LOADING_INDICATOR })
                        })                  
                else{
                    dispatch(initializeReduxForm(formName, defaultData))
                    dispatch({ type: actionTypes.HIDE_MODAL_LOADING_INDICATOR })
                }
            }
        },
        buildRows,
        itemEdited(editedItem){
            return (dispatch) => {
                dispatch(hideModal())
                dispatch({type: actionTypes.ITEM_EDITED, editedItem})
            }
        },
        createOrUpdate(values){
            return dispatch => new Promise((resolve, reject) => {
                if(values.id){
                    dispatch(serviceActions.update(values.id, values)).then(result => {                        
                        dispatch(hideModal())
                        dispatch(entityUpdatedMessage())
                        dispatch(reloadGrid()).then(resolve)
                    })
                }
                else{
                    dispatch(serviceActions.create(values)).then(result => {                        
                        dispatch(hideModal())
                        dispatch(entityCreatedMessage())
                        dispatch(reloadGrid()).then(resolve)
                    })
                }
            })
        },

        loadGrid(){
            return (dispatch, getState) => {
                const query = getQuery(getState(), selectors)
                dispatch(serviceActions.find({query})).then(result => {
                    dispatch(buildRows(result.value))
                })
            }
        },        
        filterGrid(filter){
            return (dispatch, getState) => {
                dispatch(resetPageNumber())
                dispatch({type: actionTypes.SET_FILTER, filter})
                const query = getQuery(getState(), selectors)
                dispatch(serviceActions.find({query})).then(result => {
                    dispatch(buildRows(result.value))
                })
            }
        },        
        loadMore(){
            return (dispatch, getState) => {
                dispatch({type: actionTypes.INCREASE_PAGE_NUMBER})
                const query = getQuery(getState(), selectors)
                dispatch(serviceActions.find({query})).then(result => {
                    dispatch(buildRows(result.value, true))
                })
            }
        },        
        sortGrid(sortingColumns){
            return (dispatch, getState) => {
                    dispatch({type: actionTypes.SET_SORTING_COLUMNS, sortingColumns})
                    dispatch(resetPageNumber())
                    const query = getQuery(getState(), selectors)
                    dispatch(serviceActions.find({query})).then(result => {
                        dispatch(buildRows(result.value))
                    })
            }
        },           
        confirmDeleteItem(){
            return (dispatch, getState) => new Promise((resolve, reject) => {
                const {confirmDialog: {id}} = selectors.getUiState(getState())
                dispatch(serviceActions.remove(id))
                .then(result => {
                    dispatch(hideConfirmModal())
                    dispatch({ type: actionTypes.ITEM_DELETED, deletedItem: result.value }) 
                    dispatch(entityDeletedMessage()) 
                    resolve()
                })
            })
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
