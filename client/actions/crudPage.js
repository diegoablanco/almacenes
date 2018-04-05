import { initialize as initializeReduxForm, SubmissionError } from 'redux-form'
import * as sort from 'sortabular'
import { entityDeletedMessage, entityCreatedMessage, entityUpdatedMessage } from './messageBar'
import { buildSortFromSortingColumns } from '../utils/reactabularHelpers'
import { formatAjvToRf } from '../common/Validation'

const sortingOrder = {
  FIRST: 'asc',
  asc: 'desc',
  desc: 'asc'
}

export function getActionTypes(crudPage = '') {
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
    IS_LOADING_MORE: `${crudPage}/IS_LOADING_MORE`,
    RELOAD_GRID: `${crudPage}/RELOAD_GRID`,
    GRID_RELOADED: `${crudPage}/GRID_RELOADED`,
    DELETE_ITEM: `${crudPage}/DELETE_ITEM`,
    ITEM_DELETED: `${crudPage}/ITEM_DELETED`,
    ITEM_EDITED: `${crudPage}/ITEM_EDITED`,
    ITEM_ADDED: `${crudPage}/ITEM_ADDED`,
    BUILD_ROWS: `${crudPage}/BUILD_ROWS`,
    TOGGLE_CAN_ADD: `${crudPage}/TOGGLE_CAN_ADD`

  }
}
export function defaultGetQuery(state, selectors) {
  const { filter, sortingColumns } = selectors.getUiState(state)
  const query = {
    $sort: buildSortFromSortingColumns(sortingColumns)
  };

  return Object.assign(query, filter)
}
export function getCrudPageActions(crudPage, serviceActions, selectors, getQueryFunction) {
  const getQuery = getQueryFunction || defaultGetQuery
  const actionTypes = getActionTypes(crudPage)
  function hideModal() {
    return {
      type: actionTypes.HIDE_MODAL
    }
  }
  function hideConfirmModal() {
    return {
      type: actionTypes.HIDE_CONFIRM_MODAL
    }
  }
  function buildRows(result, concat = false) {
    return {
      type: actionTypes.BUILD_ROWS,
      concat,
      result
    }
  }
  function resetPageNumber() {
    return {
      type: actionTypes.RESET_PAGE_NUMBER
    }
  }
  function loadGrid() {
    return (dispatch, getState) => {
      const query = getQuery(getState(), selectors)
      dispatch(serviceActions.find({ query })).then(result => {
        dispatch(buildRows(result.value))
      })
    }
  }
  function reloadGrid() {
    return async (dispatch, getState) => {
      dispatch(resetPageNumber())
      const { rows } = selectors.getUiState(getState())
      const showingChildrenRows = rows.filter(x => x.showingChildren).map(({ id }) => id)
      const query = getQuery(getState(), selectors)
      const { value: newRows } = await dispatch(serviceActions.find({ query }))
      newRows.data = newRows.data.map(row => ({ ...row, showingChildren: showingChildrenRows.includes(row.id) }))
      dispatch(buildRows(newRows))
    }
  }
  function initializeCrud() {
    return (dispatch, getState) => {
      const { rows } = selectors.getUiState(getState())
      if (rows.length === 0) dispatch(loadGrid())
    }
  }
  function initializeForm(formName, id, defaultData, query = {}) {
    return async (dispatch) => {
      if (id) {
        const response = await dispatch(serviceActions.get(id, { query }))
        dispatch({ type: actionTypes.HIDE_MODAL_LOADING_INDICATOR })
        dispatch(initializeReduxForm(formName, response.value))
      } else {
        dispatch(initializeReduxForm(formName, defaultData))
        dispatch({ type: actionTypes.HIDE_MODAL_LOADING_INDICATOR })
      }
    }
  }
  return {
    initializeForm,
    initializeCrud,
    buildRows,
    itemEdited(editedItem) {
      return (dispatch) => {
        dispatch(hideModal())
        dispatch({ type: actionTypes.ITEM_EDITED, editedItem })
      }
    },
    createOrUpdate(values) {
      return async dispatch => {
        const isUpdate = values.id !== undefined
        const serviceAction = (isUpdate
          ? serviceActions.update(values.id, values)
          : serviceActions.create(values))
        const messageAction = isUpdate
          ? entityUpdatedMessage()
          : entityCreatedMessage()
        try {
          await dispatch(serviceAction)
        } catch (error) {
          throw new SubmissionError(formatAjvToRf(error))
        }
        dispatch(hideModal())
        dispatch(messageAction)
        await dispatch(reloadGrid())
      }
    },
    loadGrid,
    reloadGrid,
    toggleShowingChildren(id) {
      return (dispatch, getState) => {
        const { rows } = selectors.getUiState(getState())
        const row = rows.find(x => x.id === id)
        dispatch({
          type: actionTypes.ITEM_EDITED,
          editedItem: { ...row, showingChildren: !row.showingChildren
          } })
      }
    },
    filterGrid(filter) {
      return (dispatch, getState) => {
        dispatch(resetPageNumber())
        dispatch({ type: actionTypes.SET_FILTER, filter })
        const query = getQuery(getState(), selectors)
        dispatch(serviceActions.find({ query })).then(result => {
          dispatch(buildRows(result.value))
        })
      }
    },
    loadMore() {
      return async (dispatch, getState) => {
        const { rows, isLoadingMore } = selectors.getUiState(getState())
        if (isLoadingMore) return
        dispatch({ type: actionTypes.INCREASE_PAGE_NUMBER, qty: rows.length })
        const query = getQuery(getState(), selectors)
        dispatch({ type: actionTypes.IS_LOADING_MORE, isLoadingMore: true })
        const result = await dispatch(serviceActions.find({ query }))
        dispatch({ type: actionTypes.IS_LOADING_MORE, isLoadingMore: false })
        dispatch(buildRows(result.value, true))
      }
    },
    sortGrid(selectedColumn) {
      return (dispatch, getState) => {
        const { sortingColumns } = selectors.getUiState(getState())
        const newSortingColumns = sort.byColumn({ sortingColumns, selectedColumn, sortingOrder })
        dispatch({ type: actionTypes.SET_SORTING_COLUMNS, sortingColumns: newSortingColumns })
        dispatch(resetPageNumber())
        const query = getQuery(getState(), selectors)
        dispatch(serviceActions.find({ query })).then(result => {
          dispatch(buildRows(result.value))
        })
      }
    },
    confirmDeleteItem() {
      return (dispatch, getState) => new Promise((resolve) => {
        const { confirmDialog: { id } } = selectors.getUiState(getState())
        dispatch(serviceActions.remove(id))
          .then(result => {
            dispatch(hideConfirmModal())
            dispatch({ type: actionTypes.ITEM_DELETED, deletedItem: result.value })
            dispatch(entityDeletedMessage())
            resolve()
          })
      })
    },
    itemDeleted(deletedItem) {
      return {
        type: actionTypes.ITEM_DELETED,
        deletedItem
      }
    },
    gridReloaded() {
      return {
        type: actionTypes.GRID_RELOADED
      }
    },
    showFormModal(id, query = {}) {
      return async (dispatch, getState) => {
        const { formName, defaultData } = selectors.getUiState(getState())
        dispatch({ type: actionTypes.SHOW_MODAL, id })
        return dispatch(initializeForm(formName, id, defaultData, query))
      }
    },
    hideModal,
    showConfirmModal(id) {
      return {
        type: actionTypes.SHOW_CONFIRM_MODAL,
        id
      }
    },
    hideConfirmModal,
    setSortingColumns(sortingColumns) {
      return {
        type: actionTypes.SET_SORTING_COLUMNS,
        sortingColumns
      }
    },
    setPageNumber(pageNumber) {
      return {
        type: actionTypes.SET_PAGE_NUMBER,
        pageNumber
      }
    },
    resetPageNumber,
    increasePageNumber() {
      return {
        type: actionTypes.INCREASE_PAGE_NUMBER
      }
    }
  }
}
