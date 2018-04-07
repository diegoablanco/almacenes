const { Op } = require('sequelize')

module.exports = {
  processSort(hook, includes) {
    const { params: { query: { $sort } } } = hook
    const sortOrder = Object.values($sort)[0] === '1' ? 'ASC' : 'DESC'
    const sortEntity = Object.keys($sort)[0].split('.')
    if (sortEntity.length === 2) {
      const [include, property] = sortEntity
      hook.params.sequelize.order = [[includes[include], property, sortOrder]]
      delete hook.params.query.$sort
    }
  },
  processFilter(hook, includes) {
    const { params: { query: { where = [] } } } = hook
    Object.keys(where).forEach(x => {
      includes[x].where = { id: { [Op.in]: where[x] } }
    })
    
    delete hook.params.query.where
  }
}
