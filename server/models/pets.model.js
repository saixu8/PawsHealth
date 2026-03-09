/**
 * Modelo en memoria para Mascotas.
 *
 * Nota para el equipo: en esta primera entrega usamos un arreglo local
 * para poder demostrar el flujo completo sin depender de una base de datos.
 * El contrato del modelo ya queda listo para migrarlo a PostgreSQL/MySQL.
 */

const pets = [];
let nextId = 1;

function getAllPets() {
  return pets;
}

function getPetById(id) {
  return pets.find((pet) => pet.id === id);
}

function createPet(petData) {
  const newPet = {
    id: nextId++,
    name: petData.name,
    species: petData.species,
    breed: petData.breed,
    age: petData.age,
    sex: petData.sex,
    owner: petData.owner,
    createdAt: new Date().toISOString(),
  };

  pets.push(newPet);
  return newPet;
}

function updatePet(id, changes) {
  const petIndex = pets.findIndex((pet) => pet.id === id);

  if (petIndex === -1) {
    return null;
  }

  const updatedPet = {
    ...pets[petIndex],
    ...changes,
    id,
  };

  pets[petIndex] = updatedPet;
  return updatedPet;
}

function deletePet(id) {
  const petIndex = pets.findIndex((pet) => pet.id === id);

  if (petIndex === -1) {
    return false;
  }

  pets.splice(petIndex, 1);
  return true;
}

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};
