import { useEffect, useState } from "react";

function GestorCitas() {
  const [historial, setHistorial] = useState([]);
  const [rol, setRol] = useState("CLIENTE"); // valor por defecto

  // Traer rol del usuario logueado
  useEffect(() => {
    fetch("http://localhost:8080/usuarioActual")
      .then((res) => res.json())
      .then((data) => setRol(data.rol))
      .catch((err) => console.error("Error obteniendo usuario:", err));
  }, []);

  const isVeterinario = rol === "VETERINARIO";
  const isCliente = rol === "CLIENTE";

  // Cargar historial de citas
  useEffect(() => {
    fetch("http://localhost:8080/historial")
      .then((res) => res.json())
      .then((data) => setHistorial(data))
      .catch((err) => console.error("Error cargando historial:", err));
  }, []);

  // Cambiar estado de una cita
  const cambiarEstado = (id, nuevoEstado) => {
    fetch("http://localhost:8080/estado", {
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

  // Eliminar una cita
  const eliminarCita = (h) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta cita?")) return;

    fetch(`http://localhost:8080/eliminar/${String(h.id)}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo eliminar");
        setHistorial(historial.filter((x) => x.id !== h.id));
        alert("Cita eliminada exitosamente");
      })
      .catch((err) => console.error("Error:", err));
  };

  // Modificar una cita
  const modificarCita = async (id, nuevosDatos) => {
    try {
      const res = await fetch(`http://localhost:8080/modificar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevosDatos),
      });

      const data = await res.text();

      if (res.status === 409) {
        alert("⚠️ Esta fecha y hora ya están ocupadas.");
      } else if (res.ok) {
        setHistorial((prev) =>
          prev.map((h) => (h.id === id ? { ...h, ...nuevosDatos } : h))
        );
        alert("✅ Cita modificada correctamente");
      } else {
        alert("Error al modificar: " + data);
      }
    } catch (err) {
      alert("No se pudo conectar con el servidor.");
    }
  };

  // Renderizado del componente GestorCitas
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
                {/* Botones para Cliente */}
                {isCliente && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => {
                        const nuevosDatos = {
                          fecha: prompt("Nueva fecha:", h.fecha),
                          hora: prompt("Nueva hora:", h.hora),
                          mascota: prompt(
                            "Nuevo nombre de la mascota:",
                            h.mascota
                          ),
                          servicio: prompt("Nuevo servicio:", h.servicio),
                          veterinario: prompt(
                            "Nuevo veterinario:",
                            h.veterinario
                          ),
                        };
                        if (
                          !nuevosDatos.fecha ||
                          !nuevosDatos.hora ||
                          !nuevosDatos.mascota ||
                          !nuevosDatos.servicio

                        ) {
                          alert(
                            "⚠️ Todos los campos obligatorios deben estar completos."
                          );
                          return;
                        }
                        modificarCita(h.id, nuevosDatos);
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                    >
                      Modificar
                    </button>
                    <button
                      onClick={eliminarCita.bind(null, h)}
                      className="bg-red-600 text-white px-2 py-1 rounded-lg"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
                {/* Botones para Veterinario */}
                {isVeterinario && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => {
                        const nuevosDatos = {
                          fecha: prompt("Nueva fecha:", h.fecha),
                          hora: prompt("Nueva hora:", h.hora),
                          mascota: prompt(
                            "Nuevo nombre de la mascota:",
                            h.mascota
                          ),
                          servicio: prompt("Nuevo servicio:", h.servicio),
                          veterinario: prompt(
                            "Nuevo veterinario:",
                            h.veterinario
                          ),
                        };
                        if (
                          !nuevosDatos.fecha ||
                          !nuevosDatos.hora ||
                          !nuevosDatos.mascota ||
                          !nuevosDatos.servicio
                        ) {
                          alert(
                            "⚠️ Todos los campos obligatorios deben estar completos."
                          );
                          return;
                        }
                        modificarCita(h.id, nuevosDatos);
                      }}
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
    </div>
  );
}

export default GestorCitas;
