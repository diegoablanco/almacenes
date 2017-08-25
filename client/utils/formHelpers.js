import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'
import classnames from 'classnames'

export function renderField (props) {
    const { input, label, type, meta: { touched, error }, ...rest } = props;
    return (
        <Form.Field className={classnames({ error: touched && error })} style={{ marginBottom: '1em' }}>
            <label>{label}</label>
            <Form.Input {...input} {...rest} placeholder={label} type={type} />
            {touched && error && <label className="error">{error}</label>}
        </Form.Field>
    )
  }
export function renderSelect (props) {
    const { input, label, type, meta: { touched, error }, ...rest } = props;
    return (
        <Form.Field className={classnames({ error: touched && error })} style={{ marginBottom: '1em' }}>
            <label>{label}</label>
            <Form.Select {...input} {...rest} />
        </Form.Field>
    )
  }