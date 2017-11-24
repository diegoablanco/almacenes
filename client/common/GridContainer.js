import React, {Component} from 'react'
import { connect } from 'react-redux'
import Grid from './Grid.js'
import { bindActionCreators  } from 'redux'

class GridContainer extends Component {
    componentDidMount = () => {
        const { loadGrid } = this.props
        loadGrid()
    }
    
    // shouldComponentUpdate(nextProps, nextState) {
    //     const {filter, filterColumns} = this.props
    //     if(JSON.stringify(filter) !== JSON.stringify(nextProps.filter))
    //         return true
    //     if(JSON.stringify(filterColumns) !== JSON.stringify(nextProps.filterColumns))
    //         return true
    //     return false
    // }

    render(){
        const {crudActions, sortGrid, loadMore, filterGrid, sortingColumns} = this.props
        return(
            <div>
                {this.props.toolbar && <this.props.toolbar handleFilter={filterGrid} crudActions={crudActions}/>}
                <Grid 
                    {...this.props} 
                    handleLoadMore={loadMore}
                    enableSort
                    handleSort={sortGrid}
                    enableInfiniteScroll={true}
                    sortingColumns={sortingColumns}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  const { sortingColumns, filter, reloadGrid, rows, canAdd } = ownProps.selectors.getUiState(state)
  const { queryResult, isLoading } = ownProps.selectors.getServiceState(state)
  const props = {
    queryResult: queryResult ? queryResult.data : [],
    isLoading,
    hasMore: queryResult && queryResult.total > queryResult.limit + queryResult.skip,
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