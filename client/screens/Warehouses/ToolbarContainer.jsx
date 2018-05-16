import React, { Component } from 'react'
import { Button, Menu, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { renderSearchField } from '../../utils/formHelpers'

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.filterForm = this.filterForm.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
  }
  shouldComponentUpdate() {
    return false
  }
  resetFilter(reset) {
    return () => {
      const { filterGrid } = this.props
      reset()
      filterGrid()
    }
  }
  filterForm(props) {
    const { handleSubmit, reset } = props
    return (
      <Form onSubmit={handleSubmit}>
        <Field
          name="search"
          type="text"
          placeholder="Buscar por nombre ..."
          component={renderSearchField}
          reset={this.resetFilter(reset)}
        />
      </Form>
    )
  }

  buildFilter({ search }) {
    return search && {
      name: {
        $like: `%${search}%`
      }
    }
  }

  render() {
    const { filterGrid, showFormModal } = this.props
    const ReduxForm = reduxForm({
      form: 'filterWarehouses',
      onSubmit: values => filterGrid(this.buildFilter(values)),
      destroyOnUnmount: false
    })(this.filterForm)

    return (
      <Menu>
        <Menu.Item>
          <ReduxForm />
        </Menu.Item>
        <Menu.Item position="right">
          <Button.Group labeled>
            <Button icon="add" positive content="Agregar" onClick={() => showFormModal()} />
          </Button.Group>
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => state.ui.warehouses
const mapDispatchToProps = (dispatch, ownProps) => {
  const { crudActions } = ownProps
  return bindActionCreators(crudActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
