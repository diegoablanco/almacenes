import React, { Component } from 'react'
import { Field } from 'redux-form'
import { Form, Grid, Tab } from 'semantic-ui-react'
import { renderField } from '../../utils/formHelpers'
import WarehouseServiceCrud from '../WarehouseService/WarehouseServiceCrud'
import { ValidationSummary } from '../../components'

class WarehouseForm extends Component {
  render() {
    const { isEdit, loading, error } = this.props
    const panes = [
      {
        menuItem: 'Información de Contacto',
        pane: <Tab.Pane>
          <Grid verticalAlign="middle" centered textAlign="center">
            <Grid.Column tablet={10} mobile={16} computer={6}>
              <Field
                name="name"
                type="text"
                component={renderField}
                required
              />
              <Field
                name="email"
                type="text"
                icon="mail"
                iconPosition="left"
                component={renderField}
                required
              />
              <Field
                name="phone"
                type="text"
                icon="phone"
                iconPosition="left"
                component={renderField}
              />
            </Grid.Column>
          </Grid>
        </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
      }]
    if (isEdit) {
      panes.push({
        menuItem: 'Servicios por Movimiento de Stock',
        pane: <Tab.Pane>
          <WarehouseServiceCrud />
        </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
      })
    }
    return (
      <div>
        { ValidationSummary(error) }
        <Form loading={loading}>
          <Tab panes={panes} menu={{ secondary: true, pointing: true }} renderActiveOnly={false} />
        </Form>
      </div>
    )
  }
}

export default WarehouseForm
