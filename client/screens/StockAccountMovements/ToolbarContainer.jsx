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

  filterForm(props) {
    const { handleSubmit, reset } = props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="search"
          type="text"
          placeholder="Buscar por descripción ..."
          component={renderSearchField}
          reset={reset}
        />
      </form>
    )
  }
  buildFilter({ search }) {
    return search && {
      description: {
        $like: `%${search}%`
      }
    }
  }

  render() {
    const { filterGrid, showFormModal, showReportModal } = this.props
    const ReduxForm = reduxForm({
      form: 'filterProducts',
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
            <Button color="black" size="small" icon="file excel outline" content="Generar Reporte" onClick={() => showReportModal()} />
            <Button icon="sign in" content="Entrada" positive onClick={() => showFormModal(null, 'receive')} />
            <Button icon="sign out" content="Salida" color="blue" onClick={() => showFormModal(null, 'issue')} />
          </Button.Group>
        </Menu.Item>
      </Menu>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { crudActions } = ownProps
  return bindActionCreators(crudActions, dispatch)
}

export default connect(null, mapDispatchToProps)(Toolbar)
