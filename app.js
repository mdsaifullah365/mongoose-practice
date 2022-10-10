const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
const productRoute = require('./routes/product.route');
app.use('/api/v1/product', productRoute);

exports = app;
