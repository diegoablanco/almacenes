import React from 'react'
import PropTypes from 'prop-types'
import { Progress } from 'semantic-ui-react'

export default function ProgressBar({ input: { value } }) {
  return (
    value !== '' && <Progress percent={value} attached="bottom" autoSuccess />
  )
}
ProgressBar.propTypes = {
  input: {
    value: PropTypes.any.isRequired
  }
}
