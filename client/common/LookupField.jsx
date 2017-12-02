import React, { Component } from 'react'
import { Search, Label, Form } from 'semantic-ui-react'
import classnames from 'classnames'
import style from './LookupField.css'

export default class LookupField extends Component {
  constructor (props){
    super(props)
    this.state = {
      focused: false,
      selected: false
    }
    const { names} = this.props
    const [lookupField] = names[0].split('.')
    this.lookupField = this.props[lookupField]
  }
  handleFocus = () => {
    this.setState({focused: true})
  }
  handleBlur = () => {
    this.setState({focused: false})
  }
  handleResultSelect = (e, { result }) => {
    const { id: { input: idInput }, description: { input: descriptionInput } } = this.lookupField
    const { lookupActions: { clear } } = this.props
    idInput.onChange(result.id)
    descriptionInput.onChange(result.description)
    this.setState({selected: true})
    clear()
  }
  reset = () => {
    const { id: { input: idInput }, description: { input: descriptionInput } } = this.lookupField
    const { lookupActions: { clear } } = this.props
    idInput.onChange('')
    descriptionInput.onChange('')
    this.setState({selected: false})
    clear()
  }
  search = (event, { value: searchText }) => {
    const { lookupActions: { search }} = this.props
    const { description: { input } } = this.lookupField
    input.onChange(searchText)
    search(searchText)
  }
  resultRenderer({ id, description }){
    return (<Label content={description} key={id}/>)
  }
  cancelIcon = {
    name: 'cancel', 
    link: true, 
    onClick: () => this.reset()
  }
  searchIcon = {
    name: 'search'
  }
  render() {
    const { lookupState: { isLoading, queryResult}, names, lookupValue, label, placeholder} = this.props
    const [lookupField] = names[0].split('.')
    const { description: { input, meta: { touched, error }, width } } = this.lookupField
    const { selected, focused } = this.state
    return (
      <Form.Field className={classnames({ error: touched && error })} width={width}>
        <label>{label}</label>
        <Search
          loading={focused && isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.search}
          results={queryResult}
          resultRenderer={this.resultRenderer}
          value={lookupValue}
          placeholder={placeholder || label}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          icon={selected ? this.cancelIcon : this.searchIcon}
          disabled={selected}
          noResultsMessage="No se encontraron resultados"
        />
        {touched && error && <label className="error">{error}</label>}
      </Form.Field>
      )
  }
}
