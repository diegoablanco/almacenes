import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray } from 'redux-form'
import { Button, Form, Grid, Divider, Tab, Segment } from 'semantic-ui-react'
import classnames from 'classnames'
import { renderField } from '../../utils/formHelpers'
import renderContactFields from '../../common/ContactFields'

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
            iconPosition='left' 
            component={renderField}/>      
        <Form.Group widths="equal">
          <Field name="address.zipCode" 
              type="text" 
              label="Código Postal"
              iconPosition='left' 
              component={renderField}/>      
          <Field name="address.city" 
              type="text" 
              label="Ciudad"
              component={renderField}/>      
          <Field name="address.country" 
              type="text" 
              label="Pais"
              iconPosition='left' 
              component={renderField}/>    
        </Form.Group>
        <Divider horizontal>Firmante Autorizado</Divider>
        <Field name="authorizedSignatory.name" 
            label="Nombre"
            iconPosition='left' 
            component={renderField}/>      
        <Form.Group widths="equal">
          <Field name="authorizedSignatory.position" 
              label="Posición"
              iconPosition='left' 
              component={renderField}/>      
          <Field name="authorizedSignatory.email" 
              label="Email"
              iconPosition='left' 
              component={renderField}/>
        </Form.Group>
      </Tab.Pane> },
      { menuItem: 'Información de la Cuenta', render: () => <Tab.Pane>
        <Field name="account.bankName" 
            type="text" 
            label="Nombre del Banco"
            component={renderField}/>      
        <Field name="account.number" 
            type="text" 
            label="Número de Cuenta"
            iconPosition='left' 
            component={renderField}/>      
        <Form.Group widths="equal">
          <Field name="account.iban" 
              type="text" 
              label="IBAN"
              component={renderField}/>      
          <Field name="account.swiftBic" 
              type="text" 
              label="SWIFT/BIC"
              iconPosition='left' 
              component={renderField}/>      
        </Form.Group>
          <Field name="account.address.line1" 
              type="text" 
              label="Dirección"
              iconPosition='left' 
              component={renderField}/>      
        <Form.Group widths="equal">  
          <Field name="account.address.zipCode" 
              type="text" 
              label="Código Postal"
              iconPosition='left' 
              component={renderField}/>    
          <Field name="account.address.city" 
              type="text" 
              label="Ciudad"
              iconPosition='left' 
              component={renderField}/>      
          <Field name="account.address.country" 
              type="text" 
              label="País"
              iconPosition='left' 
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
