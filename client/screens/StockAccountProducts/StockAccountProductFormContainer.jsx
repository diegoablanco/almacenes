import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { warehouseService } from '../../common/Validators'
import WarehouseServiceForm from './WarehouseServiceForm';

export const formName = 'WarehouseService'

const mapStateToProps = (state, ownProps) => {
  const { showModalLoadingIndicator } = ownProps.selectors.getUiState(state)
  return {
    form: formName,
    loading: showModalLoadingIndicator,
    validate: warehouseService.validator
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const { bindActions } = ownProps
  return {
    ...bindActions,
    onSubmit: bindActions.createOrUpdate
  }
}
export default compose(connect(mapStateToProps, mapDispatchToProps), reduxForm())(WarehouseServiceForm)
