import React, { Component } from 'react'
import { connect } from 'react-redux'
import { feathersServices } from '../../feathers'
import ServiceFormModal from './ServiceFormModal'
import CrudContainer from '../../common/CrudContainer'
import ToolbarContainer from './ToolbarContainer'
import { crudPages } from '../../common/CrudPages'
import { getCrudPageActions } from '../../actions/crudPage'
import * as selectors from '../../selectors/services'

export default class ServiceCrud extends Component {
    shouldComponentUpdate(){
        return false
    }

    gridColumns = [['description', 'Descripción'], ['rate', 'Tarifa']]

    confirmModalOptions = {        
        title:"Eliminar Servicio",
        message:"¿Confirma eliminar el servicio?"
    }

    render(){
        const crudActions = getCrudPageActions(crudPages.SERVICES, feathersServices.services, selectors)
        return(       
            <div> 
                <CrudContainer
                    gridColumns={this.gridColumns} 
                    confirmModalOptions={this.confirmModalOptions}
                    selectors={selectors}       
                    formModal={ServiceFormModal} 
                    toolbar={ToolbarContainer} 
                    crudActions={crudActions}
                />
            </div>
        )
    }
}