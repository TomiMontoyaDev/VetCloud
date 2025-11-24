import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "CLIENTE",
  });

  const [mensaje, setMensaje] = useState(""); // mensaje de registro
  const [error, setError] = useState(""); // mensaje de error

  const registrar = async () => {
    setMensaje("");
    setError("");

    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const bodyText = await res.text();
      let data;
      try {
        data = JSON.parse(bodyText);
      } catch (e) {
        data = { mensaje: bodyText };
      }

      if (res.ok) {
        setMensaje(data.mensaje || "Registro exitoso");

        // Ocultar mensaje después de 2 segundos
        setTimeout(() => setMensaje(""), 2000);
      } else {
        setError(data.mensaje || "Error al registrar");
        setTimeout(() => setError(""), 2000);
      }
    } catch (err) {
      console.error("Error al registrar:", err);
      setError("Error al registrar, revisa la consola");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md flex flex-col gap-4">
      <h2 className="text-3xl font-bold text-center bg-teal-600 text-white p-3 rounded-lg">
        VetCloud Register 🐾
      </h2>

      {/* Mensajes animados */}
      {mensaje && (
        <div className="transition-opacity duration-500 bg-green-100 text-green-800 p-2 rounded opacity-100">
          {mensaje}
        </div>
      )}
      {error && (
        <div className="transition-opacity duration-500 bg-red-100 text-red-800 p-2 rounded opacity-100">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Nombre"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        className="p-2 rounded border border-gray-300"
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="p-2 rounded border border-gray-300"
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="p-2 rounded border border-gray-300"
      />

      <select
        value={form.rol}
        onChange={(e) => setForm({ ...form, rol: e.target.value })}
        className="p-2 rounded border border-gray-300"
      >
        <option value="CLIENTE">CLIENTE</option>
        <option value="VETERINARIO">VETERINARIO</option>
      </select>

      <button
        type="button"
        onClick={registrar}
        className="bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700"
      >
        Registrar
      </button>
    </div>
  );
}
