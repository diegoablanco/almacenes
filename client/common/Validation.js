import Ajv from 'ajv'
import validate from 'redux-form-with-ajv'
import localize from 'ajv-i18n'
import ajvErrors from 'ajv-errors'
import { set } from 'lodash'

const errorMessageReplacements = {
  required: 'ingrese un valor',
  integer: 'debe ser numérico'
}

function errorMessage(error, customError) {
  if (customError) {
    const customErrorMessage = customError(error)
    if (customErrorMessage) {
      return customErrorMessage
    }
  }
  const { keyword, schema, params } = error
  if (keyword === 'required') {
    if (schema[params.missingProperty] && schema[params.missingProperty].$ref) {
      return { type: 'missingEntity', message: error.message }
    }
    return 'esta propiedad es requerida'
  }

  return error.message
}

export function formatAjvToRf(validationResult, localizeFunc = localize.es, customError) {
  const errors = {}
  if(!Array.isArray(validationResult.errors))
    return { _error: validationResult.message }
  localizeFunc(validationResult.errors);
  validationResult.errors.forEach((_error) => {
    const error = _error.params.errors ? _error.params.errors[0] : _error;
    const rootPath = error.dataPath;
    const property = error.params.missingProperty ? `/${error.params.missingProperty}` : ''
    let fullPath = (`${rootPath}${property}`).replace(/\//g, '.').substring(1)

    if (error.parentSchema && error.parentSchema.type === 'array') {
      fullPath += '._error'
    }

    const message = errorMessage(_error, customError)

    set(errors, fullPath, message)
  })
  return errors
}

export default function getValidator(schema, relatedSchemas = [], customError) {
  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    jsonPointers: true,
    extendRefs: 'fail',
    $data: true,
    schemas: relatedSchemas.map(relatedSchema => ({ ...relatedSchema, errorMessage: errorMessageReplacements }))
  })
  ajvErrors(ajv)
  return validate(schema, { ajv, localize: localize.es, errorMessage: error => errorMessage(error, customError) })
}
