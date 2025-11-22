//Connect to PG using the node-postgres package

const { Pool } = require('pg')


const pool = new Pool({

user: 'me',
host: 'localhost',
database: 'projfive',
password: 'password',
port: 5432
})

//create links
const createLink = () => {
    

}

//READ links
const getLinks = (req, res) =>{
    pool.query('SELECT * FROM links ORDER BY id ASC', (error, result) =>{
        if(error){
            throw error;
        }    
        res.status(200).json(result.rows)
        })
}

// export functions
module.exports = {
    getLinks,
}