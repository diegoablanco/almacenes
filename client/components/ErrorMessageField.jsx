import React from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

export default function ErrorMessage({ input: { value }, meta: { error } }) {
  return (
    value !== '' && <Message error attached>{error}</Message>
  )
}
ErrorMessage.propTypes = {
  input: {
    value: PropTypes.any.isRequired
  }
}
