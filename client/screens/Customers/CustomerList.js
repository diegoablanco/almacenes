import React, {Component} from 'react'
import { Input, Menu, Button, Modal, Header, Icon } from 'semantic-ui-react'
import * as Table from 'reactabular-table';
import * as sort from 'sortabular';
import {createColumns, addHeaderTransforms} from '../../utils/reactabularHelpers'
import ToolbarContainer from './ToolbarContainer.js';

export default class CustomerList extends Component {    
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
    sort = (selectedColumn) => {
        const { sortingColumns, handleSort } = this.props
        const newSortingColumns = sort.byColumn({sortingColumns, selectedColumn})
        handleSort(newSortingColumns)
    }
    transformSortClasses(props){
        let className = ""
        if(!props.className.includes("-none"))
            className = `${props.className.includes("-asc") ? "ascending" : "descending" } sorted`
        return {...props, className}
    }
    render(){
        const { queryResult, handleFilter, sortingColumns, handleSort } = this.props
        const sortable = sort.sort({
            getSortingColumns: () => sortingColumns, 
            onSort: this.sort,
            strategy: sort.strategies.byProperty
            //onSort: selectedColumn => handleSort(sort.byColumn(sortingColumns, selectedColumn))
        })
        const customSortableTransform = (value, extra) => this.transformSortClasses(sortable(value, extra))
        const sortableColumns = addHeaderTransforms(this.columns, [sortable, customSortableTransform])
        const columns = [...this.getActionColumns(), ...sortableColumns]
        return(
            <div>
                <ToolbarContainer handleFilter={handleFilter}/>
                <Table.Provider
                    className="ui striped table sortable"
                    columns={columns} >
                    <Table.Header />
                    <Table.Body rows={queryResult || []} rowKey="_id" />
                </Table.Provider>
            </div>
        )
    }
}