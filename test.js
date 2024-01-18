const test = require('brittle')
const Hyperbee = require('hyperbee')
const Hypercore = require('hypercore')
const RAM = require('random-access-memory')
const beeTransaction = require('./index.js')

test('basic', async function (t) {
  const storage = new Hypercore(RAM)
  const db = new Hyperbee(storage, { keyEncoding: 'utf-8', valueEncoding: 'json' })

  const id = await beeTransaction(db, async function (b) {
    await b.put('/users/1')
    return 1337
  })

  t.is(id, 1337)
  t.ok(await db.get('/users/1'))
})

test('stop batch if any error', async function (t) {
  const storage = new Hypercore(RAM)
  const db = new Hyperbee(storage, { keyEncoding: 'utf-8', valueEncoding: 'json' })

  try {
    await beeTransaction(db, async function (b) {
      await b.put('/users/1')
      throw new Error('Failed')
    })
    t.fail('Should have failed')
  } catch (err) {
    t.is(err.message, 'Failed')
  }

  t.absent(await db.get('/users/1'))
})
