const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    default: 'Activo',
    required: true,
  },
  rol: {
    type: String, // Agrega un campo para el rol del usuario
    required: true,
    // Puedes establecer un valor por defecto para el rol si lo deseas
    // default: 'Usuario',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
