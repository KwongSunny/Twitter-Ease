const pool = require('./config')
// get all users

const validation = (res,req,next) => {
    if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }
    const {id,password} = req.body
    pool.query('SELECT id AND password WHERE id=$1 and password=$s2',[id,password],(error,result) => {
        if(error) {
            return res.status(404).json({Message: 'id does not exist'})
        }
        else {
            return true
        }
    })
}
const getUsers = (req,res) => {
    if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }
    pool.query('SELECT * FROM accounts ORDER BY id', (error,result) => {
        if(error){
            throw error
        }
        res.status(200).json(result.rows)
    })
}
// get user by id
const getUserById = (req,res) => {
    if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }
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
    if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }
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
    if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }
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
    if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }
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
    validation,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }
  