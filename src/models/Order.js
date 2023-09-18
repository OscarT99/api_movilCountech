const mongoose = require('mongoose');

// Esquema de la talla
const tallaSchema = new mongoose.Schema({
  talla: { type: String, required: true },
  cantidad: { type: Number, required: true },
});

// Esquema del color
const colorSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'El color es requerido'], match: /^[A-Za-z\s]+$/ },
  tallas: [tallaSchema],
  totalQuentyColor: { type: Number, default: 0 }, // Campo para almacenar la suma de cantidades
});

// Método pre-save para calcular y actualizar totalQuentyColor
colorSchema.pre('save', function (next) {
  this.totalQuentyColor = this.tallas.reduce((total, talla) => total + talla.cantidad, 0);
  next();
});

// Esquema de la referencia
const referenceSchema = new mongoose.Schema({
  num: { type: Number, required: [true, 'El numero de referencia es requerido'], integer: true },
  description: { type: String, required: [true, 'La descripción es requerida'], match: /^[A-Za-z\s]+$/ },
  unitValue: { type: Number, required: [true, 'El valor unitario es requerido'], integer: true },
  colors: [colorSchema],
  totalQuentyReferences: { type: Number, default: 0 }, // Campo para almacenar la suma de totalQuentyColor
});

// Método pre-save para calcular y actualizar totalQuentyReferences
referenceSchema.pre('save', function (next) {
  this.totalQuentyReferences = this.colors.reduce((total, color) => total + color.totalQuentyColor, 0);
  next();
});

// Esquema de la orden principal
const orderSchema = new mongoose.Schema({
  cliente: { type: String, required: [true, 'El nombre del cliente es obligatorio'], match: /^[A-Za-z\s]+$/ },
  contacto: { type: String, required: [true, 'El nombre del contacto es obligatorio'], match: /^[A-Za-z\s]+$/ },
  ordenTrabajo: { type: Number, required: [true, 'El numero de orden de trabajo es obligatorio'], unique: true, min: 1 },
  fechaOrdenTrabajo: { type: Date, required: [true, 'La fecha de la orden de trabajo es obligatoria'] },
  fechaEntregaOrdenTrabajo: { type: Date, required: [true, 'La fecha de entrega de la orden de trabajo es obligatoria'] },
  formaPago: { type: String, enum: ['Contado', 'Credito'], required: [true, 'La forma de pago es obligatoria'] },
  valorTotal: { type: Number, required: [true, 'El valor total es obligatorio'], min: 1 },
  observaciones: { type: String, required: false, max: 500 },
  estado: { type: String, enum: ['Ingresado', 'En producción', 'Terminado', 'Entregado'], default: 'Ingresado' },
  processes: [
    {
      name: { type: String, required: [true, 'El proceso es requerido'], match: /^[A-Za-z\s]+$/ },
      references: [referenceSchema],
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
