import test from 'ava'
import flatten, { isLast, isNotObject } from '../lib'

test('basic', t => {
  const actual = {
    some: { very: { deep: { prop: true } } }
  }

  const expected = { 'some.very.deep.prop': true }

  t.same(flatten(isNotObject, actual), expected)
  t.end()
})


test('isLast', t => {
  const actual = {
    margin: {
      auto: { marginLeft: 'auto', marginRight: 'auto' }
    }
  }

  const expected = {
    'margin.auto': { marginLeft: 'auto', marginRight: 'auto' }
  }

  t.same(flatten(isLast, actual), expected)
  t.end()
})

test('isLast with arrays', t => {
  const actual = {
    margin: {
      left: [
        { marginLeft: 0 },
        { marginLeft: '.5em' }
      ],

      x: [
        { marginLeft: 0, marginRight: 0 },
        { marginLeft: '.5em', marginRight: '.5em' }
      ]
    }
  }

  const expected = {
    'margin.left.0': { marginLeft: 0 },
    'margin.left.1': { marginLeft: '.5em' },
    'margin.x.0': { marginLeft: 0, marginRight: 0 },
    'margin.x.1': { marginLeft: '.5em', marginRight: '.5em' }
  }

  t.same(flatten(isLast, actual), expected)
  t.end()
})
