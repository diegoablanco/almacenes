import React, { Component } from 'react'
import { Field, FieldArray, FormSection } from 'redux-form'
import { Form, Divider, Tab } from 'semantic-ui-react'
import { renderField } from '../../utils/formHelpers'
import renderContactFields from '../../common/ContactFields'
import { getPhoneFieldCells } from '../../common/PhoneFields'
import tabulatedFormFields from '../../utils/tabulatedFormFields'
import { Address, ValidationSummary } from '../../components'
import DocumentAttachmentFields from '../../components/DocumentAttachmentFields'

class CustomerForm extends Component {
  constructor(props) {
    super(props)
    this.getPanes = this.getPanes.bind(this)
  }
  getDocumentsPane() {
    return {
      menuItem: 'Documentos',
      pane: <Tab.Pane attached={false} key="documents">
        <FieldArray name="documents" component={props => (<DocumentAttachmentFields {...props} type="customer" />)} />
      </Tab.Pane> // eslint-disable-line react/jsx-closing-tag-location
    }
  }
  getPanes() {
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
        required
      />
      <Field
        name="vat"
        width={4}
        type="text"
        label="VAT"
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
  </Tab.Pane> },
      { menuItem: 'Información de la Cuenta',
        pane:
  <Tab.Pane>
    <Field
      name="account.bankName"
      type="text"
      label="Nombre del Banco"
      component={renderField}
    />
    <Field
      name="account.number"
      type="text"
      label="Número de Cuenta"
      component={renderField}
    />
    <Form.Group widths="equal">
      <Field
        name="account.iban"
        type="text"
        label="IBAN"
        component={renderField}
      />
      <Field
        name="account.swiftBic"
        type="text"
        label="SWIFT/BIC"
        component={renderField}
      />
    </Form.Group>
    <FormSection name="account.address">
      <Address />
    </FormSection>
    <FieldArray name="authorizedPersons" component={renderContactFields('Personas Autorizadas', 'Persona Autorizada', phoneTypes)} />
  </Tab.Pane> },
      this.getDocumentsPane()
    ]
    return panes
  }
  render() {
    const { error } = this.props
    return (
      <div>
        { ValidationSummary(error) }
        <Tab
          panes={this.getPanes()}
          menu={{ secondary: true, pointing: true }}
          renderActiveOnly={false}
        />
      </div>
    )
  }
}

export default CustomerForm
