import React, { Component } from 'react'
import { Field } from 'redux-form'
import { Button, Form, Grid, Tab } from 'semantic-ui-react'
import { renderField } from '../../utils/formHelpers'
import WarehouseServiceCrud from '../WarehouseService/WarehouseServiceCrud'

class WarehouseForm extends Component {    
  render() {
    const { handleSubmit, pristine, reset, submitting, invalid, isEdit } = this.props;

    const panes = [
      { menuItem: 'Información de Contacto', pane: <Tab.Pane> 
      <Grid verticalAlign="middle" centered textAlign="center">
        <Grid.Column tablet={10} mobile={16} computer={6}>
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
          </Grid.Column>
        </Grid>
      </Tab.Pane> }]
      if(isEdit)
        panes.push( 
          { menuItem: 'Servicios', pane: <Tab.Pane> 
            <WarehouseServiceCrud />
        </Tab.Pane> })
    return (
      <Tab panes={panes} menu={{ secondary: true, pointing: true }} renderActiveOnly={false}/>
    )
  }
}

export default WarehouseForm
