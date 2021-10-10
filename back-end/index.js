//set up server using express
const express = require('express')
const app = express()
const database = require('./queries')
const PORT = 3000 || process.env.PORT // defaults to localhost -> 3000
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

app.listen(PORT,() => {
    console.log(`Running on port ${PORT}.`)
})    
