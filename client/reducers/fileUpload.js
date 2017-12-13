import * as actions from '../actions/fileUpload'
import { getObjectProperties } from '../utils/common'

const initialState = {
}
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FILE_UPLOAD_PENDING: {
      const { file: { name: fileName } } = action
      const file = { [fileName]: { fileName } }
      const fieldFiles = (state[action.fieldName] || {})
      const newFieldFiles = { [action.fieldName]: { ...fieldFiles, ...file } }
      return { ...state, ...newFieldFiles }
    }
    case actions.FILE_UPLOAD_PROGRESS: {
      const { progress: { percent = 100 }, file: { name: fileName } } = action
      const file = { [fileName]: { percent, fileName } }
      const fieldFiles = (state[action.fieldName] || {})
      const newFieldFiles = { [action.fieldName]: { ...fieldFiles, ...file } }
      return { ...state, ...newFieldFiles }
    }
    case actions.FILE_UPLOAD_FULFILLED: {
      const { fieldName, fileName, hashName } = action
      const fieldFiles = state[fieldName]
      const fieldFile = { [fileName]: { ...fieldFiles[fileName], hashName } }
      const newFieldFiles = { [fieldName]: { ...fieldFiles, ...fieldFile } }
      return { ...state, ...newFieldFiles }
    }
    case actions.FILE_REMOVE: {
      const { fieldName, hashName } = action
      const fieldFiles = { [fieldName]: getObjectProperties(state[fieldName]).filter(x => x.hashName !== hashName) }
      return { ...state, ...fieldFiles }
    }
    case actions.INITIALIZE: {
      const { fieldName } = action
      const fieldFiles = { [fieldName]: {} }
      action.values.forEach(x => {
        fieldFiles[fieldName][x.fileName] = x
      })
      return { ...state, ...fieldFiles }
    }
    default:
      return state
  }
}
