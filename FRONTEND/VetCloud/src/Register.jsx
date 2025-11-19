import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "CLIENTE",
  });

  const registrar = async () => {
    const res = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const txt = await res.text();
    alert(txt);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md flex flex-col gap-4">
      <h2 className="text-3xl font-bold mb-4 text-center bg-teal-600 text-white p-2 rounded-lg">
        VetCloud Register 🐾
      </h2>
      <input
        type="text"
        className="mb-2 p-2 rounded border border-gray-300"
        placeholder="Nombre"
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      />
      <input
        type="email"
        className="mb-2 p-2 rounded border border-gray-300"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        className="mb-2 p-2 rounded border border-gray-300"
        placeholder="Contraseña"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <select
        className="mb-2 p-2 rounded border border-gray-300"
        value={form.rol}
        onChange={(e) => setForm({ ...form, rol: e.target.value })}
      >
        <option>CLIENTE</option>
        <option>VETERINARIO</option>
      </select>

      <button
        className="bg-teal-600 text-white p-2 rounded-lg"
        onClick={registrar}
      >
        Registrar
      </button>
    </div>
  );
}
