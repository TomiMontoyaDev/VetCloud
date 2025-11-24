import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-teal-600 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-3xl">🐾</span>
          <h1
            className="text-2xl font-bold tracking-wide cursor-pointer hover:text-gray-300 transition"
            onClick={() => navigate("/")}
          >
            VetCloud
          </h1>
        </div>

        {/* Botón de acción */}

        <button
          className="hidden md:block ml-auto bg-white text-teal-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
          onClick={() => navigate("/citas")}
        >
          Agendar cita
        </button>

        <button
          className="hidden md:block ml-4 bg-white text-teal-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
          onClick={() => navigate("/login")}
        >
          Iniciar Sesión
        </button>

        {/* Botón móvil */}
        <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden mt-4 bg-teal-700 rounded-lg p-4">
          <ul className="flex flex-col gap-4 text-lg">
            <li
              className="hover:text-gray-300 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Inicio
            </li>
          </ul>

          <button className="mt-4 w-full bg-white text-teal-700 py-2 rounded-xl font-semibold hover:bg-gray-100 transition">
            Agendar cita
          </button>

          <button
            className="mt-4 w-full bg-white text-teal-700 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </button>
        </div>
      )}
    </nav>
  );
}
