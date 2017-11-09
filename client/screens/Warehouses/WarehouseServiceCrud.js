import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import WarehouseFormModal from './WarehouseFormModal'
import Grid from '../../common/Grid'
import ToolbarContainer from './ToolbarContainer'
import { crudPages } from '../../common/CrudPages'
import { getCrudPageActions } from '../../actions/crudPage'
import * as selectors from '../../selectors/warehouseServices'

export default class WarehouseServiceCrud extends Component {
    shouldComponentUpdate(){
        return false
    }

    gridColumns = [['description', 'Descripción'], ['rate', 'Tarifa']]
    
    confirmModalOptions = {        
        title:"Eliminar Servicio",
        message:"¿Confirma eliminar el servicio?"
    }
    toolbar (props){
        return(<Button icon='add' positive content='Agregar' />)
    }
    render(){
        return(       
            <div> 
                {this.toolbar()}
                <Grid
                    columns={this.gridColumns} 
                    rows={[]}/>
            </div>
        )
    }
}