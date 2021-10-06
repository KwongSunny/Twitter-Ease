//set up server using express
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000 // defaults to localhost -> 3000

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Postgres API' })
})

app.listen(PORT,() => {
    console.log(`Running on port ${port}.`)
})
