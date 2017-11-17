import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray } from 'redux-form'
import { Button, Form, Grid, Divider, Tab, Segment } from 'semantic-ui-react'
import classnames from 'classnames'
import { renderField } from '../../utils/formHelpers'
import renderContactFields from '../../common/ContactFields'
import PhoneFields from '../../common/PhoneFields'

class CustomerForm extends Component {  
  render() {
    const panes = [
      { menuItem: 'Información de Contacto', render: () => <Tab.Pane>              
        <Form.Group>
          <Field name="companyName" width={12}
              type="text" 
              label="Nombre de la Compañía"
              component={renderField}/>
          <Field name="vat" width={4}
              type="text" 
              label="VAT"
              component={renderField}/>
        </Form.Group>      
        <Field name="address.line1" 
            type="text" 
            label="Dirección"
            component={renderField}/>      
        <Form.Group widths="equal">
          <Field name="address.zipCode" 
              type="text" 
              label="Código Postal"
              component={renderField}/>      
          <Field name="address.city" 
              type="text" 
              label="Ciudad"
              component={renderField}/>      
          <Field name="address.country" 
              type="text" 
              label="País"
              component={renderField}/>    
        </Form.Group>
        <Divider horizontal>Firmante Autorizado</Divider>
        <Field name="authorizedSignatory.name" 
            label="Nombre"
            component={renderField}/>      
        <Form.Group widths="equal">
          <Field name="authorizedSignatory.position" 
              label="Posición"
              component={renderField}/>      
          <Field name="authorizedSignatory.email" 
              label="Email"
              component={renderField}/>
        </Form.Group>
        <Divider horizontal>Teléfonos</Divider>
        <FieldArray name={`authorizedSignatory.phones`} component={PhoneFields} />
      </Tab.Pane> },
      { menuItem: 'Información de la Cuenta', render: () => <Tab.Pane>
        <Field name="account.bankName" 
            type="text" 
            label="Nombre del Banco"
            component={renderField}/>      
        <Field name="account.number" 
            type="text" 
            label="Número de Cuenta"
            component={renderField}/>      
        <Form.Group widths="equal">
          <Field name="account.iban" 
              type="text" 
              label="IBAN"
              component={renderField}/>      
          <Field name="account.swiftBic" 
              type="text" 
              label="SWIFT/BIC"
              component={renderField}/>      
        </Form.Group>
          <Field name="account.address.line1" 
              type="text" 
              label="Dirección"
              component={renderField}/>      
        <Form.Group widths="equal">  
          <Field name="account.address.zipCode" 
              type="text" 
              label="Código Postal"
              component={renderField}/>    
          <Field name="account.address.city" 
              type="text" 
              label="Ciudad"
              component={renderField}/>      
          <Field name="account.address.country" 
              type="text" 
              label="País"
              component={renderField}/>     
        </Form.Group>  
        <Divider horizontal>Personas Autorizadas</Divider>
        <FieldArray name="authorizedPersons" component={renderContactFields("Persona Autorizada")} />
      </Tab.Pane> },
    ]
    const {handleSubmit, loading} = this.props
    return (     
        <Tab panes={panes} menu={{ secondary: true, pointing: true }}/>
    )
  }
}

export default CustomerForm
