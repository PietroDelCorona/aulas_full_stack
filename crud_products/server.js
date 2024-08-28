const express = require('express');
const productRoutes = require('./src/products/routes'); // Importa as rotas

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Usa as rotas definidas no arquivo 'routes.js'
app.use('/api/v1/products', productRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));