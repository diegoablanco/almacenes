import flatten from 'flat'
import intl from 'react-intl-universal'
import { curry } from 'lodash'

function getPropertyTranslationKey(form, propertyName) {
  return `${form}.${propertyName}`.replace(/(\d\.)+/g, '')
}

export default curry((form, state, action) => {
  switch (action.type) {
    case '@@redux-form/UPDATE_SYNC_ERRORS':
      const { payload: { syncErrors } } = action // eslint-disable-line no-case-declarations
      return {
        ...state,
        error: Object.keys(syncErrors).map(key => syncErrors[key]).filter(error => error.type === 'missingEntity').map(error => error.message)
      }
    case '@@redux-form/SET_SUBMIT_FAILED':
      const errors = flatten(state.syncErrors)
      return {
        ...state,
        error: Object.keys(errors).map(key => ({ property: key, message: errors[key] })).map(error => ({
          property: intl.get(getPropertyTranslationKey(form, error.property)),
          message: error.message
        }))
      }
    default:
      return state
  }
})
