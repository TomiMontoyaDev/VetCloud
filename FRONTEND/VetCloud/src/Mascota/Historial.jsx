import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalAgregarHistorial from "./ModalHistorial.jsx";

function Historial() {
  const [historial, setHistorial] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [historialSeleccionado, setHistorialSeleccionado] = useState(null);

  const navigate = useNavigate();

  // Cargar historial desde backend
  const cargarHistorial = async () => {
    try {
      const res = await fetch("http://localhost:8080/historial");
      const data = await res.json();
      setHistorial(data);
    } catch (err) {
      console.error("Error cargando historial:", err);
    }
  };

  useEffect(() => {
    cargarHistorial();
  }, []);

  // Preparar para eliminar
  const confirmarEliminar = (registro) => {
    setHistorialSeleccionado(registro);
    setShowEliminarModal(true);
  };

  // Eliminar historial
  const eliminarHistorial = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/eliminar/historial/${historialSeleccionado.id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("No se pudo eliminar");

      setHistorial(historial.filter((x) => x.id !== historialSeleccionado.id));
      setShowEliminarModal(false);
      setHistorialSeleccionado(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Actualizar datos clínicos
  const actualizarRegistro = async (datosClinicos) => {
    if (!historialSeleccionado) return;

    try {
      const res = await fetch(
        `http://localhost:8080/historial/actualizar/${historialSeleccionado.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datosClinicos),
        }
      );

      if (res.ok) {
        // Actualizar en el estado local
        setHistorial((prev) =>
          prev.map((h) =>
            h.id === historialSeleccionado.id ? { ...h, ...datosClinicos } : h
          )
        );
        setShowModal(false);
        setHistorialSeleccionado(null);
      } else {
        console.error("No se pudo actualizar el historial");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 text-center bg-white rounded-lg shadow-md mt-8 mx-4 md:mx-16">
      <h1 className="text-4xl font-bold mb-4 text-teal-600">
        Historial Médico
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        Aquí puedes ver y registrar el historial médico de las mascotas.
      </p>

      {/* TABLA */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-teal-100">Fecha</th>
              <th className="py-2 px-4 bg-teal-100">Hora</th>
              <th className="py-2 px-4 bg-teal-100">Mascota</th>
              <th className="py-2 px-4 bg-teal-100">Servicio</th>
              <th className="py-2 px-4 bg-teal-100">Veterinario</th>
              <th className="py-2 px-4 bg-teal-100">Peso</th>
              <th className="py-2 px-4 bg-teal-100">Vacunas</th>
              <th className="py-2 px-4 bg-teal-100">Tratamientos</th>
              <th className="py-2 px-4 bg-teal-100">Observaciones</th>
              <th className="py-2 px-4 bg-teal-100">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {historial.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="py-4 text-gray-500 text-center border"
                >
                  No hay registros aún.
                </td>
              </tr>
            ) : (
              historial.map((h) => (
                <tr key={h.id} className="border-b">
                  <td className="py-2 px-4">{h.fecha}</td>
                  <td className="py-2 px-4">{h.hora}</td>
                  <td className="py-2 px-4">{h.mascota}</td>
                  <td className="py-2 px-4">{h.servicio}</td>
                  <td className="py-2 px-4">{h.veterinario}</td>
                  <td className="py-2 px-4">{h.peso}</td>
                  <td className="py-2 px-4">{h.vacunas}</td>
                  <td className="py-2 px-4">{h.tratamientos}</td>
                  <td className="py-2 px-4">{h.observaciones}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => {
                        setHistorialSeleccionado(h);
                        setShowModal(true);
                      }}
                      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    >
                      Modificar
                    </button>

                    <button
                      onClick={() => confirmarEliminar(h)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* BOTÓN VOLVER */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>

      {/* MODAL AGREGAR / MODIFICAR */}
      {showModal && (
        <ModalAgregarHistorial
          mostrar={showModal}
          cerrar={() => setShowModal(false)}
          historial={historialSeleccionado || {}}
          actualizar={actualizarRegistro}
        />
      )}

      {/* MODAL ELIMINAR */}
      {showEliminarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-11/12 md:w-1/3 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4 text-red-600">
              Confirmar Eliminación
            </h2>
            <p className="mb-4">
              ¿Estás seguro de que deseas eliminar el registro de{" "}
              <strong>{historialSeleccionado.mascota}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowEliminarModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={eliminarHistorial}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Historial;
