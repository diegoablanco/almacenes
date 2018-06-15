import React, { Component } from 'react'
import { Button, Loader, Message, Icon, Label, Popup } from 'semantic-ui-react'
import { compose } from 'redux'
import * as Table from 'reactabular-table'
import * as sort from 'sortabular'
import * as resolve from 'table-resolver'
import * as tree from 'treetabular'
import InfiniteScroll from 'react-infinite-scroller'
import { findIndex } from 'lodash'
import intl from 'react-intl-universal'
import { createColumns, addHeaderTransforms } from '../utils/reactabularHelpers'
import { ConfirmableButton } from '../screens/components'

class Grid extends Component {
  constructor(props) {
    super(props)
    const { columns } = props
    this.columns = createColumns(...columns)
    this.moreRowsMessage = this.moreRowsMessage.bind(this)
    this.treeCellFormatter = this.treeCellFormatter.bind(this)
  }
  getActionColumns() {
    const {
      editHandler,
      removeHandler,
      addHandler,
      enableAdd,
      enableEdit,
      enableDelete,
      canAdd,
      gridActionButtons,
      crudPage
    } = this.props
    return [
      {
        property: 'id',
        cell: {
          formatters: [(id, { rowData }) => (<Button.Group>
            {gridActionButtons && gridActionButtons(rowData)}
            {enableEdit &&
            <Popup
              trigger={<Button
                icon="write"
                size="mini"
                onClick={(e) => {
                  e.preventDefault()
                  editHandler(id)
              }}
              />}
              content={intl.get('common.edit')}
            />
            }
            {enableDelete &&
              <ConfirmableButton
                id={id}
                icon="delete"
                negative
                size="mini"
                onConfirm={async () => { await removeHandler(id) }}
                content={intl.get('common.remove')}
                confirmMessage={intl.get(`${crudPage}.deleteDialog.message`)}
                confirmHeader={intl.get(`${crudPage}.deleteDialog.title`)}
              />
              }
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
        },
        props: {
          style: {
            textAlign: 'right'
          }
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

    const customSortableTransform = (value, extra) =>
      this.transformSortClasses(sortable(value, extra))
    return this.columns.map(column => (column.sortable ? addHeaderTransforms([column], [sortable, customSortableTransform])[0] : column))
  }
  getTable() {
    const {
      enableSort,
      rowKey,
      enableActionColumn = true,
      enableTreeTabular = false
    } = this.props
    let { rows } = this.props
    const columns = enableSort ? this.getSortableColumns(this.columns) : this.columns
    const gridColumns = [...columns]
    const rowTransformers = [this.resolveNestedColumns(columns)]
    if (enableTreeTabular) {
      rowTransformers.push(tree.filter({ fieldName: 'showingChildren', parentField: 'parentId' }))
      const fixOrder = tree.fixOrder({ parentField: 'parentId' })
      rows = fixOrder(rows)
      const { cell } = gridColumns.find(column => column.property === rowKey)
      cell.formatters = [
        ...cell.formatters,
        this.treeCellFormatter(rows)]
    }
    if (enableActionColumn) {
      gridColumns.push(...this.getActionColumns())
    }
    const tableRows = compose(...rowTransformers)(rows)
    return (
      <Table.Provider
        className="ui striped table sortable"
        columns={gridColumns}
      >
        <Table.Header />
        <Table.Body
          rows={tableRows}
          rowKey={rowKey}
          onRow={({ highlight }) =>
             ({
              className: highlight ? 'warning' : ''
            })
          }
        />
      </Table.Provider>
    )
  }
  resolveNestedColumns(columns) {
    return resolve.resolve({
      columns: resolve.columnChildren({ columns }),
      method: resolve.nested
    })
  }
  treeCellFormatter(rows) {
    return (value, { rowData: { id, showingChildren, hierarchyLevel } }) => {
      const {
        toggleShowingChildren
      } = this.props
      const index = findIndex(rows, { id })
      const hasChildren = tree.hasChildren({ index, parentField: 'parentId' })(rows)
      const style = { marginLeft: `${(hierarchyLevel - 1) * 2}em` }
      if (hasChildren) {
        return (<Label style={style} as="a" icon={`angle ${showingChildren ? 'down' : 'right'}`} onClick={() => toggleShowingChildren(id)} content={id} />)
      }
      return (<Label style={style}>{id}</Label>)
    }
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
      <Message info>
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
        {enableInfiniteScroll
          && (!isLoading || isLoadingMore)
          && this.wrapWithInfiniteScroll(this.getTable())}
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
  enableDelete: true,
  rowKey: 'id'
}
export default Grid
