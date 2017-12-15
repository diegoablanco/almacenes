export function getObjectProperties(obj = {}) {
  return Object.keys(obj).map(key => [key, obj[key]])
}
