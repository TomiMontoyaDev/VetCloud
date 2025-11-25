import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ClienteHome() {
  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [recomendacion, setRecomendacion] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Obtener mascotas desde el backend
  useEffect(() => {
    fetch("https://vetcloud-backend.onrender.com/mascotas")
      .then((res) => res.json())
      .then((data) => setMascotas(data));
  }, []);

  const handleVerRecomendacion = async () => {
    if (!mascotaSeleccionada) return;

    const res = await fetch(
      "https://vetcloud-backend.onrender.com/mascotas/recomendacion",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mascotaSeleccionada),
      }
    );

    const text = await res.text();
    setRecomendacion(text);
    setShowModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-center text-teal-600">
        Bienvenido a tu Panel de Cliente 🐾
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

      <div className="flex justify-center mt-6 gap-4">
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          onClick={() => navigate("/citas")}
        >
          Agendar Cita
        </button>

        <button
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          onClick={() => navigate("/gestorcitas")}
        >
          Ver Citas
        </button>

        <button
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          onClick={() => navigate("/servicios")}
        >
          Ver Servicios
        </button>

        {/* Selector de mascota */}
        <select
          className="border rounded p-2"
          onChange={(e) =>
            setMascotaSeleccionada(
              mascotas.find((m) => m.id === parseInt(e.target.value))
            )
          }
        >
          <option value="">Selecciona una mascota</option>
          {mascotas.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nombre} ({m.especie})
            </option>
          ))}
        </select>

        <button
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          onClick={handleVerRecomendacion}
        >
          Ver Recomendación
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Recomendación</h2>
            <p className="whitespace-pre-line">{recomendacion}</p>
            <button
              className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClienteHome;
