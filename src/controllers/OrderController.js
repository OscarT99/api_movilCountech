// const Order = require('../models/Order');

// // Obtener todas las órdenes
// async function getAllOrders(req, res) {
//   try {
//     const orders = await Order.find();
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener las órdenes.' });
//   }
// }

// // Obtener una orden por su ID
// async function getOrderById(req, res) {
//   const { id } = req.params;
//   try {
//     const order = await Order.findById(id);
//     if (!order) {
//       return res.status(404).json({ error: 'Orden no encontrada.' });
//     }
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener la orden.' });
//   }
// }

// // Crear una nueva orden
// async function createOrder(req, res) {
//   const { cliente, contacto, ordenTrabajo, fechaOrdenTrabajo, fechaEntregaOrdenTrabajo, formaPago, valorTotal, observaciones, estado, processes } = req.body;
//   try {
//     console.log(req.body); // Muestra los datos recibidos en el cuerpo de la solicitud
//     const order = new Order({ cliente, contacto, ordenTrabajo, fechaOrdenTrabajo, fechaEntregaOrdenTrabajo, formaPago, valorTotal, observaciones, estado, processes });
//     await order.save();
//     res.status(201).json(order);
//   } catch (error) {
//     console.error(error); // Muestra cualquier error que ocurra
//     res.status(400).json({ error: 'Error al crear la orden.' });
//   }
// }

// // Actualizar una orden por su ID
// async function updateOrder(req, res) {
//   const { id } = req.params;
//   const { cliente, contacto, ordenTrabajo, fechaOrdenTrabajo, fechaEntregaOrdenTrabajo, formaPago, valorTotal, observaciones, estado, processes } = req.body;
//   try {
//     const order = await Order.findByIdAndUpdate(id, { cliente, contacto, ordenTrabajo, fechaOrdenTrabajo, fechaEntregaOrdenTrabajo, formaPago, valorTotal, observaciones, estado, processes }, { new: true });
//     if (!order) {
//       return res.status(404).json({ error: 'Orden no encontrada.' });
//     }
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al actualizar la orden.' });
//   }
// }

// // Eliminar una orden por su ID
// async function deleteOrder(req, res) {
//   const { id } = req.params;
//   try {
//     const order = await Order.findByIdAndDelete(id);
//     if (!order) {
//       return res.status(404).json({ error: 'Orden no encontrada.' });
//     }
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ error: 'Error al eliminar la orden.' });
//   }
// }

// module.exports = {
//   getAllOrders,
//   getOrderById,
//   createOrder,
//   updateOrder,
//   deleteOrder,
// };


const Order = require('../models/Order');
const Assignment = require('../models/Assignment'); // Importa el modelo de Asignación

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
    console.log(req.body); // Muestra los datos recibidos en el cuerpo de la solicitud
    const order = new Order({ cliente, contacto, ordenTrabajo, fechaOrdenTrabajo, fechaEntregaOrdenTrabajo, formaPago, valorTotal, observaciones, estado, processes });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error); // Muestra cualquier error que ocurra
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

// Asignar unidades a un trabajador
async function assignUnitsToEmployee(req, res) {
  const { orderId, referenceId, color, size, unitsAssigned, employeeId, startDate, endDate } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada.' });
    }

    // Verificar si las unidades asignadas no superan las disponibles
    const reference = order.processes[0].references.find((ref) => ref._id.equals(referenceId));

    if (!reference) {
      return res.status(404).json({ error: 'Referencia no encontrada en el pedido.' });
    }

    const availableUnits = reference.totalQuentyColor - reference.unitsAssigned;
    if (unitsAssigned > availableUnits) {
      return res.status(400).json({ error: 'No hay suficientes unidades disponibles en esta talla y color.' });
    }

    // Crear una nueva asignación
    const assignment = new Assignment({
      employee: employeeId,
      order: orderId,
      reference: referenceId,
      color,
      size,
      unitsAssigned,
      startDate,
      endDate,
    });

    // Guardar la asignación en la base de datos
    await assignment.save();

    // Actualizar las unidades asignadas en la referencia de pedido
    reference.unitsAssigned += unitsAssigned;
    await order.save();

    // Verificar si el pedido está completo
    const isOrderComplete = order.processes[0].references.every((ref) => ref.isCompleted);
    if (isOrderComplete) {
      order.isCompleted = true;
      await order.save();
    }

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Error al asignar unidades.' });
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  assignUnitsToEmployee,
};
