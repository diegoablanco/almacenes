import React, { Component } from 'react'
import { Dropdown, Label, Form, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import intl from 'react-intl-universal'
import { renderLabel, getFieldTranslationKey } from '../utils/formHelpers'

class LookupField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: ''
    }
    this.reset = this.reset.bind(this)
    this.search = this.search.bind(this)
    this.getIcons = this.getIcons.bind(this)
    this.handleResultSelect = this.handleResultSelect.bind(this)
  }
  getIcons2() {
    const { input: { value } } = this.props
    return (<div style={{ float: 'right' }}>
      { value && <Icon name="delete" onClick={this.reset} /> }
      <Icon name="dropdown" />
            </div>)
  }
  getIcons() {
    const { input: { value } } = this.props
    const icon = value
      ? <Icon name="delete" onClick={this.reset} circular />
      : <Icon name="dropdown" className="dropdown" onClick={this.toggleOpenState} />
    return icon
  }
  resultRenderer({ id, description }) {
    return (<Label content={description} key={id} />)
  }
  search(event, { searchQuery }) {
    const { lookupActions: { search }, input } = this.props
    input.onChange(searchQuery)
    this.setState({ searchQuery })
    search(searchQuery)
  }
  reset() {
    const { input } = this.props
    input.onChange('')
    this.dropdown.state.open = true
  }
  handleResultSelect(e, { value }) {
    const { input, onResultSelect } = this.props
    input.onChange(value)
    if (onResultSelect) {
      onResultSelect(value)
    }
  }
  render() {
    const {
      input: { value, name },
      meta: { touched, error, form },
      lookupState: { isLoading, queryResult = [] },
      width,
      placeholder,
      initialValue,
      required,
      disabled = false
    } = this.props
    const label = intl.get(getFieldTranslationKey(form, name))
    const { searchQuery, open } = this.state
    let options = (queryResult || []).map(result => ({ key: result.id, value: result.id, text: result.description }))
    if (value && !options.find(x => x.key === value) && initialValue) {
      options = [...options, { ...initialValue, value: initialValue.key }]
    }
    return (
      <Form.Field className={classnames({ error: touched && error })} width={width}>
        { renderLabel({ label, required })}
        <Dropdown
          fluid
          selection
          multiple={false}
          search
          options={options}
          value={value}
          placeholder={placeholder || intl.get('common.searchPlaceholder')}
          onChange={this.handleResultSelect}
          onSearchChange={this.search}
          loading={isLoading}
          noResultsMessage={searchQuery !== '' ? 'No se encontraron resultados' : placeholder}
          icon={this.getIcons()}
          ref={dropdown => { this.dropdown = dropdown }}
          disabled={disabled}
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
  lookupActions: PropTypes.object.isRequired,
  lookupState: PropTypes.object.isRequired
}

export default LookupField
