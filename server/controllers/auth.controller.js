/**
 * Controlador del modulo de autenticacion.
 *
 * Aqui centralizamos las validaciones de registro e inicio de sesion
 * para mantener las rutas limpias y faciles de entender.
 */

const userModel = require('../models/users.model');

function validateAuthPayload(payload) {
  const safePayload = payload || {};
  const username = safePayload.username?.trim();
  const password = safePayload.password?.trim();

  if (!username || !password) {
    return {
      isValid: false,
      message: 'El usuario y la contrasena son obligatorios.',
    };
  }

  return {
    isValid: true,
    normalized: {
      username,
      password,
    },
  };
}

function register(req, res) {
  const validation = validateAuthPayload(req.body);

  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }

  const existingUser = userModel.findUserByUsername(validation.normalized.username);

  if (existingUser) {
    return res.status(409).json({
      message: 'El usuario ya se encuentra registrado.',
    });
  }

  const newUser = userModel.createUser(validation.normalized);

  return res.status(201).json({
    message: 'Usuario registrado correctamente.',
    data: {
      id: newUser.id,
      username: newUser.username,
      createdAt: newUser.createdAt,
    },
  });
}

function login(req, res) {
  const validation = validateAuthPayload(req.body);

  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }

  const user = userModel.findUserByUsername(validation.normalized.username);

  if (!user || user.password !== validation.normalized.password) {
    return res.status(401).json({
      message: 'Error en la autenticacion.',
    });
  }

  return res.status(200).json({
    message: 'Autenticacion satisfactoria.',
    data: {
      id: user.id,
      username: user.username,
    },
  });
}

module.exports = {
  register,
  login,
};
