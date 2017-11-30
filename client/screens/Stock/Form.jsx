import React from 'react'
import { Fields } from 'redux-form'
import { Grid } from 'semantic-ui-react'
import lookupField from '../../common/LookupField'

export default function StockForm({ extras: { customersLookup, customersLookupActions } }) {
  return (
    <Grid verticalAlign="middle" centered textAlign="center">
      <Grid.Column tablet={10} mobile={16} computer={6}>
        <Fields
          names={['targetCustomer.id', 'targetCustomer.description']}
          component={lookupField}
          lookupState={customersLookup}
          lookupActions={customersLookupActions}
        />
        {/* <Search
          loading={customersLookup.isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={(event, { value }) => customersLookupActions.handleSearchChange(value)}
          results={customersLookup.queryResult}
          //value={value}
        /> */}
      </Grid.Column>
    </Grid>
  )
}
