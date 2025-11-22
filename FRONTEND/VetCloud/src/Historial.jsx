import { useNavigate } from "react-router-dom";

function Historial() {
  const navigate = useNavigate();

  return (
    <div className="p-8 text-center bg-white rounded-lg shadow-md mt-8 mx-4 md:mx-16">
      <h1 className=" text-4xl font-bold mb-4 text-teal-600">
        Historial Medico
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        Aqui puedes ver el historial medico de tu mascota
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-teal-100 text-center">
                Fecha
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-teal-100 text-center">
                Servicio
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-teal-100 text-center">
                Veterinario
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-teal-100 text-center">
                Nombre de la mascota
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-teal-100 text-center">
                Peso
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-teal-100 text-center">
                Observaciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-gray-200">2024-05-10</td>
              <td className="py-2 px-4 border-b border-gray-200">
                Consulta General
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                Dr. Juan Perez
              </td>
              <td className="py-2 px-4 border-b border-gray-200">Firulais</td>
              <td className="py-2 px-4 border-b border-gray-200">12 kg</td>
              <td className="py-2 px-4 border-b border-gray-200">
                Vacunación al día, mascota saludable.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        className="mt-6 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
        onClick={() => navigate(-1)}
      >
        Volver
      </button>
    </div>
  );
}

export default Historial;
