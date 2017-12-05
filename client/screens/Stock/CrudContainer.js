import React, { Component } from 'react'
import { connect } from 'react-redux'
import { feathersServices } from '../../feathers'
import FormModal from './FormModal'
import CrudContainer from '../../common/CrudContainer'
import ToolbarContainer from './ToolbarContainer'
import getCrudPageActions from '../../actions/stocks'
import selectors from '../../selectors/stocks'

export default class CarrierCrud extends Component {
    shouldComponentUpdate(){
        return false
    }

    gridColumns = [
        { property: 'warehouse.name', label: 'Almacén' }, 
        { property: 'customer.companyName', label: 'Cliente' }, 
        { property: 'targetCustomer.companyName', label: 'Cliente Destinatario' }
    ]
    
    confirmModalOptions = {        
        title:"Eliminar Transportista",
        message:"¿Confirma eliminar el transportista?"
    }

    render(){
        const crudActions = getCrudPageActions()
        return(       
            <div> 
                <CrudContainer
                    gridColumns={this.gridColumns} 
                    confirmModalOptions={this.confirmModalOptions}
                    selectors={selectors}       
                    formModal={FormModal} 
                    toolbar={ToolbarContainer} 
                    crudActions={crudActions}
                />
            </div>
        )
    }
}