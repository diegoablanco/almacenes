import request from 'superagent'
import { change, getFormValues } from 'redux-form'

export const FILE_UPLOAD_PROGRESS = 'FILE_UPLOAD_PROGRESS'
export const FILE_UPLOAD_FULFILLED = 'FILE_UPLOAD_FULFILLED'
export const FILE_UPLOAD_PENDING = 'FILE_UPLOAD_PENDING'
export const FILE_REMOVE = 'FILE_REMOVE'

function uploadProgress(file, fieldName, progress) {
  return { type: FILE_UPLOAD_PROGRESS, file, fieldName, progress }
}

export function uploadFile(file, fieldName, formName) {
  return (dispatch, getState) => new Promise((resolve) => {
    dispatch({ type: FILE_UPLOAD_PENDING, file, fieldName })
    request
      .post('/api/upload')
      .attach('uri', file, file.name)
      .on('progress', progress => dispatch(uploadProgress(file, fieldName, progress)))
      .end((err, { body: { id } }) => {
        const { name: fileName } = file
        dispatch({ type: FILE_UPLOAD_FULFILLED, fieldName, fileName, id })
        const values = getFormValues(formName)(getState())[fieldName]
        const fileIndex = values.findIndex(x => x.fileName === fileName)
        dispatch(change(formName, `${fieldName}[${fileIndex}].id`, id))
        resolve()
      })
  })
}
export function removeFile(fieldName, id) {
  return dispatch => dispatch({ type: FILE_REMOVE, fieldName, id })
}
