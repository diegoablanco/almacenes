import React from 'react'
import { Field, FieldArray } from 'redux-form'
import { Form, Divider } from 'semantic-ui-react'
import { renderField, formFields } from '../utils/formHelpers'
import { getPhoneFieldCells } from './PhoneFields'
import tabulatedFormFields from '../utils/tabulatedFormFields'
import getServiceFields from '../screens/Stock/components/ServiceFields'

function renderContactFields(phoneTypes) {
  return function (contact) {
    return (
      <div key={contact}>
        <Field
          name={`${contact}.name`}
          label="Nombre"
          iconPosition="left"
          component={renderField}
        />
        <Form.Group widths="equal">
          <Field
            name={`${contact}.position`}
            label="Posición"
            iconPosition="left"
            component={renderField}
          />
          <Field
            name={`${contact}.email`}
            label="Email"
            iconPosition="left"
            component={renderField}
          />
        </Form.Group>
        <Divider horizontal>Teléfonos</Divider>
        <FieldArray name={`${contact}.phones`} component={tabulatedFormFields('Teléfonos', getPhoneFieldCells, phoneTypes)} />
        <FieldArray name="services" component={tabulatedFormFields('Servicios Asociados', getServiceFields(null), [])} />
      </div>
    )
  }
}
export default function (title, fieldTitle, phoneTypes) {
  return formFields(title, fieldTitle, renderContactFields(phoneTypes))
}
