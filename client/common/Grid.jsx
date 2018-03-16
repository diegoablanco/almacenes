import React, { Component } from 'react'
import { Button, Loader, Message, Icon } from 'semantic-ui-react'
import * as Table from 'reactabular-table'
import * as sort from 'sortabular'
import * as resolve from 'table-resolver'
import InfiniteScroll from 'react-infinite-scroller'
import { createColumns, addHeaderTransforms } from '../utils/reactabularHelpers'

class Grid extends Component {
  constructor(props) {
    super(props)
    const { columns } = props
    this.columns = createColumns(...columns)
    this.moreRowsMessage = this.moreRowsMessage.bind(this)
  }
  getActionColumns() {
    const { editHandler, deleteHandler, addHandler, enableAdd, enableEdit, canAdd } = this.props
    return [
      {
        property: 'id',
        cell: {
          formatters: [(id) => (<Button.Group>
            {enableEdit &&
              <Button
                icon="write"
                onClick={(e) => {
                    e.preventDefault()
                    editHandler(id)
                }}
              />}
            <Button
              negative
              icon="delete"
              onClick={(e) => {
                  e.preventDefault()
                  deleteHandler(id)
              }}
            />
          </Button.Group>)] // eslint-disable-line react/jsx-closing-tag-location
        },
        header: {
          props: { className: 'collapsing' },
          formatters: [() => (enableAdd && canAdd &&
          <Button
            icon="add"
            size="tiny"
            floated="right"
            positive
            onClick={(e) => {
              e.preventDefault()
              addHandler()
            }}
          /> // eslint-disable-line indent
          )]
        }
      }
    ]
  }

  getSortableColumns() {
    const {
      sortingColumns,
      handleSort
    } = this.props

    const sortable = sort.sort({
      getSortingColumns: () => sortingColumns,
      onSort: handleSort,
      strategy: sort.strategies.byProperty
    })

    const customSortableTransform = (value, extra) => this.transformSortClasses(sortable(value, extra))
    return this.columns.map(column => addHeaderTransforms([column], [sortable, customSortableTransform])[0])
  }
  getTable() {
    const {
      rows,
      enableSort,
      rowKey,
      enableActionColumn = true
    } = this.props
    const columns = enableSort ? this.getSortableColumns(this.columns) : this.columns
    const gridColumns = [...columns]
    if (enableActionColumn) {
      gridColumns.push(...this.getActionColumns())
    }
    const tableRows = resolve.resolve({
      columns: resolve.columnChildren({ columns }),
      method: resolve.nested
    })(rows)
    return (
      <Table.Provider
        className="ui striped table sortable"
        columns={gridColumns}
      >
        <Table.Header />
        <Table.Body rows={tableRows} rowKey={rowKey} />
      </Table.Provider>
    )
  }
  transformSortClasses(props) {
    let className = ''
    if (!props.className.includes('-none')) { className = `${props.className.includes('-asc') ? 'ascending' : 'descending'} sorted` }
    return { ...props, className }
  }
  moreRowsMessage() {
    const {
      total,
      rows
    } = this.props
    return (
      <Message attached="bottom" info>
        <Icon name="arrow down" />
        {`Mostrando ${rows.length} de ${total}`}
      </Message>)
  }
  wrapWithInfiniteScroll(table) {
    const {
      handleLoadMore,
      hasMore,
      isLoadingMore
    } = this.props

    return (
      <InfiniteScroll
        loadMore={handleLoadMore}
        hasMore={hasMore}
        useWindow
        initialLoad={false}
        loader={isLoadingMore ? <Loader active inline="centered" /> : this.moreRowsMessage()}
      >
        {table}
      </InfiniteScroll>)
  }
  render() {
    const { enableInfiniteScroll, isLoading, isLoadingMore } = this.props
    return (
      <div>
        {isLoading && !isLoadingMore && <Loader active inline="centered" />}
        {enableInfiniteScroll && (!isLoading || isLoadingMore) && this.wrapWithInfiniteScroll(this.getTable())}
        {!isLoading && !enableInfiniteScroll && this.getTable()}
      </div>
    )
  }
}
Grid.defaultProps = {
  enableInfiniteScroll: false,
  enableSort: false,
  enableAdd: false,
  enableEdit: true,
  rowKey: 'id'
}
export default Grid
