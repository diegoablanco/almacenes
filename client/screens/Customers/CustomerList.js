import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as Table from 'reactabular-table';

export default class CustomerList extends Component{    
    columns = [
        {
            property: 'name',
            header: {
                label: 'Nombre'
            }
        },
        {
            property: 'email',
            header: {
                label: 'E-mail'
            }
        },
        {
            property: 'phone',
            header: {
                label: 'Teléfono'
            }
        }
    ]
    componentDidMount(){
        this.props.getList()
    }
    render(){
        const { customers: { queryResult } } = this.props
        return(
            <Table.Provider
                className="ui striped table"
                columns={this.columns} >
                <Table.Header />
                <Table.Body rows={queryResult || []} rowKey="_id" />
            </Table.Provider>
        )
    }
}
