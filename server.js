const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');

const app = require('./app');

// Database Connection
mongoose.connect(process.env.DATABASE).then(() => {
  console.log('Database connected successfully'.blue.bold);
});

// Server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server  is running'.yellow.bold);
});
