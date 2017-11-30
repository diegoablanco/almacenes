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
  shouldComponentUpdate(nextProps){
    const { extras } = this.props
    return extras != undefined && JSON.stringify(extras) !== JSON.stringify(nextProps.extras)
  }
  innerForm = (F) => ({handleSubmit, loading, formContent, id, extras}) => {
    return(   
      <Form onSubmit={handleSubmit} loading={loading} >
        <F id={id} extras={extras} />
      </Form>)
  }
  componentDidMount(){
    const { initializeForm, formName, id , defaultData = {}} = this.props
    initializeForm(formName, id, defaultData)
  }

  render() {
    const { formName, validate, selectors, onCreatedOrUpdated, extras } = this.props
    
    const Rf = reduxForm({
      form: formName,
      validate: validate,
      extras,
      onSubmit: onCreatedOrUpdated     
    })(this.innerForm(this.props.form))
    
    return ( 
        <Rf/>
    )
  }
}
FormContainer.propTypes = {
  form: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired
}
const mapStateToProps = (state, ownProps) => 
  {
    const {id, showModalLoadingIndicator} = ownProps.selectors.getUiState(state)
    return {
      id,
      loading: showModalLoadingIndicator
    }
}

export default connect(
  mapStateToProps
)(FormContainer)