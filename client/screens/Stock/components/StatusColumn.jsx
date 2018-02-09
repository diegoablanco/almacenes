import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Label } from 'semantic-ui-react'
import getUneditables from '../../../selectors/uneditables'

class StatusColumn extends Component {
  renderStatusLabel(status) {
    return (<Label color={status.color} horizontal>{status.description}</Label>)
  }
  render() {
    const { status, rowData: { onHold }, stockStatuses } = this.props
    const onHoldStatus = stockStatuses.find(x => x.code === 'onHold')
    return (
      <div>
        { !onHold && this.renderStatusLabel(status) }
        { onHold && this.renderStatusLabel(onHoldStatus) }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { stockStatuses } = getUneditables(state)
  return { stockStatuses }
}

export default connect(mapStateToProps)(StatusColumn)
