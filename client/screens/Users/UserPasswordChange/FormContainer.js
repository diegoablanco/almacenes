import {
  reduxForm
} from 'redux-form'
import {
  connect
} from 'react-redux'
import { bindActionCreators } from 'redux'
import Form from './Form'
import { userPasswordReset } from '../../../common/Validators'
import { changePassword } from '../../../actions/authentication'

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onSubmit: changePassword
}, dispatch)

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'UserPasswordChange',
  validate: userPasswordReset.validator
})(Form))
