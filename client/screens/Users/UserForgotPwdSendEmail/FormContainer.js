
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Form from './Form'
import schema from '../../../../common/validation/forgotPassword.json'
import getValidator from '../../../common/Validation'
import { sendResetPasswordEmail } from '../../../actions/authentication'

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onSubmit: sendResetPasswordEmail
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({
  form: 'UserForgotPwdSendEmail',
  validate: getValidator(schema)
})(Form))
