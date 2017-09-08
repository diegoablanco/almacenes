import React, {Component} from 'react'
import { connect } from 'react-redux'
import Grid from './Grid.js'

class GridContainer extends Component {
    buildSortFromSortingColumns(sortingColumns){
        var sort = {}
        Object.keys(sortingColumns).forEach(
        column => sort[column] = sortingColumns[column].direction === "asc" ? 1 : -1
        )
        return sort
    }
    componentDidMount = () => {
        const { buildRows, resetPageNumber } = this.props
        resetPageNumber()
        setTimeout(() =>
            this.find().then(result => {
                buildRows(result.value) 
            }))
    }
    componentWillReceiveProps = (nextProps) => {
        const { buildRows, gridReloaded, resetPageNumber } = this.props
        if(nextProps.reloadGrid && !this.props.reloadGrid){
                resetPageNumber()
                setTimeout(() =>
                    this.find().then(result => {
                    buildRows(result.value) 
                    gridReloaded()}))
            }
    }
    shouldComponentUpdate(nextProps, nextState) {
        const {filter} = this.props
        if(JSON.stringify(filter) !== JSON.stringify(nextProps.filter))
            return false
        return true
    }
    find = () => {
        const { filter, sortingColumns, find } = this.props
        const query = {
            $sort: this.buildSortFromSortingColumns(sortingColumns),
            $limit: 3,
            // $select: ['_id', 'name', 'email', 'phone'],
        }

        return find(Object.assign(query, filter))
    }
    handleSort = (sortingColumns) => {
        const { setSortingColumns, resetPageNumber, buildRows } = this.props
        resetPageNumber()
        setSortingColumns(sortingColumns)
        setTimeout(() =>
            this.find().then(result => {
                buildRows(result.value) 
            }), 100
        )
    }
    handleFilter = () => {
        const { resetPageNumber, buildRows } = this.props
        resetPageNumber()
        setTimeout(() =>
            this.find().then(result => {
                buildRows(result.value) 
            }), 100
        )
    }
    handleLoadMore = () => {
        const { increasePageNumber, buildRows } = this.props
        increasePageNumber()
        this.find().then(result => {
            buildRows(result.value, true)     
        })
    }
    render(){
        const {crudActions} = this.props
        return(
            <div>
                <this.props.toolbar handleFilter={this.handleFilter} crudActions={crudActions}/>
                <Grid 
                    {...this.props} 
                    handleLoadMore={this.handleLoadMore}
                    handleSort={this.handleSort}
                    handleFilter={this.handleFilter}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  const { sortingColumns, filter, reloadGrid, rows } = ownProps.uiStateSelector(state)
  const { queryResult } = ownProps.serviceStateSelector(state)
  const props = {
    queryResult: queryResult ? queryResult.data : [],
    hasMore: queryResult && queryResult.total > queryResult.limit + queryResult.skip,
    sortingColumns,
    filter,
    reloadGrid,
    rows,
    ...ownProps
  }
  return props
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { service, crudActions } = ownProps
    
    return {
        find: query => dispatch(service.find({query})), 
        setSortingColumns: sortingColumns => dispatch(crudActions.setSortingColumns(sortingColumns)),
        increasePageNumber: () => {
            dispatch(crudActions.increasePageNumber())
        },
        resetPageNumber: () => {
            dispatch(crudActions.resetPageNumber())
        },
        gridReloaded: () => dispatch(crudActions.gridReloaded()),
        buildRows: (result, concat) => dispatch(crudActions.buildRows(result, concat))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer)