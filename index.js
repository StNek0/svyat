const express = require('express')
const path = require('path')
const morgan = require('morgan')

const server = express()
server.set('view engine', 'ejs')

const PORT = 3000

const createPath = (page) => path.resolve(__dirname, 'pages-ejs', `${page}.ejs`)

server.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
server.use(express.urlencoded({ extended: false }))
server.use(express.static('./pages-ejs/styles'))

server.get('/index', (req, res) => {
    res.render(createPath('index'))
})
server.get('/page1', (req, res) => {
    res.render(createPath('page1'))
})
server.get('/page2', (req, res) => {
    res.render(createPath('page2'))
})
server.use((req, res) => {
    res
        .status(404)
        .render(createPath('error'))
})

server.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})