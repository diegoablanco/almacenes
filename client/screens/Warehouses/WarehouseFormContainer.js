import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import WarehouseForm from './WarehouseForm'
import { warehouse } from '../../common/Validators'

export const formName = 'warehouse'

const mapStateToProps = (state, ownProps) => {
  const { showModalLoadingIndicator } = ownProps.selectors.getUiState(state)
  return {
    extras: { phoneTypes: state.uneditables.queryResult.phoneTypes || [] },
    validate: warehouse.validator,
    form: formName,
    loading: showModalLoadingIndicator
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const { bindActions, id } = ownProps
  return {
    ...bindActions,
    onSubmit: bindActions.createOrUpdate,
    isEdit: id !== undefined
  }
}
export default compose(connect(mapStateToProps, mapDispatchToProps), reduxForm())(WarehouseForm)

