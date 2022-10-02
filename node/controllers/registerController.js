const User = require("../model/User")
const bcrypt = require("bcrypt")
const ROLES_LIST = require("../config/rolesList")

const handleNewUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "email and password are required!" })
    }

    // check for duplicates
    const duplicate = await User.findOne({ email }).exec()
    if (duplicate) {
        return res.status(409).json({ message: "email already exists" }) // Conflict
    }
    try {
        // encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // create and store the new user
        const result = await User.create({
            email,
            password: hashedPassword,
        })

        console.log(result)
        res.status(201).json({ message: `New user created!` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { handleNewUser }
