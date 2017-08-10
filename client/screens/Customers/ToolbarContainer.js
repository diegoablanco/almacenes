import React from 'react'
import { Input, Button, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { showModal, hideModal, setFilter } from '../../actions/customers'

const Toolbar = (props) => {
  const {handleSearch, handleOpenModal} = props
  return (
    <Menu>
      <Menu.Item>
        <Input className='icon' icon='search' placeholder='Buscar...' onChange={handleSearch}/>
      </Menu.Item>
      <Menu.Item position='right'>
        <Button.Group labeled>
            <Button icon='add' content='Agregar' onClick={handleOpenModal}  />
        </Button.Group>
      </Menu.Item>
    </Menu>
  )
}

const mapStateToProps = (state, ownProps) => {
    return state.ui.customers
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSearch: (value) => setFilter({ text: value }),
  handleOpenModal: () => dispatch(showModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)