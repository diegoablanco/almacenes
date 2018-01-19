const { differenceBy } = require('lodash')

function createOrUpdateAssociations(model, values, includes, previous) {
  includes.forEach(includeOption => {
    const { association: {
      associationAccessor,
      accessors,
      associationType,
      target }, include } = includeOption
    const associationValues = values[associationAccessor]

    if (!associationValues) {
      return
    }

    if (associationType === 'BelongsTo') {
      if (model[associationAccessor].id) {
        model[associationAccessor].update(associationValues)
      } else {
        model[accessors.create](associationValues)
      }
      if (include) {
        createOrUpdateAssociations(
          model.get(associationAccessor),
          associationValues,
          include,
          model.previous(associationAccessor)
        )
      }
    }

    if (associationType === 'BelongsToMany' || associationType === 'HasMany') {
      const { association: through } = includeOption

      associationValues.filter(value => !value.id).forEach(value =>
        model[accessors.create](value, { through }).then(item => {
          if (include) {
            createOrUpdateAssociations(
              item,
              value,
              include,
              model.previous(associationAccessor).find(x => x.id === item.id)
            )
          }
        }))
      differenceBy(((previous && previous.get(associationAccessor)) || model.previous(associationAccessor)), associationValues, 'id').forEach(toRemove => {
        model[accessors.remove](toRemove)
        toRemove.destroy()
      })
      model.get(associationAccessor).forEach(item => {
        const itemValues = associationValues.find(x => x.id === item.id)
        if (itemValues) {
          target.upsert(itemValues).then(() => {
            if (include) {
              createOrUpdateAssociations(
                item,
                itemValues,
                include,
                model.previous(associationAccessor).find(x => x.id === item.id)
              )
            }
          })
        }
      })
    }
  })
}
module.exports = createOrUpdateAssociations
