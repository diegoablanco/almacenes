import React, {Component} from 'react'
import { connect } from 'react-redux'
import Grid from './Grid.js'
import { setSortingColumns, increasePageNumber, resetPageNumber, gridReloaded } from '../../actions/customers'

class GridContainer extends Component {
    state = {
        rows: []
    }    
    buildSortFromSortingColumns(sortingColumns){
        var sort = {}
        Object.keys(sortingColumns).forEach(
        column => sort[column] = sortingColumns[column].direction === "asc" ? 1 : -1
        )
        return sort
    }
    componentDidMount = () => {
        this.find().then(() => {
            const {queryResult} = this.props
            this.setState({rows: queryResult})     
        })
    }
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.reloadGrid && !this.props.reloadGrid)
            this.find().then(() => {
            const {queryResult} = this.props
            this.setState({rows: queryResult})
            this.props.gridReloaded()  
        })
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
        };

        return find(Object.assign(query, filter))
    }
    handleSort = (sortingColumns) => {
        const { setSortingColumns, resetPageNumber } = this.props
        resetPageNumber()
        setSortingColumns(sortingColumns)
        setTimeout(() =>
            this.find().then(() => {
                const {queryResult} = this.props
                this.setState({rows: queryResult})
            }), 100
        )
    }
    handleFilter = () => {
        const { resetPageNumber } = this.props
        resetPageNumber()
        setTimeout(() =>
            this.find().then(() => {
                const {queryResult} = this.props
                this.setState({rows: queryResult})
            }), 100
        )
    }
    handleLoadMore = () => {
        const { increasePageNumber } = this.props
        increasePageNumber()
        this.find().then(() => {
            const {queryResult} = this.props
            this.setState(prevState => { return {rows: prevState.rows.concat(queryResult)}})     
        })
    }
    render(){
        return(<Grid 
        {...this.props} 
        rows={this.state.rows} 
        handleLoadMore={this.handleLoadMore}
        handleSort={this.handleSort}
        handleFilter={this.handleFilter}
        />)
    }
}

const mapStateToProps = (state, ownProps) => {
  const { queryResult, sortingColumns, filter, reloadGrid } = ownProps.stateSelector(state)
  const props = {
    queryResult: queryResult ? queryResult.data : [],
    hasMore: queryResult && queryResult.total > queryResult.limit + queryResult.skip,
    sortingColumns,
    filter,
    reloadGrid,
    ...ownProps
  }
  return props
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { service } = ownProps
    return {
        find: query => dispatch(service.find({query})), 
        setSortingColumns: sortingColumns => dispatch(setSortingColumns(sortingColumns)),
        increasePageNumber: () => {
            dispatch(increasePageNumber())
        },
        resetPageNumber: () => {
            dispatch(resetPageNumber())
        },
        gridReloaded: () => dispatch(gridReloaded())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer)