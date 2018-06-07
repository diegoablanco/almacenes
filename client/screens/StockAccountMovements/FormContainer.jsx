import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import StockAccountMovementForm from './Form'
import { stockAccountMovement } from '../../common/Validators'

export const formName = 'stockAccountMovement'
function getValidatorByMovementType(movementType) {
  if (movementType === 'issue') {
    return stockAccountMovement.issue
  }
  if (movementType === 'release') {
    return stockAccountMovement.receive
  }
  return stockAccountMovement.issue
}

function validator(values, propsToValidate) {
  return getValidatorByMovementType(values.movementType)(values, propsToValidate)
}
const mapStateToProps = (state, ownProps) => {
  const { showModalLoadingIndicator } = ownProps.selectors.getUiState(state)
  return {
    validate: validator,
    form: formName,
    loading: showModalLoadingIndicator,
    asyncBlurFields: ['products[].ean'],
    asyncChangeFields: []
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const { bindActions: { validateProducts, ...bindActions } } = ownProps
  return {
    ...bindActions,
    onSubmit: bindActions.createOrUpdate,
    asyncValidate: validateProducts
  }
}
export default compose(connect(mapStateToProps, mapDispatchToProps), reduxForm({
}))(StockAccountMovementForm)
