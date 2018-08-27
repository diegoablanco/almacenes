import React from 'react'
import { Field, FieldArray } from 'redux-form'
import { Form, Divider } from 'semantic-ui-react'
import { renderField, formFields } from '../utils/formHelpers'
import { getPhoneFieldCells } from './PhoneFields'
import tabulatedFormFields from '../utils/tabulatedFormFields'

function renderContactFields(phoneTypes) {
  return function (contact) {
    return (
      <div key={contact}>
        <Field
          name={`${contact}.name`}
          iconPosition="left"
          component={renderField}
        />
        <Form.Group widths="equal">
          <Field
            name={`${contact}.position`}
            iconPosition="left"
            component={renderField}
          />
          <Field
            name={`${contact}.email`}
            iconPosition="left"
            component={renderField}
          />
        </Form.Group>
        <Divider horizontal>Teléfonos</Divider>
        <FieldArray
          name={`${contact}.phones`}
          component={tabulatedFormFields({
                    title: 'Teléfonos',
                    getFieldCells: getPhoneFieldCells,
                    crudPage: 'contact.phones'
                    })}
          phoneTypes={phoneTypes}
        />
      </div>
    )
  }
}
export default function (title, fieldTitle, phoneTypes) {
  return formFields(title, fieldTitle, renderContactFields(phoneTypes))
}
