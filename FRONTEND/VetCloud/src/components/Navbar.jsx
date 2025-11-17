import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-teal-600 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-3xl">🐾</span>
          <h1 className="text-2xl font-bold tracking-wide">VetCloud</h1>
        </div>

        {/* Links escritorio */}
        <ul className="hidden md:flex gap-8 text-lg">
          <li className="hover:text-gray-200 cursor-pointer">Inicio</li>
          <li className="hover:text-gray-200 cursor-pointer">Servicios</li>
          <li className="hover:text-gray-200 cursor-pointer">Doctores</li>
          <li className="hover:text-gray-200 cursor-pointer">Contacto</li>
        </ul>

        {/* Botón de acción */}
        <button className="hidden md:block bg-white text-teal-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition">
          Agendar cita
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
            <li className="hover:text-gray-300 cursor-pointer">Inicio</li>
            <li className="hover:text-gray-300 cursor-pointer">Servicios</li>
            <li className="hover:text-gray-300 cursor-pointer">Doctores</li>
            <li className="hover:text-gray-300 cursor-pointer">Contacto</li>
          </ul>

          <button className="mt-4 w-full bg-white text-teal-700 py-2 rounded-xl font-semibold hover:bg-gray-100 transition">
            Agendar cita
          </button>
        </div>
      )}
    </nav>
  );
}
