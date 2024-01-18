# bee-transaction

Automatic batch for Hyperbee

```
npm i bee-transaction
```

## Usage

It creates a batch, locks, gives you a callback to use it, and flushes or closes if any error.

```js
const beeTransaction = require('bee-transaction')

const db = new Hyperbee(...)

const id = await beeTransaction(db, async function (b) {
  const userId = 1

  await b.put('/users/' + userId, { email, password })
  await b.put('/index/email/' + email, userId)

  return userId
})

console.log(id) // => 1
```

## License

MIT
