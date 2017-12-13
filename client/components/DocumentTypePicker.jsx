import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class DocumentTypePicker extends Component {
  render() {
    const { input: { onChange, value }, meta: { touched, error = false }, documentTypes } = this.props
    return (
      <span>
        <Dropdown
          inline
          options={documentTypes}
          placeholder="Seleccione el tipo de documento"
          onChange={(e, { value: newValue }) => onChange(newValue)}
          error={touched && error}
          value={value}
        />{': '}
      </span>
    )
  }
}
DocumentTypePicker.defaultProps = {
  input: {
    onChange: () => {}
  },
  meta: {
    touched: false,
    error: false
  }
}
DocumentTypePicker.propTypes = {
  input: {
    onChange: PropTypes.func.isRequired
  },
  meta: {
    touched: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
  },
  documentTypes: PropTypes.array.isRequired
}

const mapStateToProps = ({ uneditables: { queryResult: { documentTypes } } }) => ({
  documentTypes: documentTypes.map(x => ({ key: x.id, value: x.id, text: x.description }))
})

export default connect(mapStateToProps)(DocumentTypePicker)
