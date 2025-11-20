import { Link } from "react-router-dom";

function Servicios() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8 mb-4 text-teal-600 bg-white p-2 px-4 py-4 rounded-lg shadow-md max-w-3xl mx-auto">
        Servicios
      </h1>
      <p className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md text-center">
        Aquí puedes encontrar información sobre los servicios que ofrecemos en
        VetCloud.
      </p>
      <p className="text-center mb-4 text-teal-600 font-semibold text-lg mt-2">
        Click en el servicio que desees
      </p>

      <div className="max-w-3xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/consultas">
          <div className="border border-gray-300 rounded-lg p-4 hover:shadow-lg hover:bg-teal-100 transition duration-300 ease-in-out">
            <img
              src="https://hospitalveterinario.cr/wp-content/uploads/2018/11/consulta-veterinaria-1.jpg"
              className="d-block w-100 mb-2  rounded-lg h-48 object-cover"
            ></img>
            <h2 className="text-2xl font-semibold mb-2 text-teal-600">
              Consultas Veterinarias
            </h2>
            <p>
              Ofrecemos consultas veterinarias para el cuidado integral de tus
              mascotas.
            </p>
          </div>
        </Link>
        <Link to="/vacunacion">
          <div className="border border-gray-300 rounded-lg p-4 hover:shadow-lg hover:bg-teal-100 transition duration-300 ease-in-out">
            <img
              src="https://i0.wp.com/puppis.blog/wp-content/uploads/2022/04/%C2%BFPor-que-es-importante-que-vacunemos-a-los-cachorros_-min.jpg?resize=900%2C600&ssl=1"
              className="d-block w-100 mb-2  rounded-lg h-48 object-cover"
            ></img>
            <h2 className="text-2xl font-semibold mb-2 text-teal-600">
              Vacunación
            </h2>
            <p>
              Programa de vacunación para proteger a tus mascotas contra
              enfermedades comunes.
            </p>
          </div>
        </Link>
        <Link to="/cirugias">
          <div className="border border-gray-300 rounded-lg p-4 hover:shadow-lg hover:bg-teal-100 transition duration-300 ease-in-out ">
            <img
              src="https://www.shutterstock.com/image-photo/veterinarian-during-dog-surgery-selective-600nw-2502928635.jpg"
              className="d-block w-100 mb-2  rounded-lg h-48 object-cover"
            ></img>
            <h2 className="text-2xl font-semibold mb-2 text-teal-600">
              Cirugías
            </h2>
            <p>
              Realizamos cirugías de rutina y especializadas con el máximo
              cuidado.
            </p>
          </div>
        </Link>
        <Link to="/esterilizacion">
          <div className="border border-gray-300 rounded-lg p-4 hover:shadow-lg hover:bg-teal-100 transition duration-300 ease-in-out ">
            <img
              src="https://saludconlupa.com/media/images/Esterilizaciones.width-1920.jpg"
              className="d-block w-100 mb-2  rounded-lg h-48 object-cover"
            />
            <h2 className="text-2xl font-semibold mb-2 text-teal-600">
              Esterilización
            </h2>
            <p>
              Realizamos esterilización de rutina para el bienestar y salud de
              tus mascotas.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default Servicios;
