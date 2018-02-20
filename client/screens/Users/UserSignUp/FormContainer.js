
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Form from './Form'
import usersClientValidations from '../../../../common/helpers/usersClientValidations'
import { registerUser, validateUser } from '../../../actions/authentication'

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    onSubmit: registerUser,
    asyncValidate: validateUser },
  dispatch
)

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'UserSignUp',
  asyncBlurFields: ['username', 'email'],
  validate: usersClientValidations.signup
})(Form))
