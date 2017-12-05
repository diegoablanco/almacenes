import React from 'react'
import { Field } from 'redux-form'
import { Grid, Form, Tab } from 'semantic-ui-react'
import LookupSelectField from '../../common/LookupSelectField'
import SelectField from '../../common/SelectField'


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
  instructions
}) {
  const panes = [
    {
      menuItem: 'Información General',
      pane: <Tab.Pane>
        <Grid verticalAlign="middle" centered textAlign="center">
          <Grid.Column tablet={10} mobile={16} computer={6}>
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
      menuItem: 'Mercadería',
      pane: <Tab.Pane>
        <Grid verticalAlign="middle" centered textAlign="center">
          <Grid.Column tablet={10} mobile={16} computer={6}>
            <Field
              name="instructions"
              component={SelectField}
              options={availableInstructions.map(x => ({ key: x.id, value: x.id, text: x.description }))}
              label="Instrucciones"
              multiple
              placeholder="Buscar una instrucción..."
            />
          </Grid.Column>
        </Grid>
      </Tab.Pane>
    }
  ]
  return (
    <Form>
      <Tab panes={panes} menu={{ secondary: true, pointing: true }} renderActiveOnly={false} />
    </Form>
  )
}
