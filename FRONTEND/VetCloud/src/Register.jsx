export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "CLIENTE",
  });

  const registrar = async () => {
    const res = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const txt = await res.text();
    alert(txt);
  };

  return (
    <div>
      <h2>Registro</h2>
      <input
        placeholder="Nombre"
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <select onChange={(e) => setForm({ ...form, rol: e.target.value })}>
        <option>CLIENTE</option>
        <option>VETERINARIO</option>
      </select>

      <button onClick={registrar}>Registrar</button>
    </div>
  );
}
