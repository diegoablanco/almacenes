import React, { Component } from 'react'
import { feathersServices } from '../../feathers'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import getCrudPageActions from '../../actions/warehouseServices'
import crudPages from '../../common/CrudPages'
import { Button, Segment } from 'semantic-ui-react'
import WarehouseServiceFormModal, {formName} from './WarehouseServiceFormModal'
import Grid from '../../common/Grid'
import FormModal from '../../common/FormModal'
import CrudContainer from '../../common/CrudContainer'
import * as selectors from '../../selectors/warehouseServices'

const crudActions = getCrudPageActions(crudPages.WAREHOUSESERVICES, feathersServices.warehouseServices, selectors)

class WarehouseServiceCrud extends Component {
    shouldComponentUpdate(){
        return false
    }

    gridColumns = [
        { property: 'service.description', label: 'Descripción' }, 
        { property: 'service.rate', label: 'Tarifa' }
    ]
    
    confirmModalOptions = {        
        title:"Eliminar Servicio",
        message:"¿Confirma eliminar el servicio?"
    }

    render(){
        const { id, showServiceFormModal } = this.props
        return(       
            <div> 
                <CrudContainer
                    gridColumns={this.gridColumns} 
                    confirmModalOptions={this.confirmModalOptions}
                    selectors={selectors}       
                    formModal={WarehouseServiceFormModal} 
                    crudActions={crudActions}
                    enableAdd
                />
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
    warehouseId: state
})
const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        ...crudActions,
        loadGrid: () => crudActions.loadGrid(formName)
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseServiceCrud)