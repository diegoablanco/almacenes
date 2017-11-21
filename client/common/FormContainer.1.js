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
  componentDidMount(){
    const { initializeForm, formName, id , defaultData = {}} = this.props
    initializeForm(formName, id, defaultData)
  }  

  render() {
    const { formName, validate, selectors, onCreatedOrUpdated, extras } = this.props
    
    const rf = reduxForm({
      form: formName,
      validate: validate,
      destroyOnUnmount: false      
    })
    const forms = [].concat(this.props.form)
    
    return ( 
      <div>
        {forms.map((f, index) => {
        let ReduxForm = rf(connect(state => ({
          loading: selectors.getUiState(state).showModalLoadingIndicator,
          extras
        }))(this.innerForm(f)))
        return <ReduxForm key={formName + index} onSubmit={(values) => onCreatedOrUpdated(values, index === forms.length -1)} />
      }) }
    </div>
  )
  }
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