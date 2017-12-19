import React from 'react'
import PropTypes from 'prop-types'
import { Progress } from 'semantic-ui-react'

export default function ProgressBar({ input: { value }, meta: { error } }) {
  return (
    value !== '' && <Progress percent={value} autoSuccess attached="bottom" error={error} />
  )
}
ProgressBar.propTypes = {
  input: {
    value: PropTypes.any.isRequired
  }
}
