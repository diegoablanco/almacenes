
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Form from './Form'
import usersClientValidations from '../../../../common/helpers/usersClientValidations'
import { resetPassword } from '../../../actions/authentication'

const mapDispatchToProps = (dispatch, ownProps) =>
  ({
    onSubmit: ({ password }) => dispatch(resetPassword(ownProps.resetToken, password))
  })

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: 'UserForgotPwdReset', validate: usersClientValidations.forgotPwdReset })(Form))
