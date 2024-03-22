const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        req.isAdmin = false
        return next()
    }
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) return res.status(403).send('Forbidden ')
        // verify is the user is an admin
        req.isAdmin = decoded.is_admin
        next()
    })
}

module.exports = verifyAdmin
