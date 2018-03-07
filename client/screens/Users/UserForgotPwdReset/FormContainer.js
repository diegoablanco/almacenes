
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Form from './Form'
import { resetPassword } from '../../../actions/authentication'
import { userPasswordReset } from '../../../common/Validators'

const mapDispatchToProps = (dispatch, ownProps) =>
  ({
    onSubmit: ({ password }) => dispatch(resetPassword(ownProps.resetToken, password))
  })

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: 'UserForgotPwdReset', validate: userPasswordReset.validator })(Form))
