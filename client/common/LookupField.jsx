import React from 'react'
import { Search } from 'semantic-ui-react'

export default function (props) {
  const { lookupState: { isLoading, queryResult}, lookupActions: { search }} = props
  const [lookupField] = props.names[0].split('.')
  const { description: { input: { value } } } = props[lookupField]
  return (<Search
    loading={isLoading}
    onResultSelect={(event, { value: selectedValue }) => onChange(selectedValue)}
    onSearchChange={(event, { value: searchText }) => search(searchText)}
    results={queryResult}
    value={value}
  />)
}
