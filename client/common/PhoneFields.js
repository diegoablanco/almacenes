import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray } from 'redux-form'
import { Button, Form, Grid, Divider, Tab, Segment } from 'semantic-ui-react'
import { renderField, renderSelect, formFields } from '../utils/formHelpers'

export function getPhoneFieldCells(title, phone, options = []){  
  return [
    { 
      property:"number",
      label:"Número",
      formatter: function(value, {name: phone}) {
        return (<Field name={`${phone}.number`}
        iconPosition='left'
        component={renderField}/> )
      } 
    },
    { 
      property:"typeId",
      label:"Tipo",
      formatter: (value, {name: phone}) => (<Field name={`${phone}.typeId`}
        iconPosition='left' 
        component={renderSelect}
        options={options.map(option => ({key: option.id, value: option.id, text: option.description }))}/>)
    }    
  ]
}