const User = require("../model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const handleLogin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "email and password are required!" })
    }
    const foundUser = await User.findOne({ email }).exec()
    if (!foundUser) {
        return res.status(401).json({ message: "email not exists" })
    }

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password)

    if (match) {
        const roles = Object.values(foundUser.roles)
        const accessToken = jwt.sign(
            {
                userInfo: {
                    email: foundUser.email,
                    roles,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
        )
        const refreshToken = jwt.sign(
            { email: foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        )
        // saving refreshToken along with the current user
        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()
        console.log(result)

        // httpOnly cookie
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            // secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        })
        res.status(201).json({ accessToken })
    } else {
        res.status(401).json({ message: "wrong password" })
    }
}

module.exports = { handleLogin }
