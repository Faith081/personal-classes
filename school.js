const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
const { count } = require("console")

const data_file = path.join(__dirname, "courses.json")







let courses = [];

if (fs.existsSync(data_file)) {
  const data = fs.readFileSync(data_file);
  courses = JSON.parse(data);
}




app.use(express.json())

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
    students: []
  }

  courses.push(newCourse)
  fs.writeFileSync(data_file, JSON.stringify(courses, null, 2))

  res.status(201).json({
    message: "courses created successfully",
    data: newCourse
  })


})

app.post("/courses/:courseId/enroll", (req, res) => {

  const { courseId } = req.params;
  const { name, email, } = req.body

  const eCourse = courses.find(course => course.id === courseId)

  if (!eCourse) {
    return res.status(404).json({ message: "course not found" })
  }

  const existingEmail = eCourse.students.find(c => c.email === email)

  if (existingEmail) {
    return res.status(400).json({ message: "student with email already enrolled" })
  }

  if (eCourse.students.length >= eCourse.capacity) {
    return res.status(400).json({ message: "course capacity exceeded" })
  }


  const newStudent = { name, email }

  eCourse.students.push(newStudent)
  fs.writeFileSync(data_file, JSON.stringify(courses, null, 2))

  res.status(201).json({
    message: "student enrolled successfully",
    data: newStudent
  });

});


app.get("/courses", (req, res) => {

  let filteredCourses = [...courses]
  const { minCapaciy, title } = req.query

  if (minCapaciy) {
    return filteredCourses = filteredCourses.filter(f => f.capacity >= Number(minCapaciy))
  }

  if (title) {
    return filteredCourses = filteredCourses.filter(t => t.title.toLowerCase().includes(title.toLocaleLowerCase()))
  }

  res.status(200).json(filteredCourses);

})


app.get("/courses/:courseId/students", (req, res) => {
  const { courseId } = req.params
  const { name } = req.query

  const course = courses.find(c => c.id === courseId)

  if (!course) {
    return res.status(404).json({
      success: true,
      message: "course not found"
    })
  }

  if (course.students.length >= course.capacity) {
    return res.status(400).json({
      count: course.students.lenght,
      success: false,
      message: "course is full"
    })
  }


  let fileteredStudent = [...course.students]

  if (name) {
    fileteredStudent = fileteredStudent.filter(s => s.name.toLowerCase().includes(name.toLowerCase()))
  }


  res.status(200).json({
    success: true,
    count: fileteredStudent.length,
    data: fileteredStudent
  })

})



const PORT = 5060
app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`))