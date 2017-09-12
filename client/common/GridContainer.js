import React, {Component} from 'react'
import { connect } from 'react-redux'
import Grid from './Grid.js'
import { bindActionCreators  } from 'redux'

class GridContainer extends Component {
    componentDidMount = () => {
        const { loadGrid } = this.props
        loadGrid()
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        const {filter} = this.props
        if(JSON.stringify(filter) !== JSON.stringify(nextProps.filter))
            return false
        return true
    }

    render(){
        const {crudActions, sortGrid, loadMore, filterGrid} = this.props
        return(
            <div>
                <this.props.toolbar handleFilter={filterGrid} crudActions={crudActions}/>
                <Grid 
                    {...this.props} 
                    handleLoadMore={loadMore}
                    handleSort={sortGrid}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  const { sortingColumns, filter, reloadGrid, rows } = ownProps.selectors.getUiState(state)
  const { queryResult } = ownProps.selectors.getServiceState(state)
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
    const { crudActions } = ownProps
    return bindActionCreators(crudActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer)