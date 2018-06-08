import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import StockAccountMovementForm from './Form'
import { stockAccountMovement } from '../../common/Validators'
import getUneditables from '../../selectors/uneditables'

export const formName = 'stockAccountMovement'
const mapStateToProps = (state, ownProps) => {
  const { showModalLoadingIndicator, stockMovementType } = ownProps.selectors.getUiState(state)
  const { data } = ownProps.selectors.getServiceState(state)
  const type = (data || {}).type
  const { stockMovementTypes } = getUneditables(state)
  return {
    validate: stockAccountMovement.validator,
    form: formName,
    loading: showModalLoadingIndicator,
    asyncBlurFields: ['products[].ean'],
    asyncChangeFields: [],
    extras: { stockMovementType: stockMovementType.code === 'edit' && type ? stockMovementTypes.find(x => x.code === type) : stockMovementType }
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
