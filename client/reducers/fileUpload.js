import {
  FILE_UPLOAD_PROGRESS,
  FILE_UPLOAD_FULFILLED,
  FILE_REMOVE,
  FILE_UPLOAD_PENDING } from '../actions/fileUpload'
import { getObjectProperties } from '../utils/common'

const initialState = {
}
export default (state = initialState, action) => {
  switch (action.type) {
    case FILE_UPLOAD_PENDING: {
      const { file: { name: fileName } } = action
      const file = { [fileName]: { fileName } }
      const fieldFiles = (state[action.fieldName] || {})
      const newFieldFiles = { [action.fieldName]: { ...fieldFiles, ...file } }
      return { ...state, ...newFieldFiles }
    }
    case FILE_UPLOAD_PROGRESS: {
      const { progress: { percent = 100 }, file: { name: fileName } } = action
      const file = { [fileName]: { percent, fileName } }
      const fieldFiles = (state[action.fieldName] || {})
      const newFieldFiles = { [action.fieldName]: { ...fieldFiles, ...file } }
      return { ...state, ...newFieldFiles }
    }
    case FILE_UPLOAD_FULFILLED: {
      const { fieldName, fileName, id } = action
      const fieldFiles = state[fieldName]
      const fieldFile = { [fileName]: { ...fieldFiles[fileName], id } }
      const newFieldFiles = { [fieldName]: { ...fieldFiles, ...fieldFile } }
      return { ...state, ...newFieldFiles }
    }
    case FILE_REMOVE: {
      const { fieldName, id } = action
      const fieldFiles = { [fieldName]: getObjectProperties(state[fieldName]).filter(x => x.id !== id) }
      return { ...state, ...fieldFiles }
    }
    default:
      return state
  }
}
