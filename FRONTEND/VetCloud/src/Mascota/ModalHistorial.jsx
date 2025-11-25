import { useState, useEffect } from "react";

export default function ModalAgregarHistorial({
  mostrar,
  cerrar,
  historial,
  actualizar,
}) {
  const [form, setForm] = useState({
    peso: "",
    vacunas: "",
    tratamientos: "",
    observaciones: "",
  });

  // Actualizar form cuando cambia el historial seleccionado
  useEffect(() => {
    if (historial) {
      setForm({
        peso: historial.peso || "",
        vacunas: historial.vacunas || "",
        tratamientos: historial.tratamientos || "",
        observaciones: historial.observaciones || "",
      });
    }
  }, [historial]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviar = async () => {
    await actualizar(form);
    cerrar();
  };

  if (!mostrar) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-teal-600">
          Modificar Datos Clínicos
        </h2>

        <label>Peso:</label>
        <input
          type="text"
          name="peso"
          value={form.peso}
          onChange={handleChange}
          className="border w-full p-2 mb-2"
        />

        <label>Vacunas:</label>
        <input
          type="text"
          name="vacunas"
          value={form.vacunas}
          onChange={handleChange}
          className="border w-full p-2 mb-2"
        />

        <label>Tratamientos:</label>
        <input
          type="text"
          name="tratamientos"
          value={form.tratamientos}
          onChange={handleChange}
          className="border w-full p-2 mb-2"
        />

        <label>Observaciones:</label>
        <textarea
          name="observaciones"
          value={form.observaciones}
          onChange={handleChange}
          className="border w-full p-2 mb-2"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-gray-400 text-white px-3 py-1 rounded"
            onClick={cerrar}
          >
            Cancelar
          </button>

          <button
            className="bg-teal-600 text-white px-3 py-1 rounded"
            onClick={enviar}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
