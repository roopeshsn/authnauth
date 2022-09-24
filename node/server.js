const http = require("http")
const path = require("path")
const fs = require("fs")
const fsPromises = require("fs").promises
const express = require("express")
const cors = require("cors")
require("dotenv").config()
const errorHandler = require("./middleware/errorHandler")
const corsOptions = require("./config/corsOptions")
const app = express()
const PORT = process.env.PORT || 5000

// In-built middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "/public")))

// custom middleware
app.use(cors(corsOptions))
app.use(errorHandler)

// routes
app.use("/register", require("./routes/api/register"))
app.use("/auth", require("./routes/api/auth"))

app.get("/", (req, res) => {
  res.send("Hello Roopesh. S!")
})

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
