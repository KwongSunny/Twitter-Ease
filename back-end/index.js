//set up server using express
const express = require('express')
const { check, oneOf } = require('express-validator')
const PORT = process.env.PORT || 3002 // defaults to localhost -> 3000
/*const production = process.env.NODE_ENV === 'production'
/*const origin = {
  origin: production ? 'https://twitter-ease-api.herokuapp.com/' : '*'
}
app.use(cors(origin))*/

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
app.post('/accounts',database.validation,database.createUser)
app.put('/accounts/:id', database.updateUser)
app.delete('/accounts/:id', database.deleteUser)

app.listen(PORT,() => {
    console.log(`Running on port ${PORT}.`)
})    
