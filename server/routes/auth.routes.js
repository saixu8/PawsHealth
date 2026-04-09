/**
 * Rutas del modulo de autenticacion.
 *
 * Convencion usada:
 * - POST /api/auth/register -> registrar usuario
 * - POST /api/auth/login    -> iniciar sesion
 */

const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
