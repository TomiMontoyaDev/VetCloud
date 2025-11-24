import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MascotaDetalle() {
  const { id } = useParams();
  const [mascota, setMascota] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/mascotas/${id}`)
      .then((res) => res.json())
      .then((data) => setMascota(data));
  }, [id]);

  if (!mascota) return <p>Cargando...</p>;

  return (
    <div className="p-8 bg-white rounded-lg shadow-md mt-8 mx-4 md:mx-16 text-center">
      <h1 className="text-3xl font-bold text-teal-600 mb-4">
        Información de {mascota.nombre}
      </h1>

      <p>
        <b>Especie:</b> {mascota.especie}
      </p>
      <p>
        <b>Raza:</b> {mascota.raza}
      </p>
      <p>
        <b>Dueño:</b> {mascota.dueno}
      </p>

      <a
        href="/mascotas"
        className="mt-4 inline-block bg-teal-600 text-white px-4 py-2 rounded-lg"
      >
        Volver
      </a>
    </div>
  );
}
