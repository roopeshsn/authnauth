const users = require("../model/users.json")
const path = require("path")
const fsPromises = require("fs").promises

const usersDB = {
    users,
    setUsers: function (data) {
        this.users = data
    },
}

const handleLogout = async (req, res) => {
    // Deleting cookie on the client
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.sendStatus(204)
    }
    const refreshToken = cookies.jwt
    const foundUser = usersDB.users.find(
        (user) => user.refreshToken === refreshToken
    )
    if (!foundUser) {
        res.clearCookie("jwt", {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })
        return res.sendStatus(204) // No content
    }

    // Delete refreshToken in DB
    const otherUsers = usersDB.users.filter(
        (user) => user.refreshToken !== foundUser.refreshToken
    )
    const currentUser = { ...foundUser, refreshToken: "" }
    usersDB.setUsers([...otherUsers, currentUser])
    await fsPromises.writeFile(
        path.join(__dirname, "..", "model", "users.json"),
        JSON.stringify(usersDB.users)
    )
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    }) // secure: true for https
    return res.sendStatus(204)
}

module.exports = { handleLogout }
