const express = require("express");
const app = express();

app.use(express.json());

const studentCourse = [];

app.post("/courses", (req, res) => {

  const { title, code, capacity } = req.body


  if (!title) {
    return res.status(400).json({ message: "tittle must exist" });
  }


  if (!code) {
    return res.status(400).json({ message: "code must exist" })
  }

  if (typeof capacity !== "number" || capacity <= 0) {
    return res.status(400).json({ message: "capacity must be greater than 0 " })
  }


  const existingCourse = studentCourse.find(course => course.code === code)



  if (existingCourse) {
    return res.status(400).json({ message: "course must be unique" })

  }

  const NewCourse = {
    id: Date.now().toString(),
    title,
    code,
    capacity,
    student: []
  }

  studentCourse.push(NewCourse);

  res.status(201).json({ message: "new course created" })

})






const PORT = 1221
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})


































// // middleware function are function that have access to the request object(req) and the response object(res).
// // and the next middle function is the applications request-response cycle
// // in express we have five different types of middleware
// //which are : Application-level middleware which is use in the application level
// // third party middleware
// // Router-level middleware
// //build-in middleware
// //error-handling middleware


// const express = require("express")
// const app = express()

// const PORT = 7111;









// app.listen(PORT, () => console.log(`app is running on port ${PORT}`))