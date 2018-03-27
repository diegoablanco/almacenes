import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, formValues, getFormValues } from 'redux-form'
import { Grid } from 'semantic-ui-react'
import LookupSelectField from '../../../components/LookupSelectField'
import GoodsResume from '../components/GoodsResume'
import { renderRadio, renderField, parseToInt, renderCheckbox } from '../../../utils/formHelpers'
import { DateTimeField } from '../../../components'

class ReleaseForm extends Component {
  render() {
    const {
      targetCustomerLookup,
      targetCustomerLookupActions,
      targetCustomer,
      stock
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
          { stock.releaseType === 'partial' && <Field
            name="releaseQuantity"
            type="text"
            label="Cantidad a Liberar"
            width={2}
            parse={parseToInt}
            component={renderField}
          />}
          <Field
            name="onHold"
            label="On Hold"
            component={renderCheckbox}
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
