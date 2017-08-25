export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'
export const SET_FILTER = 'SET_FILTER'
export const SET_SORTING_COLUMNS = 'SET_SORTING_COLUMNS'

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