
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Form from './Form'
import usersClientValidations from '../../../../common/helpers/usersClientValidations'
import { registerUser, validateUser } from '../../../actions/authentication'
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
  validate: usersClientValidations.signup
})(Form))
