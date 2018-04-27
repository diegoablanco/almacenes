const { Op } = require('sequelize')
const { isEmpty } = require('lodash')

module.exports = {
  processSort(hook) {
    const { params: { query: { $sort } } } = hook
    const sortOrder = Object.values($sort)[0] === '1' ? 'ASC' : 'DESC'
    const sortEntity = Object.keys($sort)[0].split('.')
    if (sortEntity.length === 2) {
      const [include, property] = sortEntity
      hook.params.sequelize.order = [[
        hook.service.Model.associations[include], property, sortOrder
      ]]
      delete hook.params.query.$sort
    }
  },
  processFilter(hook, includes) {
    const { params: { query: { where = {}, $sort, $skip, ...query } } } = hook
    Object.keys(where).forEach(x => {
      includes[x].where = { id: { [Op.in]: where[x] } }
    })
    
    hook.data.filtered = !isEmpty(where) || !isEmpty(query)
    delete hook.params.query.where
  }
}
