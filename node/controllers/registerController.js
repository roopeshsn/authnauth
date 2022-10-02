const users = require("../model/users.json")
const fsPromises = require("fs").promises
const path = require("path")
const bcrypt = require("bcrypt")
const ROLES_LIST = require("../config/rolesList")

const usersDB = {
    users,
    setUsers: function (data) {
        this.users = data
    },
}

const handleNewUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "email and password are required!" })
    }
    const duplicate = usersDB.users.find((user) => user.email === email)
    if (duplicate) {
        return res.status(409).json({ message: "email already exists" })
    }
    try {
        // encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10)
        // creating new user
        const newUser = {
            email,
            roles: { User: ROLES_LIST.USER },
            password: hashedPassword,
        }
        usersDB.setUsers([...usersDB.users, newUser])
        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(usersDB.users)
        )
        console.log(usersDB.users)
        res.status(201).json({ message: `New user ${email} created!` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { handleNewUser }
