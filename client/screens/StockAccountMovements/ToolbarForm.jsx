import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { Form, Button, Segment } from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import { renderField } from '../../utils/formHelpers'
import getUneditables from '../../selectors/uneditables'
import SelectField from '../../common/SelectField'
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
      stockMovementTypes,
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
            options={stockMovementTypes}
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
  const { stockMovementTypes } = getUneditables(state)
  return {
    stockMovementTypes: stockMovementTypes.filter(({ code }) => ['receive', 'issue'].includes(code)).map(x => ({ key: x.id, value: x.id, text: x.description }))
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { crudActions: { filterGrid } } = ownProps
  return bindActionCreators({ filterGrid }, dispatch)
}

export default compose(connect(mapStateToProps, mapDispatchToProps), reduxForm({
  form: 'filterStockAccountMovement',
  destroyOnUnmount: false
}))(ToolbarForm)
