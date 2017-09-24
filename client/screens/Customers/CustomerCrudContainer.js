import React, { Component } from 'react'
import { connect } from 'react-redux'
import { feathersServices } from '../../feathers'
import CustomerFormModal from './CustomerFormModal'
import CrudContainer from '../../common/CrudContainer'
import ToolbarContainer from './ToolbarContainer'
import { getCrudPageActions } from '../../actions/customers'
import * as selectors from '../../selectors/customers'

export default class CustomerCrud extends Component {
    shouldComponentUpdate(){
        return false
    }

    gridColumns = [['companyName', 'Nombre'], ['email', 'E-mail'], ['phone', 'Teléfono']]

    confirmModalOptions = {        
        title:"Eliminar Cliente",
        message:"¿Confirma eliminar el cliente?"
    }

    render(){
        const crudActions = getCrudPageActions()
        return(       
            <div> 
                <CrudContainer
                    gridColumns={this.gridColumns} 
                    confirmModalOptions={this.confirmModalOptions}
                    selectors={selectors}       
                    formModal={CustomerFormModal} 
                    toolbar={ToolbarContainer} 
                    crudActions={crudActions}
                />
            </div>
        )
    }
}