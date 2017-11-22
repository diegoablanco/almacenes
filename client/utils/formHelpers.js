import React, { Component } from 'react'
import { Field, FieldArray } from 'redux-form'
import { Button, Form, Divider, Segment, Input, Grid } from 'semantic-ui-react'
import classnames from 'classnames'

export function renderField ({ input, label, type="text", width, meta: { touched, error }, ...rest }) {
    return (
        <Form.Field className={classnames({ error: touched && error })} width={width}>
            <label>{label}</label>
            <Input {...input} {...rest} placeholder={label} type={type}/>
            {touched && error && <label className="error">{error}</label>}
        </Form.Field>
    )
  }

export function renderSearchField ({ input, label, type="text", width, meta: { touched, error }, reset, placeholder }) {
    return (
        <Form.Field className={classnames({ error: touched && error })} width={width}>
            <Input {...input} placeholder={placeholder} type={type}>
                <input/>
                <Button type="button" icon='remove' basic onClick={reset}/>
                <Button primary type='submit' size='small'>Filtrar</Button>
            </Input>
            {touched && error && <label className="error">{error}</label>}
        </Form.Field>
    )
  }

export function renderSelect ({ input, label, type, meta: { touched, error }, options, placeholder }) {
    function handleChange (e, { value }) {
        return input.onChange(value)
      }
    return (
        <Form.Field className={classnames({ error: touched && error })} >
            <label>{label}</label>
            <Form.Select {...input} options={options} onChange={handleChange}/>
        </Form.Field>
    )
  }

export function formFields(title, fieldTitle, renderFields){
    return ({ fields, meta: { error, submitFailed } }) => (     
        <div>
            {fieldGroupHeader(title, fields)}
            <Segment.Group>
                {fields.map((item, index) =>
                    <Segment key={index}>
                        <Grid>
                            <Grid.Column width={14}>
                                <Divider horizontal >{title} #{index + 1}</Divider>
                            </Grid.Column>
                            <Grid.Column width={2} floated='right'>
                                <Button type="button" icon="remove circle" negative onClick={() => fields.remove(index)} />
                            </Grid.Column>
                        </Grid>
                        {renderFields(item)}
                    </Segment>
            )}
            </Segment.Group>    
        </div> 
    )
}

export function fieldGroupHeader(title, fields){
    return (
        <Grid>
            <Grid.Column width={14}>
                <Divider horizontal >{title}</Divider>
            </Grid.Column>
            <Grid.Column width={2} floated='right'>
                <Button type="button" icon="add circle" positive onClick={() => fields.push({})} />
            </Grid.Column>
        </Grid>
    )
}