//set up server using express
const express = require('express')
const PORT = process.env.PORT || 3000 // defaults to localhost -> 3000
const app = express()
const cors = require('cors')
const database = require('./queries')
const { check } = require('express-validator')
app.use(cors())
app.use(express.json())
app.use(
    express.urlencoded({
    extended: true
  })
)
// endpoints
app.get('/', (req, res) => {
    res.json({ info: 'Postgres API' })
})
app.get('/accounts', database.getUsers)
app.get('/accounts/:id', database.getUserById)
app.get('/validate/:email/:password', database.validation)
app.post('/accounts',
[
    check('email').not().isEmpty().isLength({min:5,max:225}).trim(),
    check('password').not().isEmpty().isLength({min:5,max:225}).trim(),
    check('id').not().isEmpty().isLength({min:5,max:225}).trim()
],
database.createUser)
app.put('/accounts/:id', database.updateUser)
app.delete('/accounts/:id', database.deleteUser)
app.listen(PORT,() => {
    console.log(`Running on port ${PORT}.`)
})    
