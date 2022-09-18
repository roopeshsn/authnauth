// CORS
const whiteList = [
  "https://www.google.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  optionSuccessStatus: 200,
}

module.exports = corsOptions
