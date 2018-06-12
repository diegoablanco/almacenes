import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm, formValueSelector } from 'redux-form'
import ProductForm from './Form'
import { productType } from '../../common/Validators'

export const formName = 'product'

const mapStateToProps = (state, ownProps) => {
  const { showModalLoadingIndicator, productCategoryLookup } = ownProps.selectors.getUiState(state)
  const { bindActions: {
    searchProductCategory, clearProductCategory }
  } = ownProps
  const getFormValues = formValueSelector(formName)
  return {
    validate: productType.validator,
    form: formName,
    loading: showModalLoadingIndicator,
    productCategoryLookup,
    productCategoryLookupActions: { search: searchProductCategory, clear: clearProductCategory },
    ...getFormValues(state, 'category')
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
