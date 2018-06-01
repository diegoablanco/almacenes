import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import ProductForm from './Form'
import { product } from '../../common/Validators'

export const formName = 'product'

const mapStateToProps = (state, ownProps) => {
  const { showModalLoadingIndicator } = ownProps.selectors.getUiState(state)
  return {
    validate: product.validator,
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
export default compose(connect(mapStateToProps, mapDispatchToProps), reduxForm())(ProductForm)
