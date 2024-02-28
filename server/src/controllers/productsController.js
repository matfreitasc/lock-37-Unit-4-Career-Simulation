const pg = require('pg')
const client = new pg.Client(process.env.DATABASE_URL)

client.connect()

const getAllProducts = async (req, res) => {
    try {
        const { rows } = await client.query('SELECT * FROM products')
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const createProduct = async (req, res) => {
    try {
        const { rows } = await client.query(
            'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
            [req.body.name, req.body.price]
        )
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const getProductById = async (req, res) => {
    try {
        const { rows } = await client.query(
            'SELECT * FROM products WHERE id = $1',
            [req.params.id]
        )
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const updateProduct = async (req, res) => {
    try {
        const { rows } = await client.query(
            'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
            [req.body.name, req.body.price, req.params.id]
        )
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { rows } = await client.query(
            'DELETE FROM products WHERE id = $1 RETURNING *',
            [req.params.id]
        )
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
}