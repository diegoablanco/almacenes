import {
  reduxForm
} from 'redux-form'
import {
  connect
} from 'react-redux'
import { bindActionCreators } from 'redux'
import Form from './Form'
import usersClientValidations from '../../../../common/helpers/usersClientValidations'
import { changePassword } from '../../../actions/authentication'

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onSubmit: changePassword
}, dispatch)

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'UserPasswordChange',
  validate: usersClientValidations.changePassword
})(Form))
