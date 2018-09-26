import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import moment from 'moment'
import MomentLocaleUtils from 'react-day-picker/moment'
import { Form } from 'semantic-ui-react'
import classnames from 'classnames'
import 'react-day-picker/lib/style.css'
import intl from 'react-intl-universal'
import { getFieldTranslationKey } from '../utils/formHelpers'
import { InputWithClearButton } from '.'

export default function ({ input, label, width, meta: { touched, error, form } }) {
  const { parseDate } = MomentLocaleUtils
  function formatDate(date, format = 'L', locale = 'es') {
    const m = moment(date)
    return m.locale(locale)
      .startOf('day')
      .format(Array.isArray(format) ? format[0] : format);
  }
  function handleDayChange(day, modifiers) {
    input.onChange(day)
  }
  if (label === undefined) {
    label = intl.get(getFieldTranslationKey(form, input.name)) || intl.get(`common.${input.name}`)
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
        component={InputWithClearButton(() => handleDayChange(''))}
        keepFocus={false}
        value={input.value && formatDate(input.value, 'L', 'es')}
      />
      {touched && error && <label className="error">{error}</label>}
    </Form.Field>
  )
}
