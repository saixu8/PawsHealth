const API_BASE_URL = '/api/mascotas';

async function request(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const contentType = response.headers.get('content-type') || '';
    let payload = null;

    // Intentamos leer JSON solo cuando el servidor realmente lo envia.
    if (contentType.includes('application/json')) {
      payload = await response.json();
    } else {
      const rawBody = await response.text();

      if (!response.ok) {
        throw new Error(rawBody || 'El servidor devolvio una respuesta no valida.');
      }
    }

    if (!response.ok) {
      throw new Error(payload?.message || 'No fue posible procesar la solicitud.');
    }

    return payload;
  } catch (error) {
    if (error instanceof TypeError || error instanceof SyntaxError) {
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
