import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    setMensaje("");
    setError("");

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const bodyText = await res.text();
      let data;
      try {
        data = JSON.parse(bodyText);
      } catch {
        data = { message: bodyText };
      }

      // Login fallido
      if (!data.rol) {
        setError(data.message || "Credenciales inválidas");
        setTimeout(() => setError(""), 2000);
        return;
      }

      // Login exitoso
      setMensaje(data.message || "Login exitoso");

      localStorage.setItem("usuario", JSON.stringify(data));

      // Redirección inmediata según rol
      console.log("ROL RECIBIDO:", data.rol, typeof data.rol);

      if (data.rol === "CLIENTE") navigate("/clientehome");
      else if (data.rol === "VETERINARIO") navigate("/veterinariohome");
    } catch (err) {
      console.error("Error de conexión:", err);
      setError("Error de conexión, revisa la consola");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-4 text-center bg-teal-600 text-white p-2 rounded-lg">
        VetCloud Login 🐾
      </h1>

      {mensaje && (
        <div className="transition-opacity duration-500 bg-green-100 text-green-800 p-2 rounded">
          {mensaje}
        </div>
      )}
      {error && (
        <div className="transition-opacity duration-500 bg-red-100 text-red-800 p-2 rounded">
          {error}
        </div>
      )}

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
        className="bg-teal-600 text-white p-2 rounded hover:bg-teal-700"
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
