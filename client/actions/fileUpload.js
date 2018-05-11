import request from 'superagent'
import { change, getFormValues, stopAsyncValidation, startAsyncValidation } from 'redux-form'

export default function uploadFile(file, fieldName, formName) {
  return async (dispatch, getState) => {
    const values = getFormValues(formName)(getState())[fieldName]
    const fileIndex = values.findIndex(x => x.fileName === file.name)
    const fieldPrefix = `${fieldName}[${fileIndex}]`
    dispatch(change(formName, `${fieldPrefix}.preview`, file.preview))
    dispatch(startAsyncValidation())
    request
      .post('api/upload')
      .set('authorization', localStorage['feathers-jwt'])
      .attach('uri', file, file.name)
      .on('progress', progress => {
        dispatch(change(formName, `${fieldPrefix}.percent`, progress.percent))
      })
      .end((err, response) => {
        if (err && err.response.error.status === 401) {
          dispatch(change(formName, `${fieldPrefix}.error`, { percent: 'Error de autenticación' }))
        }
        const { body: { id: hashName, thumb } } = response
        dispatch(change(formName, `${fieldPrefix}.hashName`, hashName))
        dispatch(change(formName, `${fieldPrefix}.thumb`, thumb))
        dispatch(change(formName, `${fieldPrefix}.preview`, ''))
        const newValues = getFormValues(formName)(getState())[fieldName]
        const errors = newValues.filter(x => x.error).map(value => {
          const index = newValues.findIndex(x => x.fileName === value.fileName)
          return { [index]: value.error }
        })
        dispatch(stopAsyncValidation(formName, { [fieldName]: Object.assign({}, ...errors) }))
      })
  }
}
