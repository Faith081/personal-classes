const http = require("http")
const fs = require("fs")



const serverCreation = http.createServer((req, res) => {
  let filename = ""

  if (req.url === "/") {
    filename = "./home.html"
  }
  else if (req.url === "/about") {
    filename = "./about.html"
  } else {
    filename = "./404.html"
  }

  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(200, { "content-type": "text/plain" })
      res.end("server error")
      return
    } else {
      res.writeHead(filename === "404.html" ? 404 : 200, { "content-type": "text/html" })
      res.end(data)
    }

  })


})

serverCreation.listen(5000, console.log("server is running"))

