import React, { Component } from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'
import { Field } from 'redux-form'
import { renderField } from '../../utils/formHelpers'

class ServiceForm extends Component { 
  parseToFloat (value){
    if(value.endsWith("."))
      return value
    const { isNaN, parseFloat} = Number
    const float = parseFloat(value)
    return isNaN(float) ? value : float
  }   
  render() {
    const { handleSubmit, pristine, reset, submitting, invalid } = this.props;

    return (
      <Grid verticalAlign="middle" centered textAlign="center">
        <Grid.Column tablet={10} mobile={16} computer={6}>
            <Field name="description" 
                type="text" 
                label="Descripción"
                component={renderField}/>      
            <Field name="rate" 
                type="text" 
                label="Tarifa"
                parse={this.parseToFloat}
                component={renderField}/>   
        </Grid.Column>
      </Grid>
    )
  }
}

export default ServiceForm
