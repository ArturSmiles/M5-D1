
const express = require("express")
const fs = require("fs")
const path = require("path")
const { nextTick } = require("process")
const uniqid = require("uniqid")

const router = express.Router()

router.get("/", (req, res) => {
  const studentsFilePath = path.join(__dirname, "students.json")
  const bufferFile = fs.readFileSync(studentsFilePath)
  const stringFile = bufferFile.toString()

  const studentsArray = JSON.parse(stringFile)
  res.send(studentsArray)
})


router.get("/:identifier", (req, res) => {


  const studentsFilePath = path.join(__dirname, "students.json")
  const bufferFile = fs.readFileSync(studentsFilePath)
  const stringFile = bufferFile.toString()
  const studentsArray = JSON.parse(stringFile)

  const idComingFromRequest = req.params.identifier

  const user = studentsArray.filter(user => user.ID === idComingFromRequest)

  res.send(user)
})


router.post("/", (req, res) => {

  const studentsFilePath = path.join(__dirname, "students.json")
  const bufferFile = fs.readFileSync(studentsFilePath)
  const stringFile = bufferFile.toString()
  const studentsArray = JSON.parse(stringFile)

    for(let i = 0; i<studentsArray.length; i++){
        if(studentsArray[i].email === req.body.email){
            throw new Error("Email already used")
        }
    }

    if(req.body.email === undefined){
        throw new Error("You need a Email!")
    }else{
        const newUser = req.body
        newUser.ID = uniqid()
        studentsArray.push(newUser)
      
        fs.writeFileSync(studentsFilePath, JSON.stringify(studentsArray))
        res.status(201).send(req.body)

    }
})


router.put("/:id", (req, res) => {

  const studentsFilePath = path.join(__dirname, "students.json")
  const bufferFile = fs.readFileSync(studentsFilePath)
  const stringFile = bufferFile.toString()
  const studentsArray = JSON.parse(stringFile)

  const newstudentsArray = studentsArray.filter(user => user.ID !== req.params.id)


  const modifiedUser = req.body
  modifiedUser.ID = req.params.id

  newstudentsArray.push(modifiedUser)

  fs.writeFileSync(studentsFilePath, JSON.stringify(newstudentsArray))
  res.send("Modify user route")
})



router.delete("/:id", (req, res) => {

  const studentsFilePath = path.join(__dirname, "students.json")
  const bufferFile = fs.readFileSync(studentsFilePath)
  const stringFile = bufferFile.toString()
  const studentsArray = JSON.parse(stringFile)

  const newstudentsArray = studentsArray.filter(user => user.ID !== req.params.id)

  fs.writeFileSync(studentsFilePath, JSON.stringify(newstudentsArray))

  res.status(204).send()
})

module.exports = router