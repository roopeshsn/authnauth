const http = require("http")
const path = require("path")
const fs = require("fs")
const fsPromises = require("fs").promises
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const errorHandler = require("./middleware/errorHandler")
const corsOptions = require("./config/corsOptions")
const verifyJWT = require("./middleware/verifyJWT")
const cookieParser = require("cookie-parser")
const credentials = require("./middleware/credentials")
const connectDB = require("./config/dbConnection")
const app = express()
const PORT = process.env.PORT || 5000

// connect to MongoDB
connectDB()

// In-built middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "/public")))

// Handle options credentials in cors
app.use(credentials)

// custom middleware
app.use(cors(corsOptions))
app.use(errorHandler)

// middleware for cookies
app.use(cookieParser())

// routes
app.use("/register", require("./routes/api/register"))
app.use("/auth", require("./routes/api/auth"))
app.use("/refresh", require("./routes/api/refresh"))
app.use("/logout", require("./routes/api/logout"))

app.get("/", (req, res) => {
    res.send("AuthnAuth API")
})

app.use(verifyJWT)
app.get("/dashboard", (req, res) => {
    res.send("Welcome to your dashboard")
})

// server will only established when the connection to the DB is successful
mongoose.connection.once("open", () => {
    console.log("Connection Successful to MongoDB")
    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`)
    })
})
