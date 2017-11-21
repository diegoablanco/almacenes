import Ajv from 'ajv'
import validate from 'redux-form-with-ajv'
import localize from 'ajv-i18n'
import ajvErrors from 'ajv-errors'

const errorMessageReplacements = {
    required: "ingrese un valor"
}
function errorMessage(error){
    localize.es([error])
    return error.message
}

export default function getValidator(schema, relatedSchemas = []){
    const ajv = new Ajv({
        allErrors: true,
        verbose: true,
        jsonPointers: true,
        extendRefs: "fail",
        schemas: relatedSchemas.map(relatedSchema => ({...relatedSchema, errorMessage: errorMessageReplacements})) 
      })
    ajvErrors(ajv)
    return validate({...schema, errorMessage: errorMessageReplacements}, {ajv, errorMessage: errorMessage})
}