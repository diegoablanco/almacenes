import React, { Component } from 'react'
import { connect } from 'react-redux'
import { feathersServices } from '../../feathers'
import WarehouseFormModal from './WarehouseFormModal'
import CrudContainer from '../../common/CrudContainer'
import ToolbarContainer from './ToolbarContainer'
import {crudPages} from '../../common/CrudPages'
import { getCrudPageActions } from '../../actions/crudPage'
import * as selectors from '../../selectors/warehouses'

export default class WarehouseCrud extends Component {
    shouldComponentUpdate(){
        return false
    }

    gridColumns = [['name', 'Nombre'], ['email', 'E-mail'], ['phone', 'Teléfono']]

    confirmModalOptions = {        
        title:"Eliminar Cliente",
        message:"¿Confirma eliminar el cliente?"
    }

    serviceStateSelector(state){
        return state.warehouses
    }

    uiStateSelector(state){
        return state.ui.warehouses
    }

    render(){
        const crudActions = getCrudPageActions(crudPages.WAREHOUSES, feathersServices.warehouses, selectors)
        return(       
            <div> 
                <CrudContainer
                    gridColumns={this.gridColumns} 
                    service={feathersServices.warehouses}   
                    uiStateSelector={this.uiStateSelector}     
                    serviceStateSelector={this.serviceStateSelector}   
                    formModal={WarehouseFormModal} 
                    toolbar={ToolbarContainer} 
                    crudActions={crudActions}
                    confirmModalOptions={this.confirmModalOptions}
                />
            </div>
        )
    }
}