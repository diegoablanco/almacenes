
import { reduxForm, SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import errors from 'feathers-errors'

import { config } from '../../../utils/config'
import Form from './Form'
import schema from '../../../../common/Validation/forgotPassword.json'
import getValidator from '../../../common/Validation'
import { bindActionCreators  } from 'redux'
import { sendResetPasswordEmail } from '../../../actions/authentication'

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onSubmit: sendResetPasswordEmail
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(
  reduxForm({
    form: 'UserForgotPwdSendEmail',
    validate: getValidator(schema),
  })(Form)
)
