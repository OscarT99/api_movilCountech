const User = require('../models/User');

// Obtener todos los usuarios
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
}

// Obtener un usuario por ID
async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario.' });
  }
}

// Crear un nuevo usuario
async function createUser(req, res) {
  const { nombre, correo, contrasena, rol } = req.body;
  try {
    const user = new User({ nombre, correo, contrasena, rol });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el usuario.' });
  }
}

// Actualizar un usuario por ID
async function updateUser(req, res) {
  const { id } = req.params;
  const { nombre, correo, contrasena, estado } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { nombre, correo, contrasena, estado }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario.' });
  }
}

// Eliminar un usuario por ID
async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario.' });
  }
}

async function loginUser(req, res) {
  const { correo, contrasena } = req.body;
  try {
    // Buscar al usuario por su correo
    const user = await User.findOne({ correo });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas.'});
    }

    // Verificar la contraseña proporcionada sin cifrar con la contraseña almacenada
    if (user.contrasena !== contrasena) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    res.json({ message: 'Inicio de sesión exitoso.',  rol: user.rol });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
