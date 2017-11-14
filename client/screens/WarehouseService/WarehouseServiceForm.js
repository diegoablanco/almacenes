import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Grid } from 'semantic-ui-react'
import { Field } from 'redux-form'
import { renderField, renderSelect } from '../../utils/formHelpers'

class WarehouseServiceForm extends Component {   
  render() {
    const { handleSubmit, pristine, reset, submitting, invalid, services } = this.props;

    return (
      <Grid verticalAlign="middle" centered textAlign="center">
        <Grid.Column tablet={10} mobile={16} computer={6}>
            <Field name="serviceId"
                label="Servicio"
                component={renderSelect}
                options={services.map(option => ({key: option.id, value: option.id, text: option.description }))}/>   
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  const { queryResult } = state.services
  return {
    services: queryResult && queryResult.data || []
  }
}

export default connect(mapStateToProps)(WarehouseServiceForm)
