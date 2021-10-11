//set up server using express
const express = require('express')
const port = process.env.PORT || 3002 // defaults to localhost -> 3000
const app = express()
const database = require('./queries')
app.use(express.json())
app.use(
    express.urlencoded({
    extended: true
  })
)
app.get('/', (req, res) => {
    res.json({ info: 'Postgres API' })
})
app.get('/accounts', database.getUsers)
app.get('/accounts/:id', database.getUserById)
app.post('/accounts', database.createUser)
app.put('/accounts/:id', database.updateUser)
app.delete('/accounts/:id', database.deleteUser)

app.listen(port,() => {
    console.log(`Running on port ${port}.`)
})    
