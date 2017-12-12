export function getObjectProperties(obj = {}) {
  return Object.keys(obj).map(key => obj[key])
}
