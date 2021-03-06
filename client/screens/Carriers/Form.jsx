import React, { Component } from 'react'
import { Field, FieldArray, FormSection } from 'redux-form'
import { Form, Divider, Tab } from 'semantic-ui-react'
import { renderField } from '../../utils/formHelpers'
import { getPhoneFieldCells } from '../../common/PhoneFields'
import tabulatedFormFields from '../../utils/tabulatedFormFields'
import { Address, ValidationSummary } from '../../components'

class CarrierForm extends Component {
  render() {
    const { extras: { phoneTypes }, error, loading } = this.props
    const panes = [
      { menuItem: 'Información de Contacto',
        pane:
  <Tab.Pane key="contact">
    <Form.Group>
      <Field
        name="companyName"
        width={12}
        type="text"
        component={renderField}
        required
      />
    </Form.Group>

    <FormSection name="address">
      <Address />
    </FormSection>
    <Divider horizontal>Firmante Autorizado</Divider>
    <Field
      name="authorizedSignatory.name"
      component={renderField}
    />
    <Form.Group widths="equal">
      <Field
        name="authorizedSignatory.position"
        component={renderField}
      />
      <Field
        name="authorizedSignatory.email"
        component={renderField}
      />
    </Form.Group>
    <Divider horizontal>Teléfonos</Divider>
    <FieldArray
      name="authorizedSignatory.phones"
      component={tabulatedFormFields({
                    title: 'Teléfonos',
                    getFieldCells: getPhoneFieldCells,
                    additionalInformation: phoneTypes,
                    crudPage: 'contact.phones'
                    })}
    />
  </Tab.Pane> }
    ]
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

export default CarrierForm
