const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

export default ({ reducer1, reducer2, state, action }) =>
  compose(state2 => reducer2(state2, action), reducer1)(state, action)
