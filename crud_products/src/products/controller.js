const pool = require('../../db.js');

const getProducts = (req, res) => {
    pool.query("SELECT * FROM products", (error, results) => {
        if (error){
            console.error("Erro ao buscar os produtos:", error);
            return res.status(500).json({ error: "Erro ao buscar os produtos."})
        }
        res.status(200).json(results.rows);
    })
};

const getUniqueProduct = (req, res) => {
    const id = req.params.id; 

    if (!id || isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({ error: "O 'id' deve ser um número positivo e válido." });
    }

    pool.query("SELECT * FROM products WHERE id = $1", [id], (error, results) => {
        if (error){
            console.error("Erro ao buscar o produto:", error);
            return res.status(500).json({ error: "Erro ao buscar os produtos."})
        }

        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Produto não encontrado." });
        }

        res.status(200).json(results.rows);
    }); 
};

const postProduct = (req, res) => {
    const { id, name, price, category } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: "O 'name' não pode ser vazio e deve ser uma string válida." });
    }

    if (price == null || price <= 0) {
        return res.status(400).json({ error: "O 'price' deve ser um número positivo e maior que zero." });
    }

    if (!category || typeof category !== 'string' || category.trim() === '') {
        return res.status(400).json({ error: "A 'category' não pode ser vazia e deve ser uma string válida." });
    }

    const query = "INSERT INTO products (id, name, price, category) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [id, name, price, category];

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

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: "O 'name' não pode ser vazio e deve ser uma string válida." });
    }

    if (price == null || price <= 0) {
        return res.status(400).json({ error: "O 'price' deve ser um número positivo e maior que zero." });
    }

    if (!category || typeof category !== 'string' || category.trim() === '') {
        return res.status(400).json({ error: "A 'category' não pode ser vazia e deve ser uma string válida." });
    }

    const query = `
        UPDATE products
        SET name = $1, price = $2, category = $3
        WHERE id = $4
        RETURNING *;
    `;
    const values = [name, price, category, id];
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

    if (!id || isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({ error: "O 'id' deve ser um número positivo e válido." });
    }

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