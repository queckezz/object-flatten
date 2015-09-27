
# object-flatten

[![Build Status][travis-image]][travis-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Js Standard Style][standard-image]][standard-url]

Flatten a nested object based on a predicate function. The keys are rewritten to `path.to.nested.object`.

## Install

```bash
$ npm install --save object-flatten
```

## Example

See [test/index.js](./test/index.js) for full examples.

```js
import flatten, { isLast } from 'object-flatten'

const flattened = flatten(isLast, {
  margin: {
    auto: { marginLeft: 'auto', marginRight: 'auto' }
  }
})
```

This returns you a flattened object:

```js
{
  'margin.auto': { marginLeft: 'auto', marginRight: 'auto' }
}
```

## Usage

[![NPM](https://nodei.co/npm/object-flatten.png?compact=true)](https://www.npmjs.com/package/object-flatten)

#### `obj = flattenObject(predicate, obj)`

**Default export** Returns a flattened object.

- `predicate` A function which decides when to stop flattening. It is invoked on each property in the object with the signature `property => true|false`.

#### `isLast`

Predicate function which flattens until the deepest object.

```js
flatten(isLast, some: { very: { deep: { prop: true } } })
// { 'some.very.deep: { prop: true } }
```

#### `isNotObject`

Predicate function which flattens as deep as possible.

```js
flatten(isNotObject, some: { very: { deep: { prop: true } } })
// { 'some.very.deep.prop': true } }
```

## Advanced Use Case

The main use case I had in mind, is together with [unistyle](https://github.com/joakimbeng/unistyle). Let's say we have a `positions.js` module which contains:

```js
export default {
  relative: { position: 'relative' },
  absolute: { position: 'absolute' },
  fixed: { position: 'fixed' },
  top0: { top: 0 },
  bottom0: { bottom: 0 },
  left0: { left: 0 },
  right0: { right: 0 },
  
  zindex: [
    new Error('index should be between 1 and 4'),
    { zIndex: 1 },
    { zIndex: 2 },
    { zIndex: 3 },
    { zIndex: 4 }
  ]
}
```

Then you can use this with your preferred virtual dom library and [cngen](https://www.npmjs.com/package/cngen):

```js
import { margin } from './style/white-space'
const Container = ({ size, children }) => {
  return (
    <div class={cngen(margin.auto)}>
      {children}
    </div>
  )
}
```

The problem comes in when you want to generate your css with this sort of structure. What you have to do is to flatten the object manually:

```js
export default classnameify({
    ...positions,
    ...positions.zindex
})
```

Now imagine that this structure can be even more deep and the manual flattening becomes unmaintainable. This is where `object-flatten` helps:

```js
export default {
    ...flattenObject(isLast, positions)
}
```

## Run Tests

```bash
$ npm test
```

## License

[MIT][license-url]

[npm-image]: https://img.shields.io/npm/v/object-flatten.svg?style=flat-square
[npm-url]: https://npmjs.org/package/object-flatten

[david-image]: http://img.shields.io/david/queckezz/object-flatten.svg?style=flat-square
[david-url]: https://david-dm.org/queckezz/object-flatten

[license-image]: http://img.shields.io/npm/l/object-flatten.svg?style=flat-square
[license-url]: ./license

[travis-image]: https://img.shields.io/travis/queckezz/object-flatten.svg?style=flat-square
[travis-url]: https://travis-ci.org/queckezz/object-flatten

[coveralls-image]: https://img.shields.io/coveralls/queckezz/object-flatten/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/queckezz/object-flatten?branch=master

[standard-image]: https://img.shields.io/badge/code-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard