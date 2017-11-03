
import { reduxForm, SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import errors from 'feathers-errors'

import { feathersServices } from '../../../feathers'
import Form from './Form'
import usersClientValidations from '../../../../common/helpers/usersClientValidations'
import { resetPassword } from '../../../actions/authentication'

const mapDispatchToProps = (dispatch, ownProps) => 
({
  onSubmit: ({password}) => dispatch(resetPassword(ownProps.resetToken, password))
})

export default connect(
  null,
  mapDispatchToProps
)(
  reduxForm({
    form: 'UserForgotPwdReset',
    validate: usersClientValidations.forgotPwdReset
  })(Form)
)
