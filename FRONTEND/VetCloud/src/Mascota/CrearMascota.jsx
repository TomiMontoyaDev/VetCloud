import { useState } from "react";

export default function CrearMascota() {
  const [form, setForm] = useState({
    nombre: "",
    especie: "",
    raza: "",
    dueno: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const crearMascota = async () => {
    setMensaje("");

    // Validación manual
    if (!form.nombre || !form.especie || !form.raza || !form.dueno) {
      setMensaje("⚠ Debes llenar todos los campos");
      return;
    }

    const res = await fetch("http://localhost:8080/mascotas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) setMensaje("Mascota creada ✅");
  };

  return (
    <div className="p-8 text-center bg-white rounded-lg shadow-md mt-8 mx-4 md:mx-16">
      <h1 className=" text-4xl font-bold mb-4 text-teal-600">Crear Mascota</h1>

      <input
        className="mb-4 block mx-auto p-2 border border-gray-300 rounded-lg w-1/2"
        name="nombre"
        placeholder="Nombre"
        type="text"
        onChange={handleChange}
      />

      <select
        name="especie"
        className="mb-4 block mx-auto p-2 border border-gray-300 rounded-lg w-1/2"
        onChange={handleChange}
      >
        <option value="">Selecciona una especie</option>
        <option value="perro">Perro</option>
        <option value="gato">Gato</option>
        <option value="ave">Ave</option>
        <option value="otro">Otro</option>
      </select>

      <input
        className="mb-4 block mx-auto p-2 border border-gray-300 rounded-lg w-1/2"
        name="raza"
        placeholder="Raza"
        onChange={handleChange}
      />

      <input
        className="mb-4 block mx-auto p-2 border border-gray-300 rounded-lg w-1/2"
        name="dueno"
        placeholder="Dueño"
        onChange={handleChange}
      />

      <button
        className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
        onClick={crearMascota}
        type="button"
      >
        Crear Mascota
      </button>

      <button
        className="mt-4 ml-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        onClick={() => window.history.back()}
        type="button"
      >
        Volver
      </button>

      {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
    </div>
  );
}
