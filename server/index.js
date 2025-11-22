const express = require('express')

const app = express()

const db = require('./queries')

const path = require('path')

app.use(express.json())

app.use(express.urlencoded({extended: true}))

const PORT = 9001

//Middleware

app.use(express.static(path.resolve(__dirname, '../fav-links-react/dist')))

//routes
app.get('/', (req,res) => {

    res.sendFile(path.resolve(__dirname, '../fav-links-react/dist', 'index.html'))
})


app.get('/test', (req,res) => {
    res.send('Test route working')
})



//CRUD

//CREATE 

//READ
app.get('/links', db.getLinks)


//UPDATE

//DELETE






//starting express on port
app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}.`)
})

