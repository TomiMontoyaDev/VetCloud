import Carousel from "../components/Carrousel";

export default Home;
function Home() {
  return (
    <div>
      <Carousel />
      <div>
        <h2 className="text-3xl font-bold text-center mt-8 mb-4 text-teal-600 bg-white p-2 px-4 py-4 rounded-lg shadow-md max-w-3xl mx-auto">
          Bienvenido a VetCloud 🐾
        </h2>
        <p className="max-w-3xl mx-auto text-center text-lg text-gray-700 px-4 py-2 bg-white rounded-lg">
          En VetCloud, nos dedicamos a brindar el mejor cuidado para tus
          mascotas. Nuestro equipo de veterinarios expertos está aquí para
          ofrecer servicios de salud, bienestar y emergencias las 24 horas del
          día. ¡Tu mascota merece lo mejor, y nosotros estamos aquí para
          proporcionárselo!
        </p>
      </div>
    </div>
  );
}
