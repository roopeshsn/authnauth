const User = require("../model/User")

const handleLogout = async (req, res) => {
    // Deleting cookie on the client
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.sendStatus(204)
    }
    const refreshToken = cookies.jwt
    const foundUser = await User.findOne({ email }).exec()
    if (!foundUser) {
        res.clearCookie("jwt", {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })
        return res.sendStatus(204) // No content
    }

    // Delete refreshToken in DB
    foundUser.refreshToken = ""
    const result = foundUser.save()
    console.log(result)

    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    }) // secure: true for https
    return res.sendStatus(204)
}

module.exports = { handleLogout }
