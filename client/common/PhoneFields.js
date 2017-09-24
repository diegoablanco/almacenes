import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray } from 'redux-form'
import { Button, Form, Grid, Divider, Tab, Segment } from 'semantic-ui-react'
import { renderField, renderSelect, formFields } from '../utils/formHelpers'

class PhoneFields extends Component {
  renderPhoneFields = phone => {
    const { options } = this.props
    return (      
      <Form.Group widths="equal">
        <Field name={`${phone}.number`}
            label="Número"
            iconPosition='left' 
            component={renderField}/>      
        <Field name={`${phone}.type`}
            label="Tipo"
            iconPosition='left' 
            component={renderSelect}
            options={options.map(option => ({key: option.id, value: option.id, text: option.description }))}/>
      </Form.Group>
    )
  }
  render(){
      const { fields, meta } = this.props
      return formFields("Teléfono", this.renderPhoneFields)({fields, meta})
  }
}

const mapStateToProps = (state) => ({
  options: state.phoneTypes.queryResult
})

export default connect(mapStateToProps)(PhoneFields)