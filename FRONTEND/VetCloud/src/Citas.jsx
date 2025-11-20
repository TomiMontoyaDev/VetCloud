function Citas() {
  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md mt-6 mb-6 max-w-3xl mx-auto ">
      <h1 className="text-4xl font-bold mb-6 text-center text-teal-600">
        Citas Veterinarias
      </h1>
      <div className="mb-4 text-center">
        <p>Aquí puedes agendar una cita para tu mascota.</p>
      </div>
      <input
        type="text"
        placeholder="Nombre de la mascota"
        className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <select className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md">
        <option value="">Selecciona el servicio</option>
        <option value="consulta">Consulta Veterinaria</option>
        <option value="vacunacion">Vacunación</option>
        <option value="cirugia">Cirugía</option>
        <option value="esterilizacion">Esterilización</option>
      </select>
      <input
        type="date"
        placeholder="Fecha"
        className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="time"
        placeholder="Hora"
        className="mb-4 w-full px-3 py-2 border
      border-gray-300 rounded-md"
      />
      <button className="w-full bg-teal-600 text-white py-2 rounded-md font-semibold hover:bg-teal-700 transition">
        Agendar Cita
      </button>
    </div>
  );
}

export default Citas;
