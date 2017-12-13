import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Grid } from 'semantic-ui-react'
import LookupSelectField from '../../components/LookupSelectField'

export default function StockGeneralInfoFields({
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
  warehouse
}) {
  return (
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
  )
}
StockGeneralInfoFields.propTypes = {
  targetCustomerLookup: PropTypes.any.isRequired,
  targetCustomerLookupActions: PropTypes.any.isRequired,
  targetCustomer: PropTypes.any.isRequired,
  billingCustomerLookup: PropTypes.any.isRequired,
  billingCustomerLookupActions: PropTypes.any.isRequired,
  billingCustomer: PropTypes.any.isRequired,
  customerLookup: PropTypes.any.isRequired,
  customerLookupActions: PropTypes.any.isRequired,
  customer: PropTypes.any.isRequired,
  carrierLookup: PropTypes.any.isRequired,
  carrierLookupActions: PropTypes.any.isRequired,
  carrier: PropTypes.any.isRequired,
  warehouseLookup: PropTypes.any.isRequired,
  warehouseLookupActions: PropTypes.any.isRequired,
  warehouse: PropTypes.any.isRequired
}
