import { createAction, handleActions } from 'redux-actions';
export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'
export const SET_FILTER = 'SET_FILTER'
export const SET_SORTING_COLUMNS = 'SET_SORTING_COLUMNS'
export const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER'
export const RESET_PAGE_NUMBER = 'RESET_PAGE_NUMBER'
export const INCREASE_PAGE_NUMBER = 'INCREASE_PAGE_NUMBER'
export const RELOAD_GRID = 'RELOAD_GRID'
export const GRID_RELOADED = 'GRID_RELOADED'
export const ITEM_DELETED = 'ITEM_DELETED'
export const ITEM_EDITED = 'ITEM_EDITED'
export const ITEM_ADDED = 'ITEM_ADDED'
export const BUILD_ROWS = 'BUILD_ROWS'

export function buildRows(result, concat = false){
    return {
        type: BUILD_ROWS,
        concat,
        result
    }
}

export function itemAdded(addedItem){
    return (dispatch) => {
        dispatch(reloadGrid())
    }
}

export function itemEdited(editedItem){
    return {
        type: ITEM_EDITED,
        editedItem
    }
}

export function itemDeleted(deletedItem){
    return {
        type: ITEM_DELETED,
        deletedItem
    }
}

export function reloadGrid(){
    return {
        type: RELOAD_GRID
    }
}

export function gridReloaded(){
    return {
        type: GRID_RELOADED
    }
}

export function showModal(id){
    return{
        type: SHOW_MODAL,
        id
    }
}

export function hideModal(){
    return{
        type: HIDE_MODAL
    }
}

export function setFilter(filter){
    return {
        type: SET_FILTER,
        filter
    }
}

export function setSortingColumns(sortingColumns){
    return {
        type: SET_SORTING_COLUMNS,
        sortingColumns
    }
}

export function setPageNumber(pageNumber){
    return {
        type: SET_PAGE_NUMBER,
        pageNumber
    }
}

export function resetPageNumber(){
    return {
        type: RESET_PAGE_NUMBER
    }
}

export function increasePageNumber(){
    return {
        type: INCREASE_PAGE_NUMBER
    }
}
