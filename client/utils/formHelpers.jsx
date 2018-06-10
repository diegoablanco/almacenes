import React, { Component } from 'react'
import { Button, Form, Divider, Segment, Input, TextArea, Grid, Checkbox, Icon } from 'semantic-ui-react'
import classnames from 'classnames'
import intl from 'react-intl-universal'

export function getFieldTranslationKey(form, inputName) {
  return `${form}.${inputName}`.replace(/\[\d\]/, '')
}
export function renderLabel({ label, required }) {
  return (<label>{label}{required && (<Icon name="asterisk" color="red" />)}</label>)
}
export function renderLabel2({ input: { value } }) {
  return (<label>{value}</label>)
}
export function renderField({ input, type = 'text', width, required, clearable, label, meta: { touched, error, form }, ...rest }) {
  if (label === undefined) {
    label = intl.get(getFieldTranslationKey(form, input.name))
  }
  return (
    <Form.Field className={classnames({ error: touched && error })} width={width}>
      { renderLabel({ label, required })}
      <Input
        {...input}
        {...rest}
        placeholder={label}
        type={type}
        labelPosition="right corner"
      />
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

export function renderCheckbox({ input, width, onChange, meta: { touched, error, form }, ...rest }) {
  const label = intl.get(getFieldTranslationKey(form, input.name))
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

export function renderTextArea({ input, width, required, meta: { touched, error, form }, ...rest }) {
  const label = intl.get(getFieldTranslationKey(form, input.name))
  return (
    <Form.Field className={classnames({ error: touched && error })} width={width}>
      { renderLabel({ label, required })}
      <TextArea {...input} {...rest} placeholder={label} />
      {touched && error && <label className="error">{error}</label>}
    </Form.Field>
  )
}

export function renderSearchField({ input, label, type = 'text', width, meta: { touched, error }, placeholder }) {
  return (
    <Form.Field className={classnames({ error: touched && error })} width={width}>
      <Input
        {...input}
        placeholder={placeholder}
        type={type}
        action
      >
        <input />
        <Button type="submit" icon="search" />
      </Input>
      {touched && error && <label className="error">{error}</label>}
    </Form.Field>
  )
}

function basicField(props) {
  const { label, width, meta: { touched, error } } = props
  const { fieldInput, ...propsToPass } = props
  return (
    <Form.Field className={classnames({ error: touched && error })} width={width}>
      { props.fieldInput }
      {touched && error && <label className="error">{error}</label>}
    </Form.Field>
  )
}

export function renderSelect({ input, label, type, meta: { touched, error }, options, placeholder }) {
  function handleChange(e, { value }) {
    input.onChange(value)
  }
  return (
    <Form.Field className={classnames({ error: touched && error })} >
      <label>{label}</label>
      <Form.Select
        {...input}
        onChange={handleChange}
        options={options}
      />
      {touched && error && <label className="error">{error}</label>}
    </Form.Field>
  )
}
export function SelectOrLabel(props) {
  const { options, input: { value } } = props
  const showLabel = value !== ''
  const fieldInput = !showLabel
    ? <Select2 {...props} />
    : <label>{(options.find(x => x.value === value) || {}).text}</label>
  return basicField({ ...props, fieldInput })
}
export class Select2 extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e, { value }) {
    const { input } = this.props
    input.onChange(value)
  }
  render() {
    const { input, label, meta: { touched, error }, options, placeholder = 'Seleccionar...', required } = this.props
    return (
      <Form.Field className={classnames({ error: touched && error })} >
        { renderLabel({ label, required })}
        <Form.Select
          {...input}
          onChange={this.handleChange}
          {...{ options, placeholder }}
        />
      </Form.Field>
    )
  }
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
