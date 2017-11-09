import React, {Component} from 'react'
import { Input, Menu, Button, Modal, Header, Icon } from 'semantic-ui-react'
import * as Table from 'reactabular-table';
import * as sort from 'sortabular';
import InfiniteScroll from 'react-infinite-scroller'
import {createColumns, addHeaderTransforms} from '../utils/reactabularHelpers'
import { connect } from 'react-redux'

export default class Grid extends Component {
    static defaultProps = {
        infiniteScroll: false
    }
    constructor(props){
        super(props)
        const {columns} = props
        this.columns = createColumns(...columns)
    }    
    getActionColumns (){
        const {editHandler, deleteHandler} = this.props
        return [
            {
                property: "id",
                cell:{
                    formatters: [(id) => (<Button.Group>
                        <Button icon="write" onClick={() => editHandler(id)} />
                        <Button negative icon="delete" onClick={() => deleteHandler(id)} />
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
        const sortingOrder = {
            FIRST: 'asc',
            asc: 'desc',
            desc: 'asc'
        }
        const newSortingColumns = sort.byColumn({sortingColumns, selectedColumn, sortingOrder})
        handleSort(newSortingColumns)
    }
    transformSortClasses(props){
        let className = ""
        if(!props.className.includes("-none"))
            className = `${props.className.includes("-asc") ? "ascending" : "descending" } sorted`
        return {...props, className}
    }
    wrapWithInfiniteScroll(table){
        const { 
            handleLoadMore, 
            hasMore
        } = this.props

        return (<InfiniteScroll
            loadMore={handleLoadMore}
            hasMore={hasMore}
            useWindow={true}
            initialLoad={false}
            loader={<div className="loader">Loading ...</div>}
        >
            {table}
        </InfiniteScroll> )
    }
    getTable(){
        const { 
            rows, 
            sortingColumns
        } = this.props

        const sortable = sort.sort({
            getSortingColumns: () => sortingColumns, 
            onSort: this.sort,
            strategy: sort.strategies.byProperty
        })
        const customSortableTransform = (value, extra) => this.transformSortClasses(sortable(value, extra))
        const sortableColumns = addHeaderTransforms(this.columns, [sortable, customSortableTransform])
        const gridColumns = [...sortableColumns, ...this.getActionColumns()]
        return (<Table.Provider
            className="ui striped table sortable"
            columns={gridColumns} >
            <Table.Header />
            <Table.Body rows={rows || []} rowKey="id" />
        </Table.Provider>)
    }
    render(){
        const { infiniteScroll } = this.props
        return(
            <div>
                { infiniteScroll 
                    ? this.wrapWithInfiniteScroll(this.getTable())
                    : this.getTable()
                }    
            </div>
        )
    }
}