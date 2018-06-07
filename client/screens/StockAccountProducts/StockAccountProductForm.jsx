import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Segment, Grid, Tab } from 'semantic-ui-react'
import { Field } from 'redux-form'
import { renderSelect, renderField, parseToFloat } from '../../utils/formHelpers'

class WarehouseServiceForm extends Component {
  render() {
    const { services, stockMovementTypes, loading, setServiceRate } = this.props
    const panes = [
      { menuItem: 'Productos',
        pane: <Tab.Pane key="products">
          <Grid verticalAlign="middle" centered textAlign="center">
            <Grid.Column tablet={10} mobile={16} computer={10}>
              <Segment>
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
                  onChange={(e, serviceId) => {
                          setServiceRate(serviceId)
                        }}
                  options={services.map(option => ({ key: option.id, value: option.id, text: option.description }))}
                />
                <Field
                  name="rate"
                  type="text"
                  label="Tarifa"
                  parse={parseToFloat}
                  component={renderField}
                  required
                />
              </Segment>
            </Grid.Column>
          </Grid>
        </Tab.Pane>
      }
    ]
    return (
      <Form loading={loading}>
        <Tab panes={panes} menu={{ secondary: true, pointing: true }} renderActiveOnly={false} />
      </Form>
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
