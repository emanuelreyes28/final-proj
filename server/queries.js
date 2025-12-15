//Connect to PG using the node-postgres package

const { Pool } = require('pg')

// Support connection string (e.g., from Neon) or individual components
const pool = process.env.DATABASE_URL 
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        // SSL is required for cloud databases like Neon
        ssl: { rejectUnauthorized: false }
      })
    : new Pool({
        user: process.env.DB_USER || 'me',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'projfive',
        password: process.env.DB_PASSWORD || 'password',
        port: process.env.DB_PORT || 5432
      })

//CREATE expenses
const createExpense = (req, res) => {
    const { expense_type, amount, notes } = req.body
    
    pool.query('INSERT INTO expenses (expense_type, amount, notes) VALUES ($1, $2, $3) RETURNING *', [expense_type, amount, notes], (error, result) => {
        if(error){
            throw error;
        }
        res.status(201).json(result.rows[0])
    })
}

//READ expenses
const getExpenses = (req, res) =>{
    pool.query('SELECT * FROM expenses ORDER BY id ASC', (error, result) =>{
        if(error){
            throw error;
        }    
        res.status(200).json(result.rows)
        })
}

//DELETE expenses
const deleteExpense = (req, res) => {
    const id = parseInt(req.params.id)
    
    pool.query('DELETE FROM expenses WHERE id = $1', [id], (error, result) => {
        if(error){
            throw error;
        }
        res.status(200).json({ message: `Expense deleted with ID: ${id}` })
    })
}

// export functions
module.exports = {
    createExpense,
    getExpenses,
    deleteExpense,
}