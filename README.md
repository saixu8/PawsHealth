# PawsHealth

Sistema web de gestion veterinaria construido con **React (frontend)** y **Node.js + Express (backend)**.

## Modulo implementado (entrega actual)

Se implemento el modulo **Gestion de Mascotas** con CRUD basico:

- Registrar mascota
- Listar mascotas
- Consultar mascota por ID
- Actualizar mascota
- Eliminar mascota

## Frameworks usados

- Frontend: React + Vite
- Backend: Express

## Estructura del modulo

```text
server/
  index/index.js
  routes/pets.routes.js
  controllers/pets.controller.js
  models/pets.model.js

client/
  src/App.jsx
  src/services/petsApi.js
```

## Endpoints del backend

- `GET /api/mascotas`
- `GET /api/mascotas/:id`
- `POST /api/mascotas`
- `PUT /api/mascotas/:id`
- `DELETE /api/mascotas/:id`

## Estandares aplicados

- Separacion de responsabilidades por capas (`routes`, `controllers`, `models`).
- Nombres de funciones y archivos consistentes por modulo.
- Validaciones de campos obligatorios y tipos de datos en controlador.
- Respuestas HTTP coherentes (200, 201, 400, 404).
- Comentarios en codigo con lenguaje humano para facilitar mantenimiento.

## Trazabilidad con artefactos del ciclo de software

Este modulo se alinea con artefactos previos del proyecto:

- Caso de uso: Gestionar mascotas
- Historias de usuario: registrar, consultar y eliminar mascotas
- Diseno/prototipo: vista de formulario + listado de mascotas
- Plan de trabajo: construccion incremental por modulos

## Versionamiento (Git)

El proyecto esta listo para versionarse. Flujo recomendado:

```bash
git init
git add .
git commit -m "feat: modulo gestion de mascotas (frontend + backend)"
```

## Ejecucion local

### 1. Backend

```bash
cd server
npm install
npm start
```

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

## Evidencia tecnica validada

- Frontend compilado correctamente con `npm run build`.
- Backend probado con peticiones reales a `/api/mascotas` (POST y GET).
