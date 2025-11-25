import { useNavigate } from "react-router-dom";

function ClienteHome() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-center text-teal-600">
        Bienvenido a tu Panel de Cliente 🐾{" "}
      </h1>
      <p className="text-lg text-gray-700 mb-4 text-center">
        Aquí puedes agendar citas y comunicarte con nuestros veterinarios
        expertos.
      </p>
      <ul className="list-disc list-inside text-gray-700 text text-center">
        <li>Agendar, modificar o cancelar citas veterinarias.</li>

        <li>
          Ver Servicios disponibles y sus detalles para el cuidado de tus
          mascotas.
        </li>
      </ul>
      <div className="flex justify-center mt-6">
        <button
          className="mt-6 ml-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition "
          onClick={() => navigate("/citas")}
        >
          Agendar Cita
        </button>

        <button
          className="mt-6 ml-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          onClick={() => navigate("/gestorcitas")}
        >
          Ver Citas
        </button>

        <button
          className="mt-6 ml-4 bg-teal-600 text-white px-4 py-2 rounded-lg
        hover:bg-teal-700 transition"
          onClick={() => navigate("/servicios")}
        >
          Ver Servicios
        </button>
        <button
          className="px-3 py-1 bg-purple-600 text-white rounded"
          onClick={async () => {
            const res = await fetch(
              "https://vetcloud-backend.onrender.com/mascotas/recomendacion",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  nombre: m.nombre,
                  dueno: m.dueno,
                  especie: m.especie,
                }),
              }
            );

            const recomendacion = await res.text();
            alert(recomendacion);
          }}
        >
          Ver Recomendación
        </button>
      </div>
    </div>
  );
}

export default ClienteHome;
