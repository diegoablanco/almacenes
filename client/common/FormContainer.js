import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  reduxForm,
  SubmissionError,
  initialize
} from 'redux-form'
import { Form } from 'semantic-ui-react'
import { entityCreated, entityUpdated } from '../actions/messageBar'

class FormContainer extends Component {
  static propTypes = {
    service: PropTypes.object.isRequired,
    form: PropTypes.func.isRequired,
    formName: PropTypes.string.isRequired
  }
  static defaultProps = {
    onCreated: () => {},
    onUpdated: () => {}
  }
  shouldComponentUpdate(){
      return false
  }
  innerForm = ({handleSubmit, loading, formContent}) => {
    return(   
      <Form onSubmit={handleSubmit} loading={loading}>
        <this.props.form />
      </Form>)
  }
  componentDidMount(){
    const { initializeForm, formName, id , defaultData = {}} = this.props
    initializeForm(formName, id, defaultData)
  }
  
  handleSubmit = (values) => {
    const {update, create} = this.props
    values.id ? update(values) : create(values)
  }

  render() {
    const { formName, validate, selectors } = this.props
    const ReduxForm = reduxForm({
      form: formName,
      validate: validate,
      // asyncBlurFields: ['email', 'password'],
      // asyncValidate: (values, dispatch, props) => new Promise(...),
      onSubmit: this.handleSubmit
    })(connect(state => ({loading: selectors.getUiState(state).showModalLoadingIndicator}))(this.innerForm))
    return ( <ReduxForm /> )
  }
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.selectors.getUiState(state).id
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const { service, onCreated, onUpdated } = ownProps

  return {
    create: (values) => {
      dispatch(service.create(values)).then(() => {
        dispatch(entityCreated())
        onCreated()
      }) 
    },
    update: (values) => {
      dispatch(service.update(values.id, values)).then((result) => {
        dispatch(entityUpdated())
        onUpdated(result.value)
      })
    }    
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )
  (FormContainer);