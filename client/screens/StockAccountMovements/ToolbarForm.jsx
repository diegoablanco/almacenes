import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { Form, Button, Segment } from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import { renderField } from '../../utils/formHelpers'
import { stocks as selectors } from '../../selectors'
import getUneditables from '../../selectors/uneditables'
import SelectField from '../../common/SelectField'
import LookupSelectField from '../../components/LookupSelectField'
import { DateTimeField } from '../../components'

class ToolbarForm extends Component {
  constructor(props) {
    super(props)
    this.resetFilter = this.resetFilter.bind(this)
  }
  resetFilter() {
    const { reset, filterGrid } = this.props
    reset()
    filterGrid()
  }
  render() {
    const {
      types,
      reset,
      handleSubmit,
      pristine,
      submitting
    } = this.props
    return (
      <Form onSubmit={handleSubmit}>
        <Segment attached="top">
          Filtros
        </Segment>
        <Segment attached>
          <Field
            name="receipt"
            type="text"
            component={renderField}
            reset={reset}
          />
          <Field
            name="dateFrom"
            component={DateTimeField}
          />
          <Field
            name="dateTo"
            component={DateTimeField}
          />
          <Field
            name="type"
            component={SelectField}
            options={types}
            multiple
          />
        </Segment>
        <Segment attached="bottom" clearing>
          <Button.Group labeled floated="right">
            <Button basic color="grey" type="button" disabled={pristine || submitting} onClick={this.resetFilter} size="small">Borrar filtros</Button>
            <Button primary type="submit" size="small">Filtrar</Button>
          </Button.Group>
        </Segment>
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
  const { crudActions: { searchFilterCustomer, clearFilterCustomer, filterGrid } } = ownProps
  return bindActionCreators({ searchFilterCustomer, clearFilterCustomer, filterGrid }, dispatch)
}

export default compose(connect(mapStateToProps, mapDispatchToProps), reduxForm({
  form: 'filterStockAccountMovement',
  destroyOnUnmount: false
}))(ToolbarForm)
