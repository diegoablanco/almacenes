import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import reduxifyServices, { getServicesStatus } from 'feathers-redux';
import { Message } from 'semantic-ui-react'
import style from './style.css'

class MessageBar extends Component {
    render(){
        const { show, text } = this.props
        return (
            show &&
            <Message
                success
                floating
                icon="check circle"
                header={text}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => state.ui.messageBar

const mapDispatchToProps = (dispatch, ownProps) => {
}

export default connect(
    mapStateToProps,
    null
  )
  (MessageBar);