import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Button, Form, Grid } from 'semantic-ui-react'
import classnames from 'classnames'
import { renderField } from '../../utils/formHelpers'

class WarehouseForm extends Component {    
  render() {
    const { handleSubmit, pristine, reset, submitting, invalid } = this.props;

    return (
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
    )
  }
}

export default WarehouseForm
