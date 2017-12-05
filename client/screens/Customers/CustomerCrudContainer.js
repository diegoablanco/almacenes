import React, { Component } from 'react'
import { connect } from 'react-redux'
import { feathersServices } from '../../feathers'
import CustomerFormModal from './CustomerFormModal'
import CrudContainer from '../../common/CrudContainer'
import ToolbarContainer from './ToolbarContainer'
import crudPages from '../../common/CrudPages'
import { getCrudPageActions } from '../../actions/crudPage'
import * as selectors from '../../selectors/customers'

export default class CustomerCrud extends Component {
    shouldComponentUpdate(){
        return false
    }

    gridColumns = [
        { property: 'companyName', label: 'Nombre' }, 
        { property: 'authorizedSignatory.name', label: 'Firmante Autorizado' }, 
        { property: 'authorizedSignatory.email', label: 'E-mail' }, 
        { property: 'authorizedSignatory.phones[0].number', label: 'Teléfono' }
    ]
    
    confirmModalOptions = {        
        title:"Eliminar Cliente",
        message:"¿Confirma eliminar el cliente?"
    }

    render(){
        const crudActions = getCrudPageActions(crudPages.CUSTOMERS, feathersServices.customers, selectors)
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