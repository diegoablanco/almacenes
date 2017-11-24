import React, {Component} from 'react'
import { Input, Menu, Button, Modal, Header, Icon, Loader } from 'semantic-ui-react'
import * as Table from 'reactabular-table'
import * as sort from 'sortabular'
import * as resolve from 'table-resolver'
import InfiniteScroll from 'react-infinite-scroller'
import {createColumns, addHeaderTransforms} from '../utils/reactabularHelpers'
import { connect } from 'react-redux'

export default class Grid extends Component {
    static defaultProps = {
        enableInfiniteScroll: false,
        enableSort: false,
        enableAdd: false,
        enableEdit: true,
        rowKey: 'id'
    }
    constructor(props){
        super(props)
        const {columns} = props
        this.columns = createColumns(...columns)
    }    
    getActionColumns (){
        const {editHandler, deleteHandler, addHandler, enableAdd, enableEdit, canAdd} = this.props
        return [
            {
                property: "id",
                cell:{
                    formatters: [(id) => (<Button.Group>
                        {enableEdit && <Button icon="write" onClick={(e) => {
                            e.preventDefault()
                            editHandler(id)
                        }} />}
                        <Button negative icon="delete" onClick={(e) => {
                            e.preventDefault()
                            deleteHandler(id)
                        }} />
                    </Button.Group>)]
                },
                header:{
                    props: {className: "collapsing"},
                    formatters: [() => (enableAdd && canAdd &&
                        <Button icon='add' size='tiny' floated='right' positive onClick={(e) => {
                            e.preventDefault()
                            addHandler()
                        }} />
                    )]
                }
            }
        ]
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
    getSortableColumns(){        
        const { 
            sortingColumns,
            handleSort
        } = this.props

        const sortable = sort.sort({
            getSortingColumns: () => sortingColumns,
            onSort:  handleSort,
            strategy: sort.strategies.byProperty
        })

        const customSortableTransform = (value, extra) => this.transformSortClasses(sortable(value, extra))
        return this.columns.map(column => {
            const isSortable = column.property.indexOf('.') == -1
            return isSortable 
                ? addHeaderTransforms([column], [sortable, customSortableTransform])[0]
                : column
        })
    }
    getTable(){
        const { 
            rows, 
            enableSort,
            rowKey
        } = this.props

        const columns = enableSort ? this.getSortableColumns(this.columns) : this.columns
        const gridColumns = [...columns, ...this.getActionColumns()]
        const tableRows = resolve.resolve({
            columns: resolve.columnChildren({columns}),
            method: resolve.nested
        })(rows)
        return (<Table.Provider
            className="ui striped table sortable"
            columns={gridColumns} >
            <Table.Header />
            <Table.Body rows={tableRows} rowKey={rowKey} />
        </Table.Provider>)
    }
    render(){
        const { enableInfiniteScroll, isLoading } = this.props
        return(
            <div>
                {
                    !isLoading 
                    ?   enableInfiniteScroll 
                            ? this.wrapWithInfiniteScroll(this.getTable())
                            : this.getTable()
                    : (<Loader active inline='centered' />)
                }
            </div>
        )
    }
}