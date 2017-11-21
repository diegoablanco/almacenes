import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray } from 'redux-form'
import { Form, Grid, Divider, Tab, Segment } from 'semantic-ui-react'
import classnames from 'classnames'
import { renderField } from '../../utils/formHelpers'
import renderContactFields from '../../common/ContactFields'
import PhoneFields from '../../common/PhoneFields'
import { getPhoneFieldCells } from '../../common/PhoneFields'
import tabulatedFormFields from '../../utils/tabulatedFormFields'

export default function CustomerFormContactInfo(phoneTypes) {
    return (props) => 
        (<div>
            <Form.Group>
                <Field name="companyName" width={12}
                    type="text"
                    label="Nombre de la Compañía"
                    component={renderField} />
                <Field name="vat" width={4}
                    type="text"
                    label="VAT"
                    component={renderField} />
            </Form.Group>
            <Field name="address.line1"
                type="text"
                label="Dirección"
                component={renderField} />
            <Form.Group widths="equal">
                <Field name="address.zipCode"
                    type="text"
                    label="Código Postal"
                    component={renderField} />
                <Field name="address.city"
                    type="text"
                    label="Ciudad"
                    component={renderField} />
                <Field name="address.country"
                    type="text"
                    label="País"
                    component={renderField} />
            </Form.Group>
            <Divider horizontal>Firmante Autorizado</Divider>
            <Field name="authorizedSignatory.name"
                label="Nombre"
                component={renderField} />
            <Form.Group widths="equal">
                <Field name="authorizedSignatory.position"
                    label="Posición"
                    component={renderField} />
                <Field name="authorizedSignatory.email"
                    label="Email"
                    component={renderField} />
            </Form.Group>
            <Divider horizontal>Teléfonos</Divider>
            <FieldArray name={`authorizedSignatory.phones`} component={tabulatedFormFields("Teléfonos", getPhoneFieldCells, phoneTypes)} />
        </div>)
    }
