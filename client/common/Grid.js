import React, {Component} from 'react'
import { Input, Menu, Button, Modal, Header, Icon } from 'semantic-ui-react'
import * as Table from 'reactabular-table';
import * as sort from 'sortabular';
import InfiniteScroll from 'react-infinite-scroller'
import {createColumns, addHeaderTransforms} from '../utils/reactabularHelpers'
import { connect } from 'react-redux'

export default class Grid extends Component {
    constructor(props){
        super(props)
        const {columns} = props
        this.columns = createColumns(...columns)
    }    
    getActionColumns (){
        const {editHandler, deleteHandler} = this.props
        return [
            {
                property: "_id",
                cell:{
                    formatters: [(id) => (<Button.Group>
                        <Button icon="write" onClick={() => editHandler(id)} />
                        <Button icon="delete" onClick={() => deleteHandler(id)} />
                    </Button.Group>)]
                },
                header:{
                    props: {className: "collapsing"}
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
        const { 
            rows, 
            sortingColumns,
            handleLoadMore, 
            hasMore
        } = this.props

        const sortable = sort.sort({
            getSortingColumns: () => sortingColumns, 
            onSort: this.sort,
            strategy: sort.strategies.byProperty
        })
        const customSortableTransform = (value, extra) => this.transformSortClasses(sortable(value, extra))
        const sortableColumns = addHeaderTransforms(this.columns, [sortable, customSortableTransform])
        const gridColumns = [...this.getActionColumns(), ...sortableColumns]
        return(
            <div>
                <InfiniteScroll
                    loadMore={handleLoadMore}
                    hasMore={hasMore}
                    useWindow={true}
                    initialLoad={false}
                    loader={<div className="loader">Loading ...</div>}
                >
                    <Table.Provider
                        className="ui striped table sortable"
                        columns={gridColumns} >
                        <Table.Header />
                        <Table.Body rows={rows || []} rowKey="_id" />
                    </Table.Provider>
                </InfiniteScroll>    
            </div>
        )
    }
}