import { useNavigate } from "react-router-dom";

function VeterinarioHome() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-center text-teal-600">
        Bienvenido al Panel de Veterinario 🐾
      </h1>

      <p className="text-lg text-gray-700 mb-4 text-center">
        Desde aquí puedes:
      </p>
      <ul className="list-disc list-inside text-gray-700 text text-center">
        <li>Gestionar el historial médico de las mascotas.</li>
        <li>Ver y administrar las citas programadas.</li>
        <li>Agregar nuevas mascotas al sistema.</li>
      </ul>

      <div className="flex justify-center mt-6">
        <button
          className="mt-6 ml-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          onClick={() => navigate("/crearmascota")}
        >
          Crear Mascota
        </button>
        <button
          className="mt-6 ml-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          onClick={() => navigate("/vermascotas")}
        >
          Ver Mascotas
        </button>
        <button
          className="mt-6 ml-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          onClick={() => navigate("/gestorcitas")}
        >
          Ver Citas
        </button>

        <button
          className="mt-6 ml-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          onClick={() => navigate("/historial")}
        >
          Historial de Pacientes
        </button>
      </div>
    </div>
  );
}

export default VeterinarioHome;
