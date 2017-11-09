import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Button, Form, Grid, Tab } from 'semantic-ui-react'
import classnames from 'classnames'
import { renderField } from '../../utils/formHelpers'
import WarehouseServiceCrud from './WarehouseServiceCrud'

class WarehouseForm extends Component {    
  render() {
    const { handleSubmit, pristine, reset, submitting, invalid } = this.props;

    const panes = [
      { menuItem: 'Información de Contacto', render: () => <Tab.Pane> 
            <Field name="name" 
                type="text" 
                label="Nombre"
                component={renderField}/>      
            <Field name="email" 
                type="text" 
                label="E-mail"
                icon='mail'
                iconPosition='left' 
                component={renderField}/>      
            <Field name="phone" 
                type="text" 
                label="Teléfono"
                icon='phone'
                iconPosition='left' 
                component={renderField}/>  
      </Tab.Pane> }, 
      { menuItem: 'Servicios', render: () => <Tab.Pane> 
        <WarehouseServiceCrud/>
      </Tab.Pane> } 
      ]
    return (
      <Tab panes={panes} menu={{ secondary: true, pointing: true }}/>
    )
  }
}

export default WarehouseForm
