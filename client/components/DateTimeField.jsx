import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import MomentLocaleUtils from 'react-day-picker/moment'
import { Form } from 'semantic-ui-react'
import classnames from 'classnames'
import 'react-day-picker/lib/style.css'
import intl from 'react-intl-universal'
import { getFieldTranslationKey } from '../utils/formHelpers'

export default function ({ input, label, width, meta: { touched, error, form } }) {
  const { formatDate, parseDate } = MomentLocaleUtils
  function handleDayChange(day, modifiers) {
    input.onChange(day)
  }
  if (label === undefined) {
    label = intl.get(getFieldTranslationKey(form, input.name))
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
        placeholder={intl.get(getFieldTranslationKey('common', 'select'))}
        formatDate={formatDate}
        parseDate={parseDate}
        value={input.value && formatDate(input.value, 'L', 'es')}
      />
      {touched && error && <label className="error">{error}</label>}
    </Form.Field>
  )
}
