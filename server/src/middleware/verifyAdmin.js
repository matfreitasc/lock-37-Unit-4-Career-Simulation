const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader)
        return res.status(401).send({
            message: 'Authorization header required',
        })
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) return res.status(403).send('Forbidden ')
        // verify is the user is an admin
        req.isAdmin = decoded.isAdmin
        next()
    })
}

module.exports = verifyAdmin