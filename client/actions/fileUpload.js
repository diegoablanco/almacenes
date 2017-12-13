import request from 'superagent'
import { change, getFormValues } from 'redux-form'

export const FILE_UPLOAD_PROGRESS = 'FILE_UPLOAD_PROGRESS'
export const FILE_UPLOAD_FULFILLED = 'FILE_UPLOAD_FULFILLED'
export const FILE_UPLOAD_PENDING = 'FILE_UPLOAD_PENDING'
export const FILE_REMOVE = 'FILE_REMOVE'
export const INITIALIZE = 'INITIALIZE'

export function uploadFile(file, fieldName, formName) {
  return (dispatch, getState) => new Promise((resolve) => {
    const values = getFormValues(formName)(getState())[fieldName]
    const fileIndex = values.findIndex(x => x.fileName === file.name)
    dispatch(change(formName, `${fieldName}[${fileIndex}].preview`, file.preview))
    dispatch({ type: FILE_UPLOAD_PENDING, file, fieldName })
    request
      .post('/api/upload')
      .attach('uri', file, file.name)
      .on('progress', progress => {
        dispatch(change(formName, `${fieldName}[${fileIndex}].percent`, progress.percent))
      })
      .end((err, { body: { id: hashName } }) => {
        dispatch(change(formName, `${fieldName}[${fileIndex}].hashName`, hashName))
        resolve()
      })
  })
}
export function removeFile(fieldName, hashName) {
  return dispatch => dispatch({ type: FILE_REMOVE, fieldName, hashName })
}
export function initialize(fieldName, values) {
  return dispatch => dispatch({ type: INITIALIZE, fieldName, values })
}
