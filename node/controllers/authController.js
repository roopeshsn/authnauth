const users = require("../model/users.json")
const bcrypt = require("bcrypt")

const usersDB = {
  users,
  setUsers: function (data) {
    this.users = data
  },
}

const handleLogin = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required!" })
  }
  const foundUser = usersDB.users.find((user) => user.email === email)
  if (!foundUser) {
    return res.status(401).json({ message: "email not exists" })
  }

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password)

  if (match) {
    // JWT
    res.status(201).json({ message: `user ${email} is logged in!` })
  } else {
    res.status(401).json({ message: "wrong password" })
  }
}

module.exports = { handleLogin }
