import { useState } from "react";

export default function Citas() {
  const [form, setForm] = useState({
    mascota: "",
    servicio: "",
    fecha: "",
    hora: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const agendarCita = async () => {
    setMensaje("");
    setError("");

    if (!form.mascota || !form.servicio || !form.fecha || !form.hora) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/agendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.text(); // para obtener el mensaje de Spring

      if (res.status === 409) {
        setError("⚠️ Esta fecha y hora ya están ocupadas.");
      } else if (res.ok) {
        setMensaje("✅ Cita agendada correctamente.");
      } else {
        setError("Error al agendar la cita: " + data);
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md mt-6 mb-6 max-w-3xl mx-auto ">
      <h1 className="text-4xl font-bold mb-6 text-center text-teal-600">
        Citas Veterinarias
      </h1>

      {error && <p className="text-red-600 text-center">{error}</p>}
      {mensaje && <p className="text-green-600 text-center">{mensaje}</p>}

      <input
        name="mascota"
        type="text"
        placeholder="Nombre de la mascota"
        onChange={handleChange}
        className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
      />

      <input
        name="dueno"
        type="text"
        placeholder="Nombre del dueño"
        onChange={handleChange}
        className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
      />

      <select
        name="servicio"
        onChange={handleChange}
        className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
      >
        <option value="">Selecciona el servicio</option>
        <option value="consulta">Consulta Veterinaria</option>
        <option value="vacunacion">Vacunación</option>
        <option value="cirugia">Cirugía</option>
        <option value="esterilizacion">Esterilización</option>
      </select>

      <select
        name="veterinario"
        onChange={handleChange}
        className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
      >
        <option value="">Selecciona el veterinario</option>
        <option value="Dr Juan Perez">
          Dr Juan Perez (Consultas Veterinarias)
        </option>
        <option value="Dra Maria Gomez">Dra Maria Gomez (Vacunación)</option>
        <option value="Dr Carlos Lopez">Dr Carlos Lopez (Cirugía)</option>
        <option value="Dra Ana Martinez">
          Dra Ana Martinez (Esterilización)
        </option>
      </select>

      <input
        name="fecha"
        type="date"
        onChange={handleChange}
        className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
      />

      <input
        name="hora"
        type="time"
        onChange={handleChange}
        className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
      />

      <button
        onClick={agendarCita}
        className="w-full bg-teal-600 text-white py-2 rounded-md font-semibold hover:bg-teal-700 transition"
      >
        Agendar Cita
      </button>
      <button
        className="w-full bg-teal-600 text-white py-2 rounded-md font-semibold hover:bg-teal-700 transition mt-4"
        onClick={() => window.history.back()}
        type="button"
      >
        Volver
      </button>
    </div>
  );
}
