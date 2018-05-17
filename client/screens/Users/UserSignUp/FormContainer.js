
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Form from './Form'
import { registerUser, validateUser } from '../../../actions/authentication'
import { signUp } from '../../../common/Validators'
import { uneditables } from '../../../selectors'

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    onSubmit: registerUser,
    asyncValidate: validateUser },
  dispatch
)

const mapStateToProps = state => {
  const { roles } = uneditables(state)
  return { roles }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'UserSignUp',
  asyncBlurFields: ['username', 'email'],
  validate: signUp.validator,
  initialValues: { roles: [{ id: 2 }] }
})(Form))
