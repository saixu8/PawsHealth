const API_BASE_URL = 'http://localhost:5000/api/mascotas';

async function request(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.message || 'No fue posible procesar la solicitud.');
    }

    return payload;
  } catch (error) {
    // Cuando el backend esta apagado, fetch lanza TypeError y no trae JSON.
    if (error instanceof TypeError) {
      throw new Error('No se pudo conectar con el servidor. Verifica que el backend este encendido en el puerto 5000.');
    }

    throw error;
  }
}

export async function fetchPets() {
  return request(API_BASE_URL);
}

export async function createPet(petData) {
  return request(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(petData),
  });
}

export async function deletePet(id) {
  return request(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
}
