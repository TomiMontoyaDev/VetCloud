import { useEffect, useState } from "react";

function GestorCitas() {
  const [historial, setHistorial] = useState([]);
  const [rol, setRol] = useState("CLIENTE");

  // Estados para modales
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showCancelarModal, setShowCancelarModal] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  const [formCita, setFormCita] = useState({
    fecha: "",
    hora: "",
    mascota: "",
    servicio: "",
    veterinario: "",
  });

  // Traer rol del usuario
  useEffect(() => {
    fetch("https://vetcloud-backend.onrender.com/usuarioActual")
      .then((res) => res.json())
      .then((data) => setRol(data.rol))
      .catch((err) => console.error("Error obteniendo usuario:", err));
  }, []);

  const isVeterinario = rol === "VETERINARIO";
  const isCliente = rol === "CLIENTE";

  // Cargar historial
  useEffect(() => {
    fetch("https://vetcloud-backend.onrender.com/historial")
      .then((res) => res.json())
      .then((data) => setHistorial(data))
      .catch((err) => console.error("Error cargando historial:", err));
  }, []);

  // Abrir modal de edición
  const abrirModalEdicion = (cita) => {
    setCitaSeleccionada(cita);
    setFormCita({
      fecha: cita.fecha,
      hora: cita.hora,
      mascota: cita.mascota,
      servicio: cita.servicio,
      veterinario: cita.veterinario,
    });
    setShowEditarModal(true);
  };

  // Abrir modal de cancelación
  const abrirModalCancelar = (cita) => {
    setCitaSeleccionada(cita);
    setShowCancelarModal(true);
  };

  // Modificar cita (PUT)
  const modificarCita = async (id, nuevosDatos) => {
    try {
      const res = await fetch(
        `https://vetcloud-backend.onrender.com/modificar/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevosDatos),
        }
      );

      const data = await res.text();

      if (res.status === 409) {
        alert("⚠️ Esta fecha y hora ya están ocupadas.");
      } else if (res.ok) {
        setHistorial((prev) =>
          prev.map((h) => (h.id === id ? { ...h, ...nuevosDatos } : h))
        );
      } else {
        alert("Error al modificar: " + data);
      }
    } catch (err) {
      alert("No se pudo conectar con el servidor.");
    }
  };

  // Eliminar cita (DELETE)
  const eliminarCita = () => {
    fetch(
      `https://vetcloud-backend.onrender.com/eliminar/${String(
        citaSeleccionada.id
      )}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo eliminar");
        setHistorial(historial.filter((x) => x.id !== citaSeleccionada.id));
        setShowCancelarModal(false);
      })
      .catch((err) => console.error("Error:", err));
  };

  // Cambiar estado (para veterinario)
  const cambiarEstado = (id, nuevoEstado) => {
    fetch("https://vetcloud-backend.onrender.com/estado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, estado: nuevoEstado }),
    })
      .then((res) => res.text())
      .then(() => {
        setHistorial((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, estado: nuevoEstado } : item
          )
        );
      });
  };

  return (
    <div className="p-8 text-center bg-white rounded-lg shadow-md mt-8 mx-4 md:mx-16">
      <h1 className="text-3xl font-bold text-center mt-8 mb-4 text-teal-600">
        Gestor de Citas
      </h1>

      <div className="max-w-3xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-teal-600">
          Lista de Citas
        </h2>

        <ul className="list-disc list-inside text-left text-gray-700">
          {historial.length > 0 ? (
            historial.map((h) => (
              <li key={h.id} className="mb-4">
                Mascota: {h.mascota} / Servicio: {h.servicio} / Fecha: {h.fecha}{" "}
                / Hora: {h.hora} / Veterinario: {h.veterinario} / Dueño:{" "}
                {h.dueno}
                <br />
                <span className="font-bold">Estado: {h.estado}</span>
                <br />
                {/* Botones Cliente */}
                {isCliente && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => abrirModalEdicion(h)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                    >
                      Modificar
                    </button>

                    <button
                      onClick={() => abrirModalCancelar(h)}
                      className="bg-red-600 text-white px-2 py-1 rounded-lg"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
                {/* Botones Veterinario */}
                {isVeterinario && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => abrirModalEdicion(h)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                    >
                      Modificar
                    </button>

                    <button
                      onClick={() => cambiarEstado(h.id, "Cancelada")}
                      className="bg-red-600 text-white px-2 py-1 rounded-lg"
                    >
                      Cancelar
                    </button>

                    <button
                      onClick={() => cambiarEstado(h.id, "Confirmada")}
                      className="bg-green-500 text-white px-2 py-1 rounded-lg"
                    >
                      Confirmar
                    </button>

                    <button
                      onClick={() => cambiarEstado(h.id, "En Seguimiento")}
                      className="bg-blue-500 text-white px-2 py-1 rounded-lg"
                    >
                      Seguimiento
                    </button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No hay citas aún</li>
          )}
        </ul>
      </div>

      <button
        className="bg-teal-600 text-white px-4 py-2 rounded-lg mt-4"
        onClick={() => window.history.back()}
      >
        Volver
      </button>

      {/* MODAL EDITAR CITA */}
      {showEditarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-teal-600">
              Modificar Cita
            </h2>

            <label>Fecha:</label>
            <input
              type="date"
              className="w-full border p-2 rounded mb-3"
              value={formCita.fecha}
              onChange={(e) =>
                setFormCita({ ...formCita, fecha: e.target.value })
              }
            />

            <label>Hora:</label>
            <input
              type="time"
              className="w-full border p-2 rounded mb-3"
              value={formCita.hora}
              onChange={(e) =>
                setFormCita({ ...formCita, hora: e.target.value })
              }
            />

            <label>Mascota:</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-3"
              value={formCita.mascota}
              onChange={(e) =>
                setFormCita({ ...formCita, mascota: e.target.value })
              }
            />

            <label>Servicio:</label>
            <select
              className="w-full border p-2 rounded mb-3"
              value={formCita.servicio}
              onChange={(e) =>
                setFormCita({ ...formCita, servicio: e.target.value })
              }
            >
              <option>Consulta</option>
              <option>Vacunación</option>
              <option>Cirugías o Urgencias</option>
              <option>Esterilización</option>
            </select>

            <label>Veterinario:</label>
            <select
              className="w-full border p-2 rounded mb-3"
              value={formCita.veterinario}
              onChange={(e) =>
                setFormCita({ ...formCita, veterinario: e.target.value })
              }
            >
              <option>Dr. Juan Perez</option>
              <option>Dra. Maria Gomez</option>
              <option>Dr. Carlos Lopez</option>
              <option>Dra. Ana Martinez</option>
            </select>

            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-500 px-3 py-1 rounded text-white"
                onClick={() => setShowEditarModal(false)}
              >
                Cancelar
              </button>

              <button
                className="bg-teal-600 px-3 py-1 rounded text-white"
                onClick={() => {
                  modificarCita(citaSeleccionada.id, formCita);
                  setShowEditarModal(false);
                }}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CONFIRMAR CANCELACIÓN */}
      {showCancelarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              ¿Seguro que deseas cancelar esta cita?
            </h2>

            <p className="mb-4">
              Mascota: <b>{citaSeleccionada.mascota}</b> <br />
              Fecha: <b>{citaSeleccionada.fecha}</b> <br />
              Hora: <b>{citaSeleccionada.hora}</b>
            </p>

            <div className="flex justify-between">
              <button
                className="bg-gray-500 px-3 py-1 rounded text-white"
                onClick={() => setShowCancelarModal(false)}
              >
                No, volver
              </button>

              <button
                className="bg-red-600 px-3 py-1 rounded text-white"
                onClick={eliminarCita}
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestorCitas;
