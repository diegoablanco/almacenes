import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { Form } from 'semantic-ui-react'
import classnames from 'classnames'
import 'react-day-picker/lib/style.css'

import {
  formatDate,
  parseDate
} from 'react-day-picker/moment'

export default function ({ input, label, width, meta: { touched, error } }) {
  function handleDayChange(day, modifiers) {
    input.onChange(day.toISOString())
  }
  return (
    <Form.Field className={classnames({ error: touched && error })} width={width}>
      <label>{label}</label>
      <DayPickerInput
        formatDate={formatDate}
        parseDate={parseDate}
        onDayChange={handleDayChange}
        placeholder={`${formatDate(new Date())}`}
      />
      {touched && error && <label className="error">{error}</label>}
    </Form.Field>
  )
}
