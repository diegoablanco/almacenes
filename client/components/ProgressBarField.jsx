import React from 'react'
import PropTypes from 'prop-types'
import { Progress } from 'semantic-ui-react'

export default function ProgressBar({ input: { value }, meta: { error } }) {
  return (
    value !== '' && <Progress percent={value} autoSuccess error={error} size="tiny">
      {(error !== '' && <label className="error">{error}</label>)}
    </Progress>
  )
}
ProgressBar.propTypes = {
  input: {
    value: PropTypes.any.isRequired
  }
}
