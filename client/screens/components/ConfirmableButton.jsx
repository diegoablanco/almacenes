import React, { Component } from 'react'
import { Popup, Confirm, Button } from 'semantic-ui-react'
import intl from 'react-intl-universal'
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
    if (onCancel) onCancel()
  }
  render() {
    const { confirmMessage, confirmHeader, onConfirm, onCancel, content, id, ...rest } = this.props
    const { open } = this.state
    return (
      [<Popup
        key={`popup${id}`}
        trigger={<Button
          {...rest}
          onClick={this.showDialog}
        />}
        content={content}
      />,
        <Confirm
          key={`confirm${id}`}
          content={confirmMessage}
          header={confirmHeader}
          open={open}
          cancelButton={intl.get('common.cancel')}
          confirmButton={{ content: intl.get('common.ok'), positive: true }}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          size="mini"
        />]
    )
  }
}
ConfirmableButton.propTypes = {
  onConfirm: PropTypes.func.isRequired
}

export default ConfirmableButton
