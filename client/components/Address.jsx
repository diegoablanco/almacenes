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
        component={renderField}
      />
      <Form.Group widths="equal">
        <Field
          name="zipCode"
          type="text"
          component={renderField}
        />
        <Field
          name="city"
          type="text"
          component={renderField}
        />
        <Field
          name="country"
          type="text"
          component={renderField}
        />
      </Form.Group>
    </div>
  )
}
