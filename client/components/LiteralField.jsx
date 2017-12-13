import React from 'react'
import PropTypes from 'prop-types'

export default function LiteralField({ input: { value } }) {
  return (
    <span>{value}</span>
  )
}
LiteralField.propTypes = {
  input: {
    value: PropTypes.any.isRequired
  }
}
