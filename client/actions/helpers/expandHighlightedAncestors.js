import { fixOrder } from 'treetabular'
import { expandHighlightedAncestorsReducer } from '.'

export default data => {
  const orderedData = fixOrder({ parentField: 'parentId' })(data)
  return orderedData.reduce(expandHighlightedAncestorsReducer, [])
}
