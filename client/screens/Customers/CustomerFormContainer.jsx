import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import CustomerForm from './CustomerForm'
import { customer } from '../../common/Validators'

export const formName = 'Customer'

const mapStateToProps = (state, ownProps) => {
  const { showModalLoadingIndicator } = ownProps.selectors.getUiState(state)
  return {
    extras: { phoneTypes: state.uneditables.queryResult.phoneTypes || [] },
    form: formName,
    validate: customer.validator,
    loading: showModalLoadingIndicator
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const { bindActions } = ownProps
  return {
    ...bindActions,
    onSubmit: bindActions.createOrUpdate
  }
}
export default compose(connect(mapStateToProps, mapDispatchToProps), reduxForm())(CustomerForm)
