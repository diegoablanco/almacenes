import React from 'react'
import { Field } from 'redux-form'
import { Grid, Form } from 'semantic-ui-react'
import LookupSelectField from '../../common/LookupSelectField'


export default function StockForm({ extras: {
  targetCustomerLookup,
  targetCustomerLookupActions,
  customerLookup,
  customerLookupActions,
  carrierLookup,
  carrierLookupActions 
} }) {
  return (
    <Form>
      <Grid verticalAlign="middle" centered textAlign="center">
        <Grid.Column tablet={10} mobile={16} computer={6}>
          <Field
            name="customerId"
            component={LookupSelectField}
            lookupState={customerLookup}
            lookupActions={customerLookupActions}
            label="Cliente"
            placeholder="Buscar un cliente..."
          />
          <Field
            name="targetCustomerId"
            component={LookupSelectField}
            lookupState={targetCustomerLookup}
            lookupActions={targetCustomerLookupActions}
            label="Cliente Destinatario"
            placeholder="Buscar un cliente..."
          />
          <Field
            name="carrierId"
            component={LookupSelectField}
            lookupState={carrierLookup}
            lookupActions={carrierLookupActions}
            label="Transportista"
            placeholder="Buscar un transportista..."
          />
        </Grid.Column>
      </Grid>
    </Form>
  )
}
