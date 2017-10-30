import React, { Component } from 'react'
import { Field, FieldArray } from 'redux-form'
import { Button, Form, Grid, Divider, Tab, Segment } from 'semantic-ui-react'
import { renderField, formFields } from '../utils/formHelpers'
import PhoneFields from './PhoneFields'

function renderContactFields(contact){
  return (       
    <div> 
      <Field name={`${contact}.name`}
              label="Nombre"
              iconPosition='left' 
              component={renderField}/>      
      <Form.Group widths="equal">
        <Field name={`${contact}.position`}
            label="Posición"
            iconPosition='left' 
            component={renderField}/>      
        <Field name={`${contact}.email`}
            label="Email"
            iconPosition='left' 
            component={renderField}/>
      </Form.Group>
      <Divider horizontal>Teléfonos</Divider>
      <FieldArray name={`${contact}.phones`} component={PhoneFields} />
    </div>
  )
}
export default function(title){
  return formFields(title, renderContactFields)
}