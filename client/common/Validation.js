import Ajv from 'ajv'
import validate from 'redux-form-with-ajv'
import localize from 'ajv-i18n'
import ajvErrors from 'ajv-errors'

const errorMessageReplacements = {
  required: 'ingrese un valor',
  integer: 'debe ser numérico'
}

function errorMessage(error) {
  const { keyword, schema, params } = error
  if (keyword === 'required' && schema[params.missingProperty] && schema[params.missingProperty].$ref) {
    return { type: 'missingEntity', message: error.message }
  }
  return error.message
}
export default function getValidator(schema, relatedSchemas = []) {
  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    jsonPointers: true,
    extendRefs: 'fail',
    schemas: relatedSchemas.map(relatedSchema => ({ ...relatedSchema, errorMessage: errorMessageReplacements }))
  })
  ajvErrors(ajv)
  return validate(schema, { ajv, localize: localize.es, errorMessage })
}
