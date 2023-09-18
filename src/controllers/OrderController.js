const Order = require('../models/Order');

// Obtener todas las órdenes
async function getAllOrders(req, res) {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las órdenes.' });
  }
}

// Obtener una orden por su ID
async function getOrderById(req, res) {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada.' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la orden.' });
  }
}

// Crear una nueva orden
async function createOrder(req, res) {
  const { cliente, contacto, ordenTrabajo, fechaOrdenTrabajo, fechaEntregaOrdenTrabajo, formaPago, valorTotal, observaciones, estado, processes } = req.body;
  try {
    const order = new Order({ cliente, contacto, ordenTrabajo, fechaOrdenTrabajo, fechaEntregaOrdenTrabajo, formaPago, valorTotal, observaciones, estado, processes });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la orden.' });
  }
}

// Actualizar una orden por su ID
async function updateOrder(req, res) {
  const { id } = req.params;
  const { cliente, contacto, ordenTrabajo, fechaOrdenTrabajo, fechaEntregaOrdenTrabajo, formaPago, valorTotal, observaciones, estado, processes } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(id, { cliente, contacto, ordenTrabajo, fechaOrdenTrabajo, fechaEntregaOrdenTrabajo, formaPago, valorTotal, observaciones, estado, processes }, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada.' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la orden.' });
  }
}

// Eliminar una orden por su ID
async function deleteOrder(req, res) {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la orden.' });
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
