/**
 * Modelo en memoria para Usuarios.
 *
 * En esta entrega guardamos los usuarios en un arreglo local para
 * demostrar el flujo de registro e inicio de sesion sin base de datos.
 */

const users = [];
let nextId = 1;

function findUserByUsername(username) {
  return users.find((user) => user.username === username);
}

function createUser(userData) {
  const newUser = {
    id: nextId++,
    username: userData.username,
    password: userData.password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  return newUser;
}

module.exports = {
  findUserByUsername,
  createUser,
};
