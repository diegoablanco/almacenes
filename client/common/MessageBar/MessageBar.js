import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import reduxifyServices, { getServicesStatus } from 'feathers-redux';
import { Message, Icon } from 'semantic-ui-react'
import style from './style.css'

class MessageBar extends Component {
    static defaultProps = {
        messageType: "info"
    }
    render(){
        const { show, text, messageType } = this.props
        const messageConfig = this.getMessageConfig(messageType)
        return (
            show &&
            <div className="messages">
                <Message
                    {...messageConfig.message}
                    floating
                    icon>
                    <Icon {...messageConfig.icon} />
                    <Message.Header>
                        {text}
                    </Message.Header>
                </Message>
            </div>
        )
    }
    getMessageConfig(messageType){
        switch(messageType){
            case "info":
                return {
                    message: { },
                    icon:{ name: "attention" }
                }
            case "success":
                return {
                    message: { success: true },
                    icon:{ name: "checkmark" }
                }
            case "error":
                return {
                    message: {error: true},
                    icon:{ name: "remove" }
                }
            case "loading":
                return {
                    message: {},
                    icon:{ name: "circle notched", loading: true }
                }
        }
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