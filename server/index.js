const express = require('express')
const PORT = 8000

const app = express()

.get('/', (req, res) => {
  res.send('Hello World!')
})

.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})