import express from "express"
import cors from "cors"
import 'dotenv/config.js'
import indexRouter from "./router/indexRouter.js"
import "./config/database.js"

const server = express()
server.use(cors())
server.use(express.json())

server.use('/api', (req, res, next) => {
    console.log("New request to: " + req.url) //Middleware validación
    next()
},indexRouter)

server.get('/', (req, res, next) => {
    res.send('Welcome to pelisApp!')
})

server.listen(process.env.PORT, () => { console.log('Server running on port ' + process.env.PORT) })