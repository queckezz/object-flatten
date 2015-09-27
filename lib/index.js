
import isObject from 'is-object'

const isLast = val => Object.values(val).find(isObject) === undefined

const isNotObject = val => !isObject(val)

const flattenObject = (pred, obj) => {
  let flattened = {}
  for (var i in obj) {
    const val = obj[i]
    if (pred(val)) {
      flattened[i] = val
      continue
    }
    const flatObject = flattenObject(pred, val)
    for (var x in flatObject) {
      flattened[i + '.' + x] = flatObject[x]
    }
  }
  return flattened
}

export default flattenObject

export {
  isLast,
  isNotObject
}
