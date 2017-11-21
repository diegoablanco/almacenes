import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { Button, Form, Grid, Divider, Tab, Segment } from 'semantic-ui-react'
import classnames from 'classnames'
import { renderField } from '../../utils/formHelpers'
import renderContactFields from '../../common/ContactFields'
import PhoneFields from '../../common/PhoneFields'
import { getPhoneFieldCells } from '../../common/PhoneFields'
import tabulatedFormFields from '../../utils/tabulatedFormFields'
import CustomerFormContactInfo from './CustomerForm.ContactInfo'
import CustomerAccountInfo from './CustomerForm.AccountInfo'
const formName = "Customer"
function reduxifyForm(formName, innerForm, validate){
    return reduxForm({
        form: formName,
        //validate: validate,
        destroyOnUnmount: false,
        onSubmit: () => {}
    })(innerForm)
}
class CustomerFormTabs extends Component {
    render() {
        const { handleSubmit, loading } = this.props
        const Tab1 = CustomerFormContactInfo({}))
        const Tab2 = reduxifyForm(formName, CustomerAccountInfo({}))
        const panes = [
            {
                menuItem: 'Información de Contacto', pane: <Tab.Pane>
                    <Tab1 />
                </Tab.Pane>
            },
            {
                menuItem: 'Información de la Cuenta', pane: <Tab.Pane>
                    <Tab2/>
                </Tab.Pane>
            },
        ]
        return (
            <Tab panes={panes} menu={{ secondary: true, pointing: true }} renderActiveOnly={false} />
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.customers.data,
    ui: state.ui.customers
})
export default connect(mapStateToProps)(CustomerFormTabs)