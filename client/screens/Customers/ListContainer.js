import { connect } from 'react-redux';
import { feathersServices } from '../../feathers';
import CustomerList from './CustomerList'

const loadCustomers = () => {
  const query = {
    $sort: { name: 1 },
    $limit: 10,
    $select: ['_id', 'name', 'email', 'phone'],
  };

  return feathersServices.customers.find({ query });
};

const mapStateToProps = (state, ownProps) => ({
    customers: state.customers
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  getList: () => {
    dispatch(loadCustomers())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);