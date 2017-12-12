import React from 'react'
import { Field, formValues, FieldArray } from 'redux-form'
import { Grid, Form, Tab, Accordion, Message } from 'semantic-ui-react'
import LookupSelectField from '../../common/LookupSelectField'
import SelectField from '../../common/SelectField'
import { renderTextArea, renderCheckbox, renderRadio, renderField, parseToInt } from '../../utils/formHelpers'
import attachmentFields from '../../utils/attachmentFields'

function getGoodsPane() {
  return (
    <Tab.Pane attached={false}>
      <Grid verticalAlign="middle" centered textAlign="center">
        <Grid.Column tablet={10} mobile={16} computer={14}>
          <Accordion>
            <Accordion.Title>
              Cajas
            </Accordion.Title>
            <Accordion.Content active>
              <Field
                name="boxes.quantity"
                type="text"
                label="Cantidad"
                parse={parseToInt}
                component={renderField}
              />
              <Field
                name="boxes.opened"
                label="Abiertas"
                component={renderCheckbox}
              />
              <Field
                name="boxes.originalSeals"
                label="Precintos originales"
                component={renderCheckbox}
              />
              <Field
                name="boxes.resealed"
                label="Reprecintadas"
                component={renderCheckbox}
              />
              <Field
                name="boxes.serialNumbers"
                label="Números de serie en cada caja"
                component={renderCheckbox}
              />
              <Field
                name="boxes.shrinkWapped"
                label="Con precinto"
                radioValue="sealed"
                value="sealed"
                component={formValues({ currentValue: 'boxes.shrinkWapped' })(renderRadio)}
              />
              <Field
                name="boxes.shrinkWapped"
                label="Sin precinto"
                radioValue="unsealed"
                value="unsealed"
                component={formValues({ currentValue: 'boxes.shrinkWapped' })(renderRadio)}
              />
            </Accordion.Content>
          </Accordion>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}
function getDocumentsPane() {
  return (
    <Tab.Pane attached={false}>
      <FieldArray name="documents" component={attachmentFields} />
    </Tab.Pane>
  )
}
export default function StockForm({
  targetCustomerLookup,
  targetCustomerLookupActions,
  targetCustomer,
  billingCustomerLookup,
  billingCustomerLookupActions,
  billingCustomer,
  customerLookup,
  customerLookupActions,
  customer,
  carrierLookup,
  carrierLookupActions,
  carrier,
  warehouseLookup,
  warehouseLookupActions,
  warehouse,
  availableInstructions,
  instructions,
  fields,
  error
}) {
  const panes = [
    {
      menuItem: 'Información General',
      pane: <Tab.Pane attached={false}>
        <Grid verticalAlign="middle" centered textAlign="center">
          <Grid.Column tablet={10} mobile={16} computer={8}>
            <Field
              name="warehouseId"
              component={LookupSelectField}
              lookupState={warehouseLookup}
              lookupActions={warehouseLookupActions}
              initialValue={warehouse && { key: warehouse.id, text: warehouse.name }}
              label="Almacén"
              placeholder="Buscar un almacén..."
            />
            <Field
              name="carrierId"
              component={LookupSelectField}
              lookupState={carrierLookup}
              lookupActions={carrierLookupActions}
              initialValue={carrier && { key: carrier.id, text: carrier.companyName }}
              label="Transportista"
              placeholder="Buscar un transportista..."
            />
            <Field
              name="customerId"
              component={LookupSelectField}
              lookupState={customerLookup}
              lookupActions={customerLookupActions}
              initialValue={customer && { key: customer.id, text: customer.companyName }}
              label="Cliente"
              placeholder="Buscar un cliente..."
            />
            <Field
              name="targetCustomerId"
              component={LookupSelectField}
              lookupState={targetCustomerLookup}
              lookupActions={targetCustomerLookupActions}
              initialValue={targetCustomer && { key: targetCustomer.id, text: targetCustomer.companyName }}
              label="Cliente Destinatario"
              placeholder="Buscar un cliente..."
            />
            <Field
              name="billingCustomerId"
              component={LookupSelectField}
              lookupState={billingCustomerLookup}
              lookupActions={billingCustomerLookupActions}
              initialValue={billingCustomer && { key: billingCustomer.id, text: billingCustomer.companyName }}
              label="Cliente de Facturación"
              placeholder="Buscar un cliente..."
            />
          </Grid.Column>
        </Grid>
      </Tab.Pane>
    },
    {
      menuItem: 'Instrucciones',
      pane: <Tab.Pane attached={false}>
        <Grid verticalAlign="middle" centered textAlign="center">
          <Grid.Column tablet={10} mobile={16} computer={12}>
            <Field
              name="instructions"
              component={SelectField}
              options={availableInstructions.map(x => ({ key: x.id, value: x.id, text: x.description }))}
              label="Instrucciones"
              multiple
              placeholder="Buscar una instrucción..."
            />
            <Field
              name="customInstructions"
              type="textarea"
              label="Intrucciones adicionales"
              component={renderTextArea}
              rows={5}
            />
          </Grid.Column>
        </Grid>
      </Tab.Pane>
    },
    {
      menuItem: 'Mercadería',
      pane: getGoodsPane()
    },
    {
      menuItem: 'Documentos',
      pane: getDocumentsPane()
    }
  ]
  return (
    <div>
      {error && <Message error>{error}</Message>}
      <Form>
        <Tab panes={panes} menu={{ secondary: true, pointing: true }} renderActiveOnly={false} />
      </Form>
    </div>
  )
}
