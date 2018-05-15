import React from 'react'
import { Input } from 'semantic-ui-react'


function InputWithClearButton({ type, handleClear, ...props }) {
  return (<Input
    icon={{ name: 'delete', onClick: handleClear, link: true, circular: true }}
    {...props}
  />)
}

export default (handleClear) => props => (<InputWithClearButton {...props} handleClear={handleClear} />)
