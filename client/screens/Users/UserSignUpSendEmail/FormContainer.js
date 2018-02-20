
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Form from './Form';
import usersClientValidations from '../../../../common/helpers/usersClientValidations';
import { resendEmailToken } from '../../../actions/authentication'

const mapDispatchToProps = (dispatch) => bindActionCreators({ resendEmailToken }, dispatch)

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'UserSignUpSendEmail',
  validate: usersClientValidations.forgotPwdSendEmail,
  onSubmit: ({ email }) => resendEmailToken(email)
})(Form))

