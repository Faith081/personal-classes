const express = require("express")
const app = express()

app.use(express.json())

const courses = [];

app.post("/courses", (req, res) => {
  const { title, code, capacity } = req.body // this code collects the users info and stores the in the container


  //validation must exist
  if (!title) {
    return res.status(404).json({ message: "Title must exist" });
  }

  // validation capacity must be a number > 0
  if (typeof capacity !== "number" || capacity <= 0) {
    return res.status(400).json({ message: "capacity must be greater than 0" });
  }

  // validation code must be unique
  // Check if there is already a course in the array that has the same code the user is trying to create.
  //because we want to have a unique code.
  const existingCourse = courses.find(course => course.code === code)


  if (existingCourse) {
    return res.status(400).json({ message: " Courses must be unique" })
  } // 404 means a bad request and is from the client which the user



  // create new course object
  const newCourse = {
    id: Date.now().toString(), // this line is generating the id base on the current time and is also converting it to string
    title,
    code,
    capacity,
    student: []
  }

  courses.push(newCourse)

  res.status(201).json({
    message: "courses created successfully",
    data: newCourse
  })


})





const PORT = 5060
app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`))