import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import MomentLocaleUtils from 'react-day-picker/moment'
import { Form } from 'semantic-ui-react'
import classnames from 'classnames'
import 'react-day-picker/lib/style.css'

export default function ({ input, label, width, meta: { touched, error } }) {
  const { formatDate, parseDate } = MomentLocaleUtils
  function handleDayChange(day, modifiers) {
    input.onChange(day)
  }
  return (
    <Form.Field className={classnames({ error: touched && error })} width={width}>
      <label>{label}</label>
      <DayPickerInput
        dayPickerProps={{
          localeUtils: MomentLocaleUtils,
          locale: 'es'
        }}
        onDayChange={handleDayChange}
        placeholder={`${formatDate(new Date(), 'L', 'es')}`}
        formatDate={formatDate}
        parseDate={parseDate}
        value={input.value}
      />
      {touched && error && <label className="error">{error}</label>}
    </Form.Field>
  )
}
