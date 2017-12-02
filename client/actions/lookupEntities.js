export default function (service, entity, fieldToLookup) {
  return {
    search(search) {
      return dispatch => {
        const query = {
          entity
        }
        query[fieldToLookup] = {
          $like: `%${search}%`
        }
        dispatch(service.find({ query }))
      }
    },
    clear() {
      return dispatch => {
        dispatch(service.reset())
      }
    }
  }
}
