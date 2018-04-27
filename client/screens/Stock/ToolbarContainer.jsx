import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Toolbar extends Component {
  render() {
    const { showFormModal } = this.props

    return (
      <Menu>
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


const mapDispatchToProps = (dispatch, ownProps) => {
  const { crudActions } = ownProps
  return bindActionCreators(crudActions, dispatch)
}

export default connect(null, mapDispatchToProps)(Toolbar)
