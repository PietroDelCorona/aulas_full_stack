const pool = require('../../db.js');

const getProducts = (req, res) => {
    pool.query("SELECT * FROM products", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getUniqueProduct = (req, res) => {
    const id = req.params.id; 
    pool.query("SELECT * FROM products WHERE id = $1", [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    }); 
};

const postProduct = (req, res) => {
    const { id, name, price } = req.body;

    const query = "INSERT INTO products (id, name, price) VALUES ($1, $2, $3) RETURNING *";
    const values = [id, name, price];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error("Erro ao inserir o produto:", error);
            res.status(500).json({ error: "Erro ao inserir o produto." });
        } else {
            res.status(201).json(results.rows[0]); 
        }
    });
};

const putProduct = (req,res) => {
    const id = req.params.id;
    const { name, price } = req.body;
    const query = `
        UPDATE products
        SET name = $1, price = $2
        WHERE id = $3
        RETURNING *;
    `;
    const values = [name, price, id];
    pool.query(query, values, (error, results) => {
        if (error) {
            console.error("Erro ao atualizar o produto:", error);
            res.status(500).json({ error: "Erro ao atualizar o produto." });
        } else if (results.rowCount === 0) {
            res.status(404).json({ message: "Produto não encontrado." });
        } else {
            res.status(200).json(results.rows[0]); 
        }
    });
};

const deleteProduct = (req, res) => {
    const id = req.params.id;
    pool.query("DELETE FROM products WHERE id = $1", [id], (error, results) => {
        if (error) {
            console.error("Erro ao deletar o produto:", error);
            res.status(500).json({ error: "Erro ao deletar o produto." });
        } else if (results.rowCount === 0) {
            res.status(404).json({ message: "Produto não encontrado." });
        } else {
            res.status(204).send(); 
        }
    });
};

module.exports = {
    getProducts,
    getUniqueProduct,
    postProduct,
    putProduct,
    deleteProduct
};