const express = require('express');

const userRoutes = require("./src/users/routes");
const bookRoutes = require("./src/books/routes");
const cartRoutes = require("./src/carts/routes");
const categoryRoutes = require("./src/categories/routes");
const orderitemRoutes = require("./src/orderitens/routes");
const orderRoutes = require("./src/orders/routes");
const paymentRoutes = require("./src/payments/routes");
const reviewRoutes = require("./src/reviews/routes");

const app = express();
const port = 3000;

app.use((express.json()));

app.get('/', (req, res) => {
    res.send("Hello World!");
});

/*
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/carts', cartRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/orderitems', orderitemRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/reviews', reviewRoutes);
*/
app.listen(port, () => console.log(`App listening on port ${port}`));