import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Navbar from "./components/navbar.jsx";
import ClienteHome from "./ClienteHome.jsx";
import VeterinarioHome from "./VeterinarioHome.jsx";
import Footer from "./components/Footer.jsx";
import Servicios from "./Servicios.jsx";
import Citas from "./Citas.jsx";
import Historial from "./Historial.jsx";
import GestorCitas from "./GestorCitas.jsx";

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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
