import React, {Component} from 'react'
import { Input, Button, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators  } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { renderSearchField } from '../../utils/formHelpers'

class Toolbar extends Component {
  shouldComponentUpdate(){
    return false
  }
  
  filterForm = (props) => {
    const { handleSubmit, reset } = props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="search" 
            type="text"
            placeholder='Buscar por Nombre'
            component={renderSearchField}
            reset={reset}/>
      </form>
  )}

  buildFilter({search}){
    return search && {
      companyName: {
        $like: `%${search}%`
      }
    }
  }

  render(){
    const { filterGrid, showFormModal } = this.props
    const ReduxForm = reduxForm({
      form: "filterCustomers",
      onSubmit: values => filterGrid(this.buildFilter(values)),
    })(this.filterForm)

    return (
      <Menu>
        <Menu.Item>
          <ReduxForm />
        </Menu.Item>
        <Menu.Item position='right'>
          <Button.Group labeled>
              <Button icon='add' content='Agregar' positive onClick={() => showFormModal()}  />
          </Button.Group>
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return state.ui.warehouses
}
const mapDispatchToProps = (dispatch, ownProps) => {
    const {crudActions} = ownProps
    return bindActionCreators(crudActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)