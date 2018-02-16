import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { renderSearchField } from '../../utils/formHelpers'

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.filterForm = this.filterForm.bind(this)
  }
  shouldComponentUpdate() {
    return false
  }

  filterForm({ handleSubmit, reset }) {
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="search"
          type="text"
          placeholder="Buscar por Referencia"
          component={renderSearchField}
          reset={reset}
        />
      </form>
    )
  }

  buildFilter({ search }) {
    return search && {
      reference: {
        $like: `%${search}%`
      }
    }
  }

  render() {
    const { filterGrid, showFormModal, stockMovementTypes } = this.props
    const ReduxForm = reduxForm({
      form: 'filterStock',
      onSubmit: values => filterGrid(this.buildFilter(values))
    })(this.filterForm)

    return (
      <Menu>
        <Menu.Item>
          <ReduxForm />
        </Menu.Item>
        <Menu.Item position="right">
          <Button.Group labeled>
            <Button icon="add" content="Pre Alerta" color="yellow" onClick={() => showFormModal(null, 'preReceive')} />
            <Button icon="add" content="Alta" positive onClick={() => showFormModal(null, 'receive')} />
          </Button.Group>
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
})
const mapDispatchToProps = (dispatch, ownProps) => {
  const { crudActions } = ownProps
  return bindActionCreators(crudActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
