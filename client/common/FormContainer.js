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
  componentDidMount(){
    const { id } = this.props
    if(id){
      const { id, get, initializeFromData } = this.props
      get(id).then((response) => initializeFromData(response.value))
    }
  }
  
  handleSubmit = (values) => {
    const {update, create} = this.props
    values._id ? update(values) : create(values)
  }

  render() {
    const { formName, validate } = this.props
    const ReduxForm = reduxForm({
      form: formName,
      validate: validate,
      // asyncBlurFields: ['email', 'password'],
      // asyncValidate: (values, dispatch, props) => new Promise(...),
      onSubmit: this.handleSubmit,
    })(this.props.form)
    return ( <ReduxForm /> )
  }
}

const mapStateToProps = (state, ownProps) => ({
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
      dispatch(service.update(values._id, values)).then((result) => {
        dispatch(entityUpdated())
        onUpdated(result.value)
      })
    },
    get: (id) => dispatch(service.get(id)),
    initializeFromData: (data) => {
      const {formName} = ownProps
      dispatch(initialize(formName, data))
    }    
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )
  (FormContainer);