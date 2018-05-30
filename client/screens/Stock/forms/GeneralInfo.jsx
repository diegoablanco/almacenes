import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Grid } from 'semantic-ui-react'
import LookupSelectField from '../../../components/LookupSelectField'
import { renderField } from '../../../utils/formHelpers'
import { DateTimeField } from '../../../components'

export default function StockGeneralInfoFields({
  id,
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
  addMovementServices
}) {
  return (
    <Grid verticalAlign="middle" centered textAlign="center">
      <Grid.Column tablet={10} mobile={16} computer={8}>
        <Field
          name="date"
          component={DateTimeField}
          label="Fecha"
        />
        <Field
          name="reference"
          type="text"
          component={renderField}
          required
        />
        <Field
          name="warehouseId"
          component={LookupSelectField}
          lookupState={warehouseLookup}
          lookupActions={warehouseLookupActions}
          initialValue={warehouse && { key: warehouse.id, text: warehouse.name }}
          required
          onResultSelect={addMovementServices}
          disabled={id !== null}
        />
        <Field
          name="carrierId"
          component={LookupSelectField}
          lookupState={carrierLookup}
          lookupActions={carrierLookupActions}
          initialValue={carrier && { key: carrier.id, text: carrier.companyName }}
        />
        <Field
          name="customerId"
          component={LookupSelectField}
          lookupState={customerLookup}
          lookupActions={customerLookupActions}
          initialValue={customer && { key: customer.id, text: customer.companyName }}
          required
        />
        <Field
          name="targetCustomerId"
          component={LookupSelectField}
          lookupState={targetCustomerLookup}
          lookupActions={targetCustomerLookupActions}
          initialValue={targetCustomer && { key: targetCustomer.id, text: targetCustomer.companyName }}
        />
        <Field
          name="billingCustomerId"
          component={LookupSelectField}
          lookupState={billingCustomerLookup}
          lookupActions={billingCustomerLookupActions}
          initialValue={billingCustomer && { key: billingCustomer.id, text: billingCustomer.companyName }}
        />
      </Grid.Column>
    </Grid>
  )
}
StockGeneralInfoFields.propTypes = {
  targetCustomerLookup: PropTypes.any.isRequired,
  targetCustomerLookupActions: PropTypes.any.isRequired,
  targetCustomer: PropTypes.any,
  billingCustomerLookup: PropTypes.any.isRequired,
  billingCustomerLookupActions: PropTypes.any.isRequired,
  billingCustomer: PropTypes.any,
  customerLookup: PropTypes.any.isRequired,
  customerLookupActions: PropTypes.any.isRequired,
  customer: PropTypes.any.isRequired,
  carrierLookup: PropTypes.any.isRequired,
  carrierLookupActions: PropTypes.any.isRequired,
  carrier: PropTypes.any,
  warehouseLookup: PropTypes.any.isRequired,
  warehouseLookupActions: PropTypes.any.isRequired,
  warehouse: PropTypes.any.isRequired
}
