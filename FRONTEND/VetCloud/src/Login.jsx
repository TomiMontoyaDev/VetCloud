import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const bodyText = await res.text();

      let data;
      try {
        data = JSON.parse(bodyText);
      } catch (e) {
        data = { message: bodyText };
      }

      // Si el login falló (rol null)
      if (!data.rol) {
        alert(data.message || "Credenciales inválidas");
        return;
      }

      // Login exitoso
      alert(data.message || "Login exitoso");
      localStorage.setItem("usuario", JSON.stringify(data));

      if (data.rol === "CLIENTE") {
        navigate("/clientehome");

        // Redirección según rol
      } else if (data.rol === "VETERINARIO") {
        navigate("/veterinariohome");
      }
    } catch (error) {
      alert("Error de conexión: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-4 text-center bg-teal-600 text-white p-2 rounded-lg ">
        VetCloud Login🐾
      </h1>

      <input
        className="mb-2 p-2 rounded border border-gray-300"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="mb-2 p-2 rounded border border-gray-300"
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button
        className="bg-teal-600 text-white p-2 rounded"
        onClick={login}
        disabled={!form.email || !form.password}
      >
        Ingresar
      </button>

      <div className="text-center mt-4">
        <a
          onClick={() => navigate("/register")}
          className="text-teal-600 hover:underline cursor-pointer"
        >
          ¿No tienes una cuenta? Regístrate
        </a>
      </div>
    </div>
  );
}
