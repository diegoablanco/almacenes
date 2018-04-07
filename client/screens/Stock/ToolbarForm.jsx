import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { Form } from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import { renderSearchField } from '../../utils/formHelpers'
import { stocks as selectors } from '../../selectors'
import getUneditables from '../../selectors/uneditables'
import SelectField from '../../common/SelectField'
import LookupSelectField from '../../components/LookupSelectField'

class ToolbarForm extends Component {
  render() {
    const {
      statuses,
      searchFilterCustomer,
      clearFilterCustomer,
      customerFilterLookup,
      reset,
      handleSubmit
    } = this.props
    return (
      <Form onSubmit={handleSubmit}>
        <Field
          name="search"
          type="text"
          placeholder="Buscar por Referencia"
          component={renderSearchField}
          reset={reset}
        />
        <Field
          name="status"
          component={SelectField}
          options={statuses}
          multiple
        />
        <Field
          name="customer"
          component={LookupSelectField}
          lookupState={customerFilterLookup}
          lookupActions={{ search: searchFilterCustomer, clear: clearFilterCustomer }}
        />
      </Form>
    )
  }
}

const mapStateToProps = state => {
  const { stockStatuses } = getUneditables(state)
  const {
    customerFilterLookup
  } = selectors.getUiState(state)
  return {
    statuses: stockStatuses.map(x => ({ key: x.id, value: x.id, text: x.description })),
    customerFilterLookup
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { crudActions: { searchFilterCustomer, clearFilterCustomer } } = ownProps
  return bindActionCreators({ searchFilterCustomer, clearFilterCustomer }, dispatch)
}

export default compose(connect(mapStateToProps, mapDispatchToProps), reduxForm({ form: 'filterStock' }))(ToolbarForm)
