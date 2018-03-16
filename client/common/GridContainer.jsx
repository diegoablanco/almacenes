import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Grid from './Grid'

class GridContainer extends Component {
  render() {
    const { crudActions, sortGrid, loadMore, filterGrid, ...rest } = this.props
    return (
      <div>
        {this.props.toolbar && <this.props.toolbar handleFilter={filterGrid} crudActions={crudActions} />}
        <Grid
          {...rest}
          handleLoadMore={loadMore}
          enableSort
          handleSort={sortGrid}
          enableInfiniteScroll
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { sortingColumns, filter, reloadGrid, rows, canAdd, isLoadingMore } = ownProps.selectors.getUiState(state)
  const { queryResult, isLoading } = ownProps.selectors.getServiceState(state)
  const props = {
    queryResult: queryResult ? queryResult.data : [],
    isLoading,
    isLoadingMore,
    hasMore: queryResult && queryResult.total > queryResult.limit + queryResult.skip,
    total: queryResult && queryResult.total,
    sortingColumns,
    filter,
    reloadGrid,
    rows,
    canAdd,
    ...ownProps
  }
  return props
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { crudActions } = ownProps
  return bindActionCreators(crudActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer)
