//connecting to Potsgres database from Node
require('dotenv').config()          // dot config
const Pool = require('pg').Pool

/*const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'SQL8103!',
    port: 5432
})
*/
// set environment to production to ensure minimal logging and optimize performance
const production = process.env.NODE_ENV === 'production'
const connection = `postgresql://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
const pool = new Pool({
    connectionString:production ? process.env.DATABASE_URL:connection,ssl:production
})
// get all users
const getUsers = (req,res) => {
    pool.query('SELECT * FROM accounts ORDER BY id', (error,result) => {
        if(error){
            throw error
        }
        res.status(200).json(result.rows)
    })
}
// get user by id
const getUserById = (req,res) => {
    const id = req.params.id
    console.log(id)
    pool.query('SELECT * FROM accounts WHERE id = $1',[id],(error,result) => {
        if(error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
}
// post new user 
const createUser = (req,res) => {
    const{id,email,password} = req.body
    pool.query('INSERT INTO accounts (id,email,password) VALUES ($1,$2,$3)',[id,email,password],(error,result)=>{
        if(error){
            throw error
        }
        res.status(201).send(`Created ID: ${id}`)
    })
}
// update user
const updateUser = (req,res) => {
    const id = req.params.id
    const {password} = req.body
    pool.query(
        'UPDATE accounts SET password = $1',[password],(error,result) => {
            if(error) {
                throw error
            }
            res.status(200).send(`User modified with ID: ${id}`)
        }
    )
}
// delete user
const deleteUser = (req,res) => {
    const id = req.params.id
    pool.query('DELETE FROM accounts WHERE id = $1',[id],(error,result)=>{
        if(error){  
            throw error
        }
        res.status(200).send(`User id ${id} deleted`) 
    })
}
// export modules 
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }
  