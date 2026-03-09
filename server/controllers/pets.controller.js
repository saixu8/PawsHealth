/**
 * Controlador del modulo Mascotas.
 *
 * Aqui concentramos la logica de negocio y validaciones minimas.
 * La idea es que las rutas solo deleguen y mantengan el codigo ordenado.
 */

const petModel = require('../models/pets.model');

const fieldLabels = {
  name: 'nombre',
  species: 'especie',
  breed: 'raza',
  age: 'edad',
  sex: 'sexo',
  owner: 'propietario',
};

function validatePetPayload(payload) {
  const requiredFields = ['name', 'species', 'breed', 'age', 'sex', 'owner'];
  const missing = requiredFields.filter((field) => payload[field] === undefined || payload[field] === '');

  if (missing.length > 0) {
    const missingLabels = missing.map((field) => fieldLabels[field] || field);

    return {
      isValid: false,
      message: `Faltan campos obligatorios: ${missingLabels.join(', ')}`,
    };
  }

  const parsedAge = Number(payload.age);
  if (!Number.isInteger(parsedAge) || parsedAge < 0) {
    return {
      isValid: false,
      message: 'La edad debe ser un numero entero mayor o igual a 0.',
    };
  }

  return {
    isValid: true,
    normalized: {
      ...payload,
      age: parsedAge,
    },
  };
}

function listPets(req, res) {
  const pets = petModel.getAllPets();

  return res.status(200).json({
    message: 'Mascotas obtenidas correctamente.',
    data: pets,
  });
}

function getPet(req, res) {
  const petId = Number(req.params.id);
  const pet = petModel.getPetById(petId);

  if (!pet) {
    return res.status(404).json({ message: 'Mascota no encontrada.' });
  }

  return res.status(200).json({
    message: 'Mascota encontrada.',
    data: pet,
  });
}

function createPet(req, res) {
  const validation = validatePetPayload(req.body);

  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }

  const newPet = petModel.createPet(validation.normalized);

  return res.status(201).json({
    message: 'Mascota registrada correctamente.',
    data: newPet,
  });
}

function updatePet(req, res) {
  const petId = Number(req.params.id);
  const currentPet = petModel.getPetById(petId);

  if (!currentPet) {
    return res.status(404).json({ message: 'Mascota no encontrada.' });
  }

  const mergedPayload = {
    ...currentPet,
    ...req.body,
  };

  const validation = validatePetPayload(mergedPayload);

  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }

  const updatedPet = petModel.updatePet(petId, validation.normalized);

  return res.status(200).json({
    message: 'Mascota actualizada correctamente.',
    data: updatedPet,
  });
}

function deletePet(req, res) {
  const petId = Number(req.params.id);
  const wasDeleted = petModel.deletePet(petId);

  if (!wasDeleted) {
    return res.status(404).json({ message: 'Mascota no encontrada.' });
  }

  return res.status(200).json({
    message: 'Mascota eliminada correctamente.',
  });
}

module.exports = {
  listPets,
  getPet,
  createPet,
  updatePet,
  deletePet,
};
