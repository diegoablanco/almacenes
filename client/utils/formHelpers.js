import React from 'react'
import { Button, Form, Divider, Segment, Input, TextArea, Grid, Checkbox } from 'semantic-ui-react'
import classnames from 'classnames'


export function renderField({ input, label, type = 'text', width, meta: { touched, error }, ...rest }) {
  return (
    <Form.Field className={classnames({ error: touched && error })} width={width}>
      <label>{label}</label>
      <Input {...input} {...rest} placeholder={label} type={type} />
      {touched && error && <label className="error">{error}</label>}
    </Form.Field>
  )
}

export function renderRadio({ input, width, meta: { touched, error }, radioValue, currentValue, ...rest }) {
  function handleChange(e, { value }) {
    input.onChange(radioValue)
  }
  return (
    <Form.Field className={classnames({ error: touched && error })} width={width}>
      <Checkbox
        {...rest}
        onChange={handleChange}
        radio
        checked={currentValue === radioValue}
      />
      {touched && error && <label className="error">{error}</label>}
    </Form.Field>
  )
}

export function renderCheckbox({ input, width, onChange, meta: { touched, error }, ...rest }) {
  function handleChange(e, { value }) {
    input.onChange(!value)
  }
  return (
    <Form.Field className={classnames({ error: touched && error })} width={width}>
      <Checkbox {...input} {...rest} checked={input.value} onChange={handleChange} />
      {touched && error && <label className="error">{error}</label>}
    </Form.Field>
  )
}

export function renderTextArea({ input, label, width, meta: { touched, error }, ...rest }) {
  return (
    <Form.Field className={classnames({ error: touched && error })} width={width}>
      <label>{label}</label>
      <TextArea {...input} {...rest} placeholder={label} />
      {touched && error && <label className="error">{error}</label>}
    </Form.Field>
  )
}

export function renderSearchField({ input, label, type = 'text', width, meta: { touched, error }, reset, placeholder }) {
  return (
    <Form.Field className={classnames({ error: touched && error })} width={width}>
      <Input {...input} placeholder={placeholder} type={type}>
        <input />
        <Button type="button" icon="remove" basic onClick={reset} />
        <Button primary type="submit" size="small">Filtrar</Button>
      </Input>
      {touched && error && <label className="error">{error}</label>}
    </Form.Field>
  )
}

export function renderSelect({ input, label, type, meta: { touched, error }, options, placeholder }) {
  return (
    <Form.Field className={classnames({ error: touched && error })} >
      <label>{label}</label>
      <Form.Select {...input} options={options} />
    </Form.Field>
  )
}

export function fieldGroupHeader(title, fields) {
  return (
    <Grid>
      <Grid.Column width={14}>
        <Divider horizontal >{title}</Divider>
      </Grid.Column>
      <Grid.Column width={2} floated="right">
        <Button type="button" icon="add circle" positive onClick={() => fields.push({})} />
      </Grid.Column>
    </Grid>
  )
}
export function formFields(title, fieldTitle, renderFields) {
  return function ({ fields, meta: { error, submitFailed } }) {
    return (<div>
      {fieldGroupHeader(title, fields)}
      <Segment.Group>
        {fields.map((item, index) =>
                          (<Segment key={item}>
                            <Grid>
                              <Grid.Column width={14}>
                                <Divider horizontal >{title} #{index + 1}</Divider>
                              </Grid.Column>
                              <Grid.Column width={2} floated="right">
                                <Button type="button" icon="remove circle" negative onClick={() => fields.remove(index)} />
                              </Grid.Column>
                            </Grid>
                            {renderFields(item)}
                          </Segment>))}
      </Segment.Group>
            </div>)
  }
}

export function parseToFloat(value) {
  if (value.endsWith('.')) {
    return value
  }
  const { isNaN, parseFloat } = Number
  const float = parseFloat(value)
  return isNaN(float) ? value : float
}

export function parseToInt(value) {
  const { isNaN, parseInt } = Number
  const int = parseInt(value)
  return isNaN(int) ? value : int
}

export function compose(...fns) { fns.reduce((f, g) => (...args) => f(g(...args))) }
