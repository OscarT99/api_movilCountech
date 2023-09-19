const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const assignmentRoutes = require('./routes/assignment');

app.use(bodyParser.json());

// Conectar las rutas
app.use('/api', userRoutes);
app.use('/api', orderRoutes);
app.use('/api', employeeRoutes);
app.use('/api', assignmentRoutes);

module.exports = app;
