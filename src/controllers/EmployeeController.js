const Employee = require("../models/employee");


// Obtener todos los usuarios
async function getAllEmployees(req, res) {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los empleados.' });
  }
}

// Obtener un usuario por ID
async function getEmployeeById(req, res) {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Empleado no encontrado.' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el empleado.' });
  }
}

// Crear un nuevo usuario
async function createEmployee(req, res) {
  const { cedula, nombre, correo, telefono, ciudad, direccion, fechaIngreso, estado} = req.body;
  try {
    const employee = new Employee({ cedula, nombre, correo, telefono, ciudad, direccion, fechaIngreso, estado });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el empleado.' });
  }
}

// Actualizar un usuario por ID
async function updateEmployee(req, res) {
  const { id } = req.params;
  const { cedula, nombre, correo, telefono, ciudad, direccion, fechaIngreso, estado  } = req.body;
  try {
    const employee = await User.findByIdAndUpdate(id, { cedula, nombre, correo, telefono, ciudad, direccion, fechaIngreso, estado }, { new: true });
    if (!employee) {
      return res.status(404).json({ error: 'Empleado no encontrado.' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el empleado.' });
  }
}

// Eliminar un usuario por ID
async function deleteEmployee(req, res) {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ error: 'Empleado no encontrado.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el empleado.' });
  }
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
