function ClienteHome() {
  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-center text-teal-600">
        Bienvenido a tu Panel de Cliente 🐾{" "}
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        Aquí puedes gestionar la información de tus mascotas, agendar citas y
        comunicarte con nuestros veterinarios expertos.
      </p>
      <ul className="list-disc list-inside text-gray-700">
        <li>Ver y actualizar el perfil de tus mascotas.</li>
        <li>Agendar, modificar o cancelar citas veterinarias.</li>
        <li>Acceder a historiales médicos y recomendaciones de cuidado.</li>
        <li>
          Contactar directamente a los vet  erinarios para consultas rápidas.
        </li>
      </ul>
    </div>
  );
}

export default ClienteHome;
