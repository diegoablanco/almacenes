import { connect } from 'react-redux';
import CustomerList from './CustomerList'

const loadCustomers = (startCustomerName, isGte) => {
  const query = {
    name: { [isGte ? '$gte' : '$gt']: startCustomerName },
    $sort: { name: 1 },
    $limit: 10,
    $select: ['id', '_id', 'username', 'roles'],
  };

  return feathersServices.customers.find({ query });
};

const mapStateToProps = (state, ownProps) => {
  const queryResult = state.customers.queryResult || {};

  initialValues = {
    filter: getFormValue(state, 'filter') || '',
    customers: queryResult.data || [],
  };

  return {
    initialValues,
  };

}
const mapDispatchToProps = (dispatch, ownProps) => ({
  getList: () => {
    dispatch(loadCustomers(initialValues.filter, true))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);