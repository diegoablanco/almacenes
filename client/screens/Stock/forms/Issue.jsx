import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, getFormValues, FormSection } from 'redux-form'
import { Grid } from 'semantic-ui-react'
import LookupSelectField from '../../../components/LookupSelectField'
import GoodsResume from '../components/GoodsResume'
import { DateTimeField, Address } from '../../../components'

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
          />
          <FormSection name="address">
            <Address />
          </FormSection>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state, { formName }) => ({
  stock: getFormValues(formName)(state)
})

export default connect(mapStateToProps)(IssueForm)
