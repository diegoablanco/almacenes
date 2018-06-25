import { findIndex, filter } from 'lodash'
import { GENERAL_SERVICE_ERROR } from '../actions/common'
import { getActionTypes } from '../actions/crudPage'

export function getCrudReducer(crudPage, defaultInitialState = {}) {
  const initialState = { ...{
    reloadGrid: false,
    showModal: false,
    showReportModal: false,
    dimmed: false,
    filter: {},
    rows: [],
    sortingColumns: {
      createdAt: {
        direction: 'desc',
        position: 0
      }
    },
    confirmDialog: {
      show: false
    },
    canAdd: true,
    isLoadingMore: false
  },
  ...defaultInitialState }
  const actionTypes = getActionTypes(crudPage)
  return (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SHOW_MODAL:
        return { ...state, showModal: true, id: action.id, showModalLoadingIndicator: true, dimmed: false }
      case GENERAL_SERVICE_ERROR:
        return { ...state, showModalLoadingIndicator: false, dimmed: true }
      case actionTypes.HIDE_MODAL:
        return { ...state, showModal: false }
      case actionTypes.HIDE_MODAL_LOADING_INDICATOR:
        return { ...state, showModalLoadingIndicator: false }
      case actionTypes.SHOW_CONFIRM_MODAL:
        return { ...state, confirmDialog: { show: true, id: action.id } }
      case actionTypes.HIDE_CONFIRM_MODAL:
        return { ...state, confirmDialog: { show: false } }
      case actionTypes.SET_FILTER:
        return { ...state, filter: action.filter, anyFilter: action.anyFilter }
      case actionTypes.SET_SORTING_COLUMNS:
        return { ...state, sortingColumns: action.sortingColumns }
      case actionTypes.SET_PAGE_NUMBER:
        return { ...state, filter: { ...state.filter, $skip: action.pageNumber * 3 } }
      case actionTypes.RESET_PAGE_NUMBER:
        return { ...state, filter: { ...state.filter, $skip: 0 } }
      case actionTypes.INCREASE_PAGE_NUMBER:
        return { ...state, filter: { ...state.filter, $skip: action.qty } }
      case actionTypes.RELOAD_GRID:
        return { ...state, reloadGrid: true }
      case actionTypes.GRID_RELOADED:
        return { ...state, reloadGrid: false }
      case actionTypes.IS_LOADING_MORE:
        return { ...state, isLoadingMore: action.isLoadingMore }
      case actionTypes.BUILD_ROWS:
        return { ...state, rows: action.concat ? state.rows.concat(action.result.data) : action.result.data }
      case actionTypes.ITEM_DELETED:
      {
        const { rows } = state
        const { deletedItem } = action
        return { ...state, rows: filter(rows, item => item.id !== deletedItem.id) }
      }
      case actionTypes.ITEM_EDITED:
      {
        const { rows } = state
        const { editedItem } = action
        const itemIndex = findIndex(rows, item => item.id === editedItem.id)
        const editedRows = rows.map((row, index) => (index === itemIndex ? editedItem : row))
        return { ...state, rows: editedRows }
      }
      case actionTypes.TOGGLE_CAN_ADD:
        return { ...state, canAdd: action.canAdd }
      case actionTypes.SHOW_REPORT_MODAL:
        return { ...state, showReportModal: true }
      case actionTypes.HIDE_REPORT_MODAL:
        return { ...state, showReportModal: false }
      default:
        return state
    }
  }
}
