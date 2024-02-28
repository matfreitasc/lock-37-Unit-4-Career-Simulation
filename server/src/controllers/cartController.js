const pg = require('pg')
const client = new pg.Client(process.env.DATABASE_URL)

client.connect()

const getAllCarts = async (req, res) => {
    try {
        const { rows } = await client.query('SELECT * FROM cart')
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const createCart = async (req, res) => {
    try {
        const { rows } = await client.query(
            'INSERT INTO cart (user_id, product_id) VALUES ($1, $2) RETURNING *',
            [req.body.user_id, req.body.product_id]
        )
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const getCartById = async (req, res) => {
    try {
        const { rows } = await client.query(
            'SELECT * FROM cart WHERE id = $1',
            [req.params.id]
        )
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const updateCart = async (req, res) => {
    try {
        const { rows } = await client.query(
            'UPDATE cart SET user_id = $1, product_id = $2 WHERE id = $3 RETURNING *',
            [req.body.user_id, req.body.product_id, req.params.id]
        )
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const deleteCart = async (req, res) => {
    try {
        const { rows } = await client.query(
            'DELETE FROM cart WHERE id = $1 RETURNING *',
            [req.params.id]
        )
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getAllCarts,
    createCart,
    getCartById,
    updateCart,
    deleteCart,
}