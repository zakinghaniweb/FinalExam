// All imports/requires =>
const express = require("express")
const cors = require("cors")
const router = require("./src/routes/routes")
const dbConnect = require("./db")
const app = express()
const port = 8000

// MiddleWare =>
app.use(express.json())
app.use(cors())
app.use(router)
dbConnect()

// Listening to the server =>
app.listen(port, err=>{
    if (err) return console.log(err)
    console.log(`The server is running at port: ${port}`)
})