
const getDatabase = require('../server/database')

const sequelize = getDatabase()
// return Model.findAll({
//   attributes: ['id', [sequelize.fn('count', sequelize.col('likes.id')), 'likecount']],
//   include: [{ attributes: [], model: Like }],
//   group: ['model.id']
// });
const { models: { stockAccountMovement, product, productType, productCategory } } = sequelize
stockAccountMovement.findAll({
  include: {
    model: product,
    as: 'products',
    attributes: ['typeId', [sequelize.fn('count', sequelize.col('products.typeId')), 'likecount']],
    group: ['typeId'],
    
    include: {
      model: productType,
      as: 'type',
      include: { model: productCategory, as: 'category' },
      group: ['categoryId'],
      attributes: ['categoryId', [sequelize.fn('COUNT', 'categoryId'), 'TagCount']] }
  },
  attributes: []
}).then((stockAccountMovements) => {
  console.log(JSON.stringify(stockAccountMovements))
})
