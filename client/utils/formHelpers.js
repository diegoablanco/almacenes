import React, { Component } from 'react'
import { Field, FieldArray } from 'redux-form'
import { Button, Form, Divider, Segment } from 'semantic-ui-react'
import classnames from 'classnames'

export function renderField (props) {
    const { input, label, type, width, meta: { touched, error }, ...rest } = props;
    return (
        <Form.Field className={classnames({ error: touched && error })} width={width} style={{ marginBottom: '1em' }}>
            <label>{label}</label>
            <Form.Input {...input} {...rest} placeholder={label} type={type} />
            {touched && error && <label className="error">{error}</label>}
        </Form.Field>
    )
  }

export function renderSelect ({ input, label, type, meta: { touched, error }, options, placeholder }) {
    function handleChange (e, { value }) {
        return input.onChange(value)
      }
    return (
        <Form.Field className={classnames({ error: touched && error })} style={{ marginBottom: '1em' }}>
            <label>{label}</label>
            <Form.Select {...input} options={options} onChange={handleChange}/>
        </Form.Field>
    )
  }

export function formFields(title, renderFields){
    return ({ fields, meta: { error, submitFailed } }) => (      
        <Segment.Group>
        <Button type="button" icon="add circle" onClick={() => {
            fields.push({})
            return false
            }} />
            {fields.map((item, index) =>
            <Segment key={index}>
            <Button type="button" icon="remove circle" onClick={() => fields.remove(index)} />
            <Divider horizontal>{title} #{index + 1}</Divider>
            {renderFields(item)}
            </Segment>
        )}
        </Segment.Group>    
    )
}