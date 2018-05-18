import React, { Component } from 'react'
import { Popup, Confirm, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class ConfirmableButton extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.showDialog = this.showDialog.bind(this)
    this.hideDialog = this.hideDialog.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  showDialog() {
    this.setState({ open: true })
  }
  hideDialog() {
    this.setState({ open: false })
  }
  handleConfirm() {
    const { onConfirm } = this.props
    this.hideDialog()
    onConfirm()
  }
  handleCancel() {
    const { onCancel } = this.props
    this.hideDialog()
    onCancel()
  }
  render() {
    const { confirmMessage, onConfirm, onCancel, content, ...rest } = this.props
    const { open } = this.state
    return (
      [<Popup
        trigger={<Button
          {...rest}
          onClick={this.showDialog}
        />}
        content={content}
      />,
        <Confirm
          content={confirmMessage}
          open={open}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />]
    )
  }
}
ConfirmableButton.propTypes = {
  onConfirm: PropTypes.func.isRequired
}

export default ConfirmableButton
