
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getFeathersStatus } from '../../feathers';
import { Message } from 'semantic-ui-react'

class MessageBar extends Component {
  static propTypes = {
    message: PropTypes.string, // optional message to display
    servicesRootState: PropTypes.object.isRequired, // parent of all services' states
  }
  render(){
    const barMessage = this.props.message || getFeathersStatus(this.props.servicesRootState).message;

    return !barMessage && <Message content={barMessage} />;

  }
};

const mapStateToProps = (state, ownProps) => ({
  servicesRootState: state,
  message: ownProps.message,
});

export default connect(mapStateToProps)(MessageBar);
