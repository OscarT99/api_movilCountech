const Assignment = require("../models/Assignment");

// Obtener todas las asignaciones
async function getAllAssignments(req, res) {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las asignaciones.' });
  }
}

// Obtener una asignación por ID
async function getAssignmentById(req, res) {
  const { id } = req.params;
  try {
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).json({ error: 'Asignación no encontrada.' });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la asignación.' });
  }
}

// Crear una nueva asignación
async function createAssignment(req, res) {
  const { employee, order, reference, color, size, unitsAssigned, startDate, endDate } = req.body;
  try {
    const assignment = new Assignment({ employee, order, reference, color, size, unitsAssigned, startDate, endDate });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la asignación.' });
  }
}

// Actualizar una asignación por ID
async function updateAssignment(req, res) {
  const { id } = req.params;
  const { employee, order, reference, color, size, unitsAssigned, startDate, endDate } = req.body;
  try {
    const assignment = await Assignment.findByIdAndUpdate(id, { employee, order, reference, color, size, unitsAssigned, startDate, endDate }, { new: true });
    if (!assignment) {
      return res.status(404).json({ error: 'Asignación no encontrada.' });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la asignación.' });
  }
}

// Eliminar una asignación por ID
async function deleteAssignment(req, res) {
  const { id } = req.params;
  try {
    const assignment = await Assignment.findByIdAndDelete(id);
    if (!assignment) {
      return res.status(404).json({ error: 'Asignación no encontrada.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la asignación.' });
  }
}

module.exports = {
  getAllAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
