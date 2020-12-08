const express = require("express")
const cors = require("cors")
const studentsRoutes = require("./students")

const server = express()

const port = 3001

server.use(cors())
server.use(express.json()) // I need to specify this line of code otherwise all the request bodies will be undefined. And this line of code must come BEFORE the routes

server.use("/students", studentsRoutes)

server.listen(port, () => {
  console.log("Server is running on port: ", port)
})