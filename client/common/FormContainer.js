import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Form } from 'semantic-ui-react'

class FormContainer extends Component {
  componentDidMount() {
    const { initializeForm, formName, id, defaultData = {} } = this.props
    initializeForm(formName, id, defaultData)
  }
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps)
  }
  innerForm(F) {
    return function ({ handleSubmit, loading, formContent, id, extras }) {
      return (
        <Form onSubmit={handleSubmit} loading={loading} >
          <F id={id} extras={extras} />
        </Form>)
    }
  }
  render() {
    const { id, formName, validate, selectors, onCreatedOrUpdated, loading, extras } = this.props

    const RForm = reduxForm({
      form: formName,
      //validate,
      onSubmit: onCreatedOrUpdated,
      extras,
      id,
      loading
    })(this.innerForm(this.props.form))
    return (<RForm />)
  }
}
FormContainer.propTypes = {
  form: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired
}
const mapStateToProps = (state, ownProps) => {
  const { id, showModalLoadingIndicator } = ownProps.selectors.getUiState(state)
  return {
    id,
    loading: showModalLoadingIndicator
  }
}

export default connect(mapStateToProps)(FormContainer)
