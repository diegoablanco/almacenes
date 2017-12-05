import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { Field } from 'redux-form'
import { renderField, parseToFloat } from '../../utils/formHelpers'

class ServiceForm extends Component { 
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
                parse={parseToFloat}
                component={renderField}/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default ServiceForm
