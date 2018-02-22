module.exports = function setUser(field) {
  return ({ params: { user }, data }) => {
    data[`${field}Id`] = user.id
  }
}
