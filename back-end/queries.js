const pool = require('./config')
// check if account is right and exists
const validation = (req,res) => {
    const email = req.params.email
    const password = req.params.password
    pool.query("SELECT id,password FROM accounts WHERE email=$1 AND password=$2",[email,password],(error,result)=>{
        if(result.rows == '') {
            res.status(404).json({Message:'accounts not found'})
        }
        else {
        res.status(200).json(result.rows)
        console.log(result.rows)
        }
    })
}
// get all users
const getUsers = (req,res) => {
    /*if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }*/
    pool.query('SELECT * FROM accounts ORDER BY id', (error,result) => {
        if(error){
            throw error
        }
        res.status(200).json(result.rows)
    })
}
// get user by id
const getUserById = (req,res) => {
    /*if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }*/
    const id = req.params.id
    const password = req.params.password
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
    /*if(!req.header('apiKey') || req.header('apiKey') !== process.env.API_KEY) {
        return res.status(401).json({status: 'error',message: 'Unauthorized'})
    }*/
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