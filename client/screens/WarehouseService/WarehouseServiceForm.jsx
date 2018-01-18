import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import { Field } from 'redux-form'
import { renderSelect } from '../../utils/formHelpers'

class WarehouseServiceForm extends Component {
  render() {
    const { services, stockMovementTypes } = this.props;

    return (
      <Form.Group>
        <Field
          name="stockMovementTypeId"
          label="Tipo de Movimiento"
          component={renderSelect}
          options={stockMovementTypes.map(option => ({ key: option.id, value: option.id, text: option.description }))}
        />
        <Field
          name="serviceId"
          label="Servicio"
          component={renderSelect}
          options={services.map(option => ({ key: option.id, value: option.id, text: option.description }))}
        />
      </Form.Group>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    services: { queryResult },
    uneditables: { queryResult: { stockMovementTypes } }
  } = state
  return {
    services: queryResult && queryResult.data || [],
    stockMovementTypes
  }
}

export default connect(mapStateToProps)(WarehouseServiceForm)
