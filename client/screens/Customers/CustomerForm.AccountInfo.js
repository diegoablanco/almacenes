import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray } from 'redux-form'
import { Button, Form, Grid, Divider, Tab, Segment } from 'semantic-ui-react'
import classnames from 'classnames'
import { renderField } from '../../utils/formHelpers'
import renderContactFields from '../../common/ContactFields'
import PhoneFields from '../../common/PhoneFields'
import { getPhoneFieldCells } from '../../common/PhoneFields'
import tabulatedFormFields from '../../utils/tabulatedFormFields'

export default function CustomerAccountInfo(phoneTypes) {
    return (props) =>
        (<div>
            <Field name="account.bankName"
                type="text"
                label="Nombre del Banco"
                component={renderField} />
            <Field name="account.number"
                type="text"
                label="Número de Cuenta"
                component={renderField} />
            <Form.Group widths="equal">
                <Field name="account.iban"
                    type="text"
                    label="IBAN"
                    component={renderField} />
                <Field name="account.swiftBic"
                    type="text"
                    label="SWIFT/BIC"
                    component={renderField} />
            </Form.Group>
            <Field name="account.address.line1"
                type="text"
                label="Dirección"
                component={renderField} />
            <Form.Group widths="equal">
                <Field name="account.address.zipCode"
                    type="text"
                    label="Código Postal"
                    component={renderField} />
                <Field name="account.address.city"
                    type="text"
                    label="Ciudad"
                    component={renderField} />
                <Field name="account.address.country"
                    type="text"
                    label="País"
                    component={renderField} />
            </Form.Group>
            <FieldArray name="authorizedPersons" component={renderContactFields("Personas Autorizadas", "Persona Autorizada", phoneTypes)} />
        </div>)
}