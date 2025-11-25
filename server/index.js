const express = require('express')

const app = express()

const db = require('./queries')

const path = require('path')

app.use(express.json())

app.use(express.urlencoded({extended: true}))

const PORT = 9001

//CREATE
app.post('/links', db.createLink)

//READ
app.get('/links', db.getLinks)

//UPDATE

//DELETE
app.delete('/links/:id', db.deleteLink)

//Other routes
app.get('/test', (req,res) => {
    res.send('Test route working')
})

//Middleware - static files should come after API routes
app.use(express.static(path.resolve(__dirname, '../fav-links-react/dist')))

//routes
app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname, '../fav-links-react/dist', 'index.html'))
})






//starting express on port
app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}.`)
})

