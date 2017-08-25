import React, {Component} from 'react'
import { Input, Button, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { showModal, hideModal, setFilter } from '../../actions/customers'
import { renderField } from '../../utils/formHelpers'

class Toolbar extends Component {
  shouldComponentUpdate(){
    return false
  }

  filterForm = (props) => {
    const { handleSubmit, reset, submitting, invalid } = props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="name" 
            type="text"
            className='icon'
            icon='search' 
            label="Nombre"
            placeholder='Nombre'
            component={renderField}/>
        <Button primary type='submit' size='small' disabled={submitting} loading={submitting}>Filtrar</Button> 
      </form>
  )}

  handleSearch = (values) => {
    this.props.setFilter(values)
  }

  render(){
    const { handleOpenModal} = this.props  
    const ReduxForm = reduxForm({
      form: "filterCustomers",
      onSubmit: this.handleSearch,
    })(this.filterForm)

    return (
      <Menu>
        <Menu.Item>
          <ReduxForm />
        </Menu.Item>
        <Menu.Item position='right'>
          <Button.Group labeled>
              <Button icon='add' content='Agregar' onClick={handleOpenModal}  />
          </Button.Group>
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return state.ui.customers
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  setFilter: (filter) => {
    dispatch(setFilter(filter))
    ownProps.handleFilter()
  },
  handleOpenModal: () => dispatch(showModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)