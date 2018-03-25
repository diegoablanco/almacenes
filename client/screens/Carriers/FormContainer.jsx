import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import CarrierForm from './Form'
import { carrier } from '../../common/Validators'

export const formName = 'carrier'

const mapStateToProps = (state, ownProps) => {
  const { showModalLoadingIndicator } = ownProps.selectors.getUiState(state)
  return {
    extras: { phoneTypes: state.uneditables.queryResult.phoneTypes || [] },
    validate: carrier.validator,
    form: formName,
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
export default compose(connect(mapStateToProps, mapDispatchToProps), reduxForm())(CarrierForm)
