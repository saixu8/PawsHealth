/**
 * Dashboard principal de PawsHealth
 *
 * Esta pantalla mezcla navegacion del sistema y modulo de mascotas
 * para que el usuario vea avance real desde el primer ingreso.
 */
import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { createPet, deletePet, fetchPets } from './services/petsApi';

const initialFormState = {
  name: '',
  species: '',
  breed: '',
  age: '',
  sex: '',
  owner: '',
};

const upcomingAppointments = [
  { id: 1, date: '10 Mar - 09:00', title: 'Control general', vet: 'Dra. Morales' },
  { id: 2, date: '12 Mar - 14:30', title: 'Refuerzo vacuna', vet: 'Dr. Salazar' },
  { id: 3, date: '15 Mar - 11:15', title: 'Revision dental', vet: 'Dra. Nunez' },
];

function getPetStatus(pet) {
  // Regla de demo para visualizacion inicial mientras conectamos historial clinico real.
  if (pet.age <= 8) {
    return { label: 'Al dia', tone: 'ok' };
  }

  return { label: 'Pendiente', tone: 'pending' };
}

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase())
    .join('');
}

function App() {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const featuredPetName = useMemo(() => {
    return pets[0]?.name || 'tu mascota';
  }, [pets]);

  useEffect(() => {
    loadPets();
  }, []);

  async function loadPets() {
    setLoading(true);
    setError('');

    try {
      const response = await fetchPets();
      setPets(response.data || []);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await createPet(form);
      setPets((current) => [...current, response.data]);
      setForm(initialFormState);
      setMessage('Mascota registrada correctamente.');
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleDeletePet(id, name) {
    const shouldDelete = window.confirm(`Seguro que quieres eliminar a ${name}?`);

    if (!shouldDelete) {
      return;
    }

    setError('');
    setMessage('');

    try {
      await deletePet(id);
      setPets((current) => current.filter((pet) => pet.id !== id));
      setMessage('Mascota eliminada correctamente.');
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark">PH</span>
          <div>
            <h1>PawsHealth</h1>
            <p>Sistema de Gestion Veterinaria</p>
          </div>
        </div>

        <nav className="main-menu" aria-label="Menu principal del sistema">
          <button type="button" className="menu-item active">Dashboard</button>
          <button type="button" className="menu-item">Mascotas</button>
          <button type="button" className="menu-item">Citas</button>
          <button type="button" className="menu-item">Historial Medico</button>
          <button type="button" className="menu-item">Perfil</button>
        </nav>
      </header>

      <section className="health-banner">
        <div>
          <p className="banner-label">Saludometro diario</p>
          <h2>
            Hola, (nombre del usuario). Hoy es un gran dia para cuidar a <strong>{featuredPetName}</strong>.
          </h2>
          <button type="button" className="btn-primary">Agendar Cita</button>
        </div>

        <div className="pet-illustration" aria-hidden="true">
          <div className="pet-shape dog" />
          <div className="pet-shape cat" />
        </div>
      </section>

      <main className="dashboard-layout">
        <section className="main-column">
          <div className="section-head">
            <h3>Mis Mascotas</h3>
            <button type="button" onClick={loadPets} disabled={loading}>
              {loading ? 'Actualizando...' : 'Actualizar'}
            </button>
          </div>

          {message && <p className="status success">{message}</p>}
          {error && <p className="status error">{error}</p>}

          <div className="cards-grid">
            {pets.length === 0 ? (
              <article className="pet-card empty-state">
                <h4>Aun no tienes mascotas registradas</h4>
                <p>Completa el formulario para empezar el seguimiento clinico.</p>
              </article>
            ) : (
              pets.map((pet) => {
                const status = getPetStatus(pet);

                return (
                  <article key={pet.id} className="pet-card">
                    <div className="pet-card-top">
                      <div className="pet-avatar">{getInitials(pet.name)}</div>
                      <span className={`status-badge ${status.tone}`}>{status.label}</span>
                    </div>

                    <h4>{pet.name}</h4>
                    <p>{pet.species} - {pet.breed}</p>
                    <p>Edad: {pet.age} | Sexo: {pet.sex}</p>
                    <p>Propietario: {pet.owner}</p>

                    <button type="button" className="btn-ghost" onClick={() => handleDeletePet(pet.id, pet.name)}>
                      Eliminar
                    </button>
                  </article>
                );
              })
            )}
          </div>

          <section className="quick-form card-box">
            <h3>Registro Rapido de Mascota</h3>
            <form onSubmit={handleSubmit} className="form-grid">
              <label>
                Nombre
                <input name="name" value={form.name} onChange={handleInputChange} />
              </label>

              <label>
                Especie
                <input name="species" value={form.species} onChange={handleInputChange} />
              </label>

              <label>
                Raza
                <input name="breed" value={form.breed} onChange={handleInputChange} />
              </label>

              <label>
                Edad
                <input name="age" type="number" min="0" value={form.age} onChange={handleInputChange} />
              </label>

              <label>
                Sexo
                <select name="sex" value={form.sex} onChange={handleInputChange}>
                  <option value="">Seleccione...</option>
                  <option value="Hembra">Hembra</option>
                  <option value="Macho">Macho</option>
                </select>
              </label>

              <label>
                Propietario
                <input name="owner" value={form.owner} onChange={handleInputChange} />
              </label>

              <button type="submit" className="btn-primary">Guardar Mascota</button>
            </form>
          </section>
        </section>

        <aside className="timeline-column card-box">
          <h3>Proximas Citas</h3>
          <ul className="timeline">
            {upcomingAppointments.map((appointment) => (
              <li key={appointment.id} className="timeline-item">
                <span className="timeline-dot" />
                <div>
                  <strong>{appointment.date}</strong>
                  <p>{appointment.title}</p>
                  <small>{appointment.vet}</small>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
}

export default App;

