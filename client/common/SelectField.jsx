import React, { Component } from 'react'
import { Dropdown, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class SelectField extends Component {
  constructor(props) {
    super(props)
    this.handleResultSelect = this.handleResultSelect.bind(this)
    this.state = {
      searchQuery: ''
    }
  }
  handleResultSelect(e, { value }) {
    const { input: { onChange }, multiple } = this.props
    onChange(multiple ? value.map(x => ({ id: x })) : value)
  }
  render() {
    const {
      meta: { touched, error },
      width,
      label,
      placeholder,
      multiple,
      options,
      input: { value }
    } = this.props
    const { searchQuery } = this.state
    return (
      <Form.Field className={classnames({ error: error !== undefined })} width={width}>
        <label>{label}</label>
        <Dropdown
          fluid
          selection
          search
          multiple
          options={options}
          value={multiple ? (value !== '' ? value : []).map(x => x.id) : value}
          placeholder={placeholder || label}
          onChange={this.handleResultSelect}
          onSearchChange={this.search}
          noResultsMessage={searchQuery !== '' ? 'No se encontraron resultados' : placeholder}
        />
        { error && <label className="error">{error}</label> }
      </Form.Field>
    )
  }
}

SelectField.defaultProps = {
  placeholder: '',
  width: null,
  multiple: false,
  options: []
}

SelectField.propTypes = {
  meta: PropTypes.object.isRequired,
  input: PropTypes.element.isRequired,
  width: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  options: PropTypes.array
}

export default SelectField
