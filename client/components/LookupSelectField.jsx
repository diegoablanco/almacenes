import React, { Component } from 'react'
import { Dropdown, Label, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class LookupField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: ''
    }
    this.handleResultSelect = this.handleResultSelect.bind(this)
    this.reset = this.reset.bind(this)
    this.search = this.search.bind(this)
  }
  handleResultSelect(e, { value }) {
    const { input } = this.props
    input.onChange(value)
  }
  reset() {
    const { input } = this.props
    input.onChange('')
  }
  search(event, { searchQuery }) {
    const { lookupActions: { search }, input } = this.props
    input.onChange(searchQuery)
    this.setState({ searchQuery })
    search(searchQuery)
  }
  resultRenderer({ id, description }) {
    return (<Label content={description} key={id} />)
  }

  render() {
    const {
      input: { value },
      meta: { touched, error },
      lookupState: { isLoading, queryResult = [] },
      width,
      label,
      placeholder,
      initialValue
    } = this.props
    const { searchQuery } = this.state
    let options = (queryResult || []).map(result => ({ key: result.id, value: result.id, text: result.description }))
    if (value && !options.find(x => x.key === value) && initialValue) {
      options = [...options, { ...initialValue, value: initialValue.key }]
    }
    return (
      <Form.Field className={classnames({ error: touched && error })} width={width}>
        <label>{label}</label>
        <Dropdown
          fluid
          selection
          multiple={false}
          search
          options={options}
          value={value}
          placeholder={placeholder || label}
          onChange={this.handleResultSelect}
          onSearchChange={this.search}
          loading={isLoading}
          noResultsMessage={searchQuery !== '' ? 'No se encontraron resultados' : placeholder}
        />
        { touched && error && <label className="error">{error}</label> }
      </Form.Field>
    )
  }
}

LookupField.defaultProps = {
  placeholder: '',
  width: null
}

LookupField.propTypes = {
  meta: PropTypes.object.isRequired,
  input: PropTypes.element.isRequired,
  width: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  lookupActions: PropTypes.object.isRequired,
  lookupState: PropTypes.object.isRequired
}

export default LookupField
