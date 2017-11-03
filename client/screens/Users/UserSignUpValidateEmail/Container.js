
import { connect } from 'react-redux'
import Component from './Component'
import { bindActionCreators  } from 'redux'
import { validateSignUpEmailToken, resendEmailToken } from '../../../actions/authentication'
import { showLoadingMessage } from '../../../actions/messageBar'

const mapStateToProps = (state) => ({
  user: state.authManagement.data || {},
  loading: !state.authManagement.isFinished
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ 
    validateSignUpEmailToken, 
    resendEmailToken,
    showLoadingMessage
  },
  dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
