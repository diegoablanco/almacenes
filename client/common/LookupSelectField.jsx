import React, { Component } from 'react'
import { Dropdown, Label, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class LookupField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: '',
      value: null
    }

    this.handleResultSelect = this.handleResultSelect.bind(this)
    this.reset = this.reset.bind(this)
    this.search = this.search.bind(this)
  }
  componentWillReceiveProps({ initialValue }) {
    if (initialValue && this.props.initialValue === undefined) {
      const { key: value } = initialValue
      this.handleResultSelect(null, { value, options: [{ ...initialValue, value }] })
    }
  }
  handleResultSelect(e, { value }) {
    const { input } = this.props
    input.onChange(value)
    this.setState({ value })
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
      meta: { touched, error },
      lookupState: { isLoading, queryResult },
      width,
      label,
      placeholder
    } = this.props
    const { value, searchQuery } = this.state
    const options = (queryResult || [])
      .map(result => ({ key: result.id, value: result.id, text: result.description }))
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
