import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, FieldArray, formValues, getFormValues } from 'redux-form'
import { Grid } from 'semantic-ui-react'
import LookupSelectField from '../../../components/LookupSelectField'
import tabulatedFormFields from '../../../utils/tabulatedFormFields'
import { renderRadio, renderField, parseToInt, renderCheckbox } from '../../../utils/formHelpers'
import { DateTimeField } from '../../../components'
import ReferencesFields from "../components/ReferencesFields"

class ReleaseForm extends Component {
  constructor(props) {
    super(props)
    const {stock = {}} = props
    this.referenceFields = tabulatedFormFields({
      title: 'Referencias',
      getFieldCells: ReferencesFields,
      crudPage: 'addReference',
      enableAdd: false,
      enableDelete: false
    })
  }
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
          <Field
            name="date"
            component={DateTimeField}
            label="Fecha"
          />
          <Field
            name="targetCustomerId"
            component={LookupSelectField}
            lookupState={targetCustomerLookup}
            lookupActions={targetCustomerLookupActions}
            initialValue={targetCustomer
              && { key: targetCustomer.id, text: targetCustomer.companyName }}
            label="Cliente Destinatario"
            placeholder="Buscar un cliente..."
          />
          <Field
            name="onHold"
            label="On Hold"
            component={renderCheckbox}
          />          
          <Field
            name="releaseType"
            label="Liberación Total"
            radioValue="full"
            value="full"
            component={formValues({ currentValue: 'releaseType' })(renderRadio)}
          />
          <Field
            name="releaseType"
            label="Liberación Parcial"
            radioValue="partial"
            value="partial"
            component={formValues({ currentValue: 'releaseType' })(renderRadio)}
          />
          <FieldArray
            name="references"
            component={this.referenceFields}
            enableRelease={stock.releaseType === 'partial'}
          />
        </Grid.Column>
      </Grid>
    )
  }
}
ReleaseForm.propTypes = {
  targetCustomerLookup: PropTypes.any.isRequired,
  targetCustomerLookupActions: PropTypes.any.isRequired,
  targetCustomer: PropTypes.any
}

const mapStateToProps = (state, { formName }) => ({
  stock: getFormValues(formName)(state)
})

export default connect(mapStateToProps)(ReleaseForm)
