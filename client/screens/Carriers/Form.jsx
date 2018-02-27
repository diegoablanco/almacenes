import React, { Component } from 'react'
import { Field, FieldArray, FormSection } from 'redux-form'
import { Form, Divider, Tab } from 'semantic-ui-react'
import { renderField } from '../../utils/formHelpers'
import { getPhoneFieldCells } from '../../common/PhoneFields'
import tabulatedFormFields from '../../utils/tabulatedFormFields'
import { Address } from '../../components'

class CarrierForm extends Component {
  render() {
    const { extras: { phoneTypes } } = this.props
    const panes = [
      { menuItem: 'Información de Contacto',
        pane:
  <Tab.Pane>
    <Form.Group>
      <Field
        name="companyName"
        width={12}
        type="text"
        label="Nombre de la Compañía"
        component={renderField}
      />
    </Form.Group>

    <FormSection name="address">
      <Address />
    </FormSection>
    <Divider horizontal>Firmante Autorizado</Divider>
    <Field
      name="authorizedSignatory.name"
      label="Nombre"
      component={renderField}
    />
    <Form.Group widths="equal">
      <Field
        name="authorizedSignatory.position"
        label="Posición"
        component={renderField}
      />
      <Field
        name="authorizedSignatory.email"
        label="Email"
        component={renderField}
      />
    </Form.Group>
    <Divider horizontal>Teléfonos</Divider>
    <FieldArray name="authorizedSignatory.phones" component={tabulatedFormFields('Teléfonos', getPhoneFieldCells, phoneTypes)} />
  </Tab.Pane> }
    ]
    return (
      <Tab panes={panes} menu={{ secondary: true, pointing: true }} renderActiveOnly={false} />
    )
  }
}

export default CarrierForm
