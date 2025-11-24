import { useNavigate } from "react-router-dom";

function VeterinarioHome() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-center text-teal-600">
        Bienvenido al Panel de Veterinario 🐾
      </h1>

      <p className="text-lg text-gray-700 mb-4 text-center">
        Desde aquí puedes gestionar las citas, pacientes y más.
      </p>

      <button
        className="mt-6 w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300 "
        onClick={() => navigate("/gestorcitas")}
      >
        Ver Citas
      </button>

      <button className="mt-4 w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300">
        Historial de Pacientes
      </button>
    </div>
  );
}

export default VeterinarioHome;
