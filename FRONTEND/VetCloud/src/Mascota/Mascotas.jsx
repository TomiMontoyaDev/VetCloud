import { useEffect, useState } from "react";

export default function Mascotas() {
  const [mascotas, setMascotas] = useState([]);

  // cargar mascotas
  const cargar = async () => {
    const res = await fetch("http://localhost:8080/mascotas");
    const data = await res.json();
    setMascotas(data);
  };

  const eliminar = async (id) => {
    await fetch(`http://localhost:8080/mascotas/${id}`, { method: "DELETE" });
    cargar();
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="p-8 text-center bg-white rounded-lg shadow-md mt-8 mx-4 md:mx-16">
      <h1 className="text-4xl font-bold mb-4 text-teal-600">
        Mascotas Registradas
      </h1>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-teal-100">ID</th>
            <th className="py-2 px-4 bg-teal-100">Nombre</th>
            <th className="py-2 px-4 bg-teal-100">Especie</th>
            <th className="py-2 px-4 bg-teal-100">Dueño</th>
            <th className="py-2 px-4 bg-teal-100">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((m) => (
            <tr key={m.id}>
              <td className="py-2 px-4 border">{m.id}</td>
              <td className="py-2 px-4 border">{m.nombre}</td>
              <td className="py-2 px-4 border">{m.especie}</td>
              <td className="py-2 px-4 border">{m.dueno}</td>
              <td className="py-2 px-4 border flex justify-center gap-2">
                {/* Ver */}
                <a
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                  href={`/mascotas/${m.id}`}
                >
                  Ver
                </a>

                {/* Editar */}
                <a
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                  href={`/mascotas/editar/${m.id}`}
                >
                  Editar
                </a>

                {/* Eliminar */}
                <button
                  onClick={() => eliminar(m.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-6 bg-teal-600 text-white px-4 py-2 rounded-lg"
        onClick={() => (window.location.href = "/clientehome")}
      >
        Volver
      </button>
    </div>
  );
}
