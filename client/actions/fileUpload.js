import request from 'superagent'
import { change, getFormValues, stopAsyncValidation, startAsyncValidation } from 'redux-form'

export const FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR'
export const FILE_UPLOAD_FULFILLED = 'FILE_UPLOAD_FULFILLED'
export const FILE_UPLOAD_PENDING = 'FILE_UPLOAD_PENDING'
export const FILE_REMOVE = 'FILE_REMOVE'
export const INITIALIZE = 'INITIALIZE'

export function uploadFile(file, fieldName, formName) {
  return (dispatch, getState) => new Promise((resolve) => {
    const values = getFormValues(formName)(getState())[fieldName]
    const fileIndex = values.findIndex(x => x.fileName === file.name)
    const fieldPrefix = `${fieldName}[${fileIndex}]`
    dispatch(change(formName, `${fieldPrefix}.preview`, file.preview))
    dispatch({ type: FILE_UPLOAD_PENDING, file, fieldName })
    dispatch(startAsyncValidation())
    request
      .post('/api/upload')
      .set('authorization', localStorage['feathers-jwt'])
      .attach('uri', file, file.name)
      .on('progress', progress => {
        dispatch(change(formName, `${fieldPrefix}.percent`, progress.percent))
      })
      .end((err, { body: { id: hashName, thumb } }) => {
        if (err && err.response.error.status === 401) {
          dispatch(change(formName, `${fieldPrefix}.error`, { percent: 'Error de autenticación' }))
          dispatch({ type: FILE_UPLOAD_ERROR, fileName: file.Name, error: { percent: 'Error de autenticación' } })
          resolve()
        }
        dispatch(change(formName, `${fieldPrefix}.hashName`, hashName))
        dispatch(change(formName, `${fieldPrefix}.thumb`, thumb))
        dispatch(change(formName, `${fieldPrefix}.preview`, ''))
        const newValues = getFormValues(formName)(getState())[fieldName]
        const errors = newValues.filter(x => x.error).map(value => {
          const index = newValues.findIndex(x => x.fileName === value.fileName)
          return { [index]: value.error }
        })
        dispatch(stopAsyncValidation(formName, { [fieldName]: Object.assign({}, ...errors) }))
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
