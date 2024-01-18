module.exports = async function beeTransaction (db, cb) {
  const batch = db.batch()
  let output = null

  try {
    await batch.lock()
    output = await cb(batch)
  } catch (err) {
    await batch.close()
    throw err
  }

  await batch.flush()

  return output
}
