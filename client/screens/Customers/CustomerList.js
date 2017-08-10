import React, {Component} from 'react'
import { Input, Menu, Button, Modal, Header, Icon } from 'semantic-ui-react'
import * as Table from 'reactabular-table';
import {createColumns} from '../../utils/reactabularHelpers'

export default class CustomerList extends Component{    
    columns = createColumns(['name', 'Nombre'], ['email', 'E-mail'], ['phone', 'Teléfono'])
    getActionColumns (){
        const {editHandler, deleteHandler} = this.props
        return [
            {
                property: "_id",
                cell:{
                    props: { style: {collapsing: true} },
                    formatters: [(id) => (<Button.Group>
                        <Button icon="write" onClick={() => editHandler(id)} />
                        <Button icon="delete" onClick={() => deleteHandler(id)} />
                    </Button.Group>)]
                }
            }
        ]
    }
    render(){
        const { queryResult } = this.props
        const columns = [...this.getActionColumns(), ...this.columns]
        return(
            <div>
                <Table.Provider
                    className="ui striped table"
                    columns={columns} >
                    <Table.Header />
                    <Table.Body rows={queryResult || []} rowKey="_id" />
                </Table.Provider>
            </div>
        )
    }
}