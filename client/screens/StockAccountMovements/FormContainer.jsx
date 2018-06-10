import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import StockAccountMovementForm from './Form'
import { stockAccountMovement } from '../../common/Validators'

export const formName = 'stockAccountMovement'
const mapStateToProps = (state, ownProps) => {
  const { showModalLoadingIndicator, stockMovementType } = ownProps.selectors.getUiState(state)
  return {
    validate: stockAccountMovement.validator,
    form: formName,
    loading: showModalLoadingIndicator,
    asyncBlurFields: ['products[].type.ean'],
    asyncChangeFields: [],
    extras: { stockMovementType }
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const { bindActions: { validateProducts, focusLastRowField, ...bindActions } } = ownProps
  return {
    ...bindActions,
    onSubmit: bindActions.createOrUpdate,
    asyncValidate: validateProducts,
    //extras: { ...ownProps.extras, focusLastRowField }
  }
}
export default compose(connect(mapStateToProps, mapDispatchToProps), reduxForm({
}))(StockAccountMovementForm)
