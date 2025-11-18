import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const login = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert("Error: " + errorText);
        return;
      }

      const data = await res.json(); // si tu backend devuelve JSON
      alert("¡Login exitoso! Token: " + data.token);
      localStorage.setItem("token", data.token); // Guarda el token en localStorage
    } catch (error) {
      alert("Error de conexión: " + error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={login} disabled={!form.email || !form.password}>
        Ingresar
      </button>
    </div>
  );
}
