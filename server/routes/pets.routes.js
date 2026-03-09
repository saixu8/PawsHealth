/**
 * Rutas del modulo Mascotas.
 *
 * Convencion usada:
 * - GET /api/mascotas        -> listar mascotas
 * - GET /api/mascotas/:id    -> obtener detalle
 * - POST /api/mascotas       -> crear mascota
 * - PUT /api/mascotas/:id    -> actualizar mascota
 * - DELETE /api/mascotas/:id -> eliminar mascota
 */

const express = require('express');
const petsController = require('../controllers/pets.controller');

const router = express.Router();

router.get('/', petsController.listPets);
router.get('/:id', petsController.getPet);
router.post('/', petsController.createPet);
router.put('/:id', petsController.updatePet);
router.delete('/:id', petsController.deletePet);

module.exports = router;
