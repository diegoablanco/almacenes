import React from 'react'
import { Field } from 'redux-form'
import { Form } from 'semantic-ui-react'
import { renderField } from '../utils/formHelpers'

export default function Address() {
  return (
    <div>
      <Field
        name="line1"
        type="text"
        label="Dirección"
        component={renderField}
      />
      <Form.Group widths="equal">
        <Field
          name="zipCode"
          type="text"
          label="Código Postal"
          component={renderField}
        />
        <Field
          name="city"
          type="text"
          label="Ciudad"
          component={renderField}
        />
        <Field
          name="country"
          type="text"
          label="País"
          component={renderField}
        />
      </Form.Group>
    </div>
  )
}
