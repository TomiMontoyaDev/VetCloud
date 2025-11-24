function ModificarCita() {
  return (
    <div>
      <h2>Modificar Cita</h2>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <input
          name="mascota"
          type="text"
          placeholder="Nombre de la mascota"
          className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          name="dueno"
          type="text"
          placeholder="Nombre del dueño"
          className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <select
          name="servicio"
          className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Selecciona el servicio</option>
          <option value="consulta">Consulta Veterinaria</option>
          <option value="vacunacion">Vacunación</option>
          <option value="cirugia">Cirugía</option>
          <option value="esterilizacion">Esterilización</option>
        </select>
        <input
          name="veterinario"
          type="text"
          placeholder="Nombre del veterinario"
          className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          name="fecha"
          type="date"
          className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          name="hora"
          type="time"
          className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition duration-300 ease-in-out w-full">
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}
export default ModificarCita;
