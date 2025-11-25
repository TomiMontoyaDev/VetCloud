import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./PaginasPrincipales/Home.jsx";
import Login from "./PaginasPrincipales/Login.jsx";
import Register from "./PaginasPrincipales/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import ClienteHome from "./PaginasPrincipales/ClienteHome.jsx";
import VeterinarioHome from "./PaginasPrincipales/VeterinarioHome.jsx";
import Footer from "./components/Footer.jsx";
import Servicios from "./PaginasPrincipales/Servicios.jsx";
import Citas from "./Citas/Citas.jsx";
import Historial from "./Mascota/Historial.jsx";
import GestorCitas from "./Citas/GestorCitas.jsx";
import CrearMascota from "./Mascota/CrearMascota.jsx";
import MascotaHistorial from "./Mascota/Historial.jsx";
import VerMascotas from "./Mascota/Mascotas.jsx";
import ModificarCita from "./Citas/ModificarCita.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clientehome" element={<ClienteHome />} />
        <Route path="/veterinariohome" element={<VeterinarioHome />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/gestorcitas" element={<GestorCitas />} />
        <Route path="/crearmascota" element={<CrearMascota />} />
        <Route path="/vermascotas" element={<VerMascotas />} />
        <Route
          path="/mascotas/historial/:nombreMascota"
          element={<MascotaHistorial />}
        />
        

        <Route path="/modificarcita" element={<ModificarCita />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
