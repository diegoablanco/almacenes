import Ajv from 'ajv';
//import AddIf from 'ajv-keywords/keywords/if';

function makeValidator (schema) {
  const ajv = new Ajv({ allErrors: true, coerceTypes: true })

  // Add If-then-else from ajv-keywords package
  //AddIf(ajv);

  // Add custom keyword
  ajv.addKeyword('customKeyword', {
    validate: (aSchema, value) => customValidationFunction(value),
    errors: false,
  });

  const validator = ajv.compile(schema)

  // Return a redux-form compatible validation function
  return function(values) {
    const errors = {}

    if (values) {
      validator(values)
      if (validator.errors) {
        validator.errors.forEach((obj) => {
          // Massage ajv errors to the { 'fieldName': 'errorMessage' } format expected by redux-form
          if (obj.keyword === 'required') {
            errors[obj.params.missingProperty] = obj.message
          } else {
            errors[obj.dataPath.replace('.', '')] = obj.message
          }
        })
      }
    }

    return errors
  };
}
export default makeValidator