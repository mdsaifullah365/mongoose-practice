const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Data found successfully');
});

module.exports = app;
