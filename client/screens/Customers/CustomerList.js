import React, {Component} from 'react'
import { Table, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class CustomerList extends Component{
    componentDidMount(){
        this.props.getList()
    }
    render(){
        const { customers: { queryResult } } = this.props
        return(
            <Table striped>            
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>E-mail</Table.HeaderCell>
                        <Table.HeaderCell>Teléfono</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { queryResult && queryResult.map(customer => (
                        <Table.Row key={customer._id}>
                            <Table.Cell>{customer.name}</Table.Cell>
                            <Table.Cell>{customer.email}</Table.Cell>
                            <Table.Cell>{customer.phone}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        )
    }
}
