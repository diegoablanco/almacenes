import { getParents } from 'treetabular'

export default (prevItem, item, index, data) => {
  if (item.highlight) {
    const parents = getParents({ index, idField: 'id', parentField: 'parentId' })(data);
    parents
      .forEach(x => { data.find(parent => x.id === parent.id).showingChildren = true })
  }
  return data
}
