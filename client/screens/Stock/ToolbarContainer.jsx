import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ToolbarForm from './ToolbarForm'

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.filter = this.filter.bind(this)
    this.buildFilter = this.buildFilter.bind(this)
  }

  buildFilter({ search, status, customer }) {
    return {
      reference: search && {
        $like: `%${search}%`
      },
      customerId: customer,
      where: {
        status: status && status.map(x => x.id)
      }
    }
  }
  filter(values) {
    const { filterGrid } = this.props
    filterGrid(this.buildFilter(values))
  }
  render() {
    const { showFormModal, crudActions } = this.props

    return (
      <Menu>
        <Menu.Item>
          <ToolbarForm onSubmit={this.filter} {...{ crudActions }} />
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


const mapDispatchToProps = (dispatch, ownProps) => {
  const { crudActions } = ownProps
  return bindActionCreators(crudActions, dispatch)
}

export default connect(null, mapDispatchToProps)(Toolbar)
