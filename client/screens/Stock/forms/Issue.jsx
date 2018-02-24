import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, getFormValues } from 'redux-form'
import { Grid } from 'semantic-ui-react'
import LookupSelectField from '../../../components/LookupSelectField'
import GoodsResume from '../components/GoodsResume'
import { DateTimeField } from '../../../components'

class IssueForm extends Component {
  render() {
    const {
      targetCustomerLookup,
      targetCustomerLookupActions,
      targetCustomer,
      stock = {}
    } = this.props
    return (
      <Grid verticalAlign="middle" centered textAlign="center">
        <Grid.Column >
          <GoodsResume stock={stock} />
          <Field
            name="date"
            component={DateTimeField}
            label="Fecha"
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
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state, { formName }) => ({
  stock: getFormValues(formName)(state)
})

export default connect(mapStateToProps)(IssueForm)
