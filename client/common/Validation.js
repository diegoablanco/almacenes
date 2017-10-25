import Ajv from 'ajv'
import validate from 'redux-form-with-ajv'
import localize from 'ajv-i18n'

function errorMessage(error){
    localize.es([error])
    return error.message
}

export default function getValidator(schema, relatedSchemas){
    const ajv = new Ajv({
        allErrors: true,
        verbose: true,
        jsonPointers: true,
        schemas: relatedSchemas 
      })

    return validate(schema, {ajv, errorMessage: errorMessage})
}