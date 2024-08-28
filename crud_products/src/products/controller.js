const pool = require('../../db.js');

const getProducts = (req, res) => {
    pool.query("SELECT * FROM products", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getUniqueProduct = (req, res) => {
    const id = req.params.id; // Obtém o ID dos parâmetros da requisição
    pool.query("SELECT * FROM products WHERE id = $1", [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    }); 
};

module.exports = {
    getProducts,
    getUniqueProduct
};