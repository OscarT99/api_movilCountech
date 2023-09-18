const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  cedula: { type: Number, required: [true,'el numero de identificación es obligatorio'], min: 5, unique:true},
  nombre: { type: String, required: [true,'El nombre es obligatorio'], match: /^[A-Za-z\s]+$/ },
  correo: {type: String,required: [true,'El correo electronico es obligatorio'],match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{3,}$/,unique:true},
  telefono: { type: String, required: [true,'El numero de telefono es obligatorio'],unique:true },
  ciudad: { type: String, required: [true,'La ciudad es obligatorio'], match: /^[A-Za-z\s]+$/ },
  direccion: { type: String, required: [true,'La dirección de residencia es obligatorio'] },
  fechaIngreso: { type: Date, required: [true,'La fecha de ingreso del trabajador es obligatorio'] },
  estado: { type: Boolean, default: true },
});

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee;