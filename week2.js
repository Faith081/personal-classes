const express = require("express")
const app = express()


const studentInfo = [{ "name": "Kelv", "id": 23 },
{ "name": "Myke", "id": 25 },
{ "name": "Kate", "id": 26 },
{ "name": "Amaze", "id": 28 }
]

// this section returns all users information
app.get("/student", (req, res) => {
  res.status(200).json(studentInfo)

})

// returns user by id using params
app.get("/student/:id", (req, res) => {
  const id = Number(req.params.id)
  const user = studentInfo.find(u => u.id === id)

  if (!user) {
    return res.status(404).send("STUDENT NOT FOUND")
  }
  res.status(200).json(user)
})

// returns all users filtered by name (using query)
app.get("/users", (req, res) => {
  const name = req.query.name // this code gets the name from the URl

  const users = studentInfo.filter(user => user.name === name)

  if (users.length === 0) {
    return res.status(404).json({ message: "user does not exist" })
  }
  res.status(200).json(users)

})


app.listen(9009, () => console.log("server running"))


