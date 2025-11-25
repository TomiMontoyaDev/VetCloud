package com.example.demo.controller;

import com.example.demo.model.Historial;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


// Controlador para gestionar citas y historiales médicos
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CitaController {

    // Almacena las citas y los historiales médicos en memoria
    private List<Map<String, String>> citas = new ArrayList<>();
    private List<Historial> historiales = new ArrayList<>();
    private int contadorId = 1;


    // Endpoint para agendar una cita
    @PostMapping("/agendar")
public ResponseEntity<Map<String, String>> agendar(@RequestBody Map<String, String> cita) {

    String fecha = cita.get("fecha");
    String hora = cita.get("hora");

    // Validar si ya existe una cita con la misma fecha y hora
    for (Map<String, String> c : citas) {
        if (c.get("fecha").equals(fecha) && c.get("hora").equals(hora)) {
            return ResponseEntity.status(409)
                    .body(Map.of("mensaje", "⚠️ Esta fecha y hora ya están ocupadas"));
        }
    }

    // Si no está ocupada, se asigna ID y se guarda
    String id = String.valueOf(contadorId++);
    cita.put("id", id);
    citas.add(cita);

    historiales.add(new Historial(
            cita.getOrDefault("servicio", "Consulta"),
            cita.getOrDefault("veterinario", "sin agendar"),
            cita.getOrDefault("mascota", "Sin nombre"),
            cita.getOrDefault("peso", "N/A"),
            cita.getOrDefault("vacunas", "No registradas"),
            cita.getOrDefault("tratamientos", "No registrados"),
            cita.getOrDefault("observaciones", "Sin observaciones"),
            fecha,
            hora,
            id,
            cita.getOrDefault("dueno", "Sin dueño")
    ));

    return ResponseEntity.ok(Map.of("mensaje", "✅ Cita agendada con éxito", "id", id));
}

    // Listar todas las citas y los historiales médicos
    @GetMapping("/historial")
    public List<Historial> obtenerHistorial() {
        return historiales;
    }

    @DeleteMapping("/eliminar/{id}")
public ResponseEntity<String> eliminarCita(@PathVariable String id) {
    boolean removedCita = citas.removeIf(c -> c.get("id").equals(id));
    boolean removedHistorial = historiales.removeIf(h -> h.getId().equals(id));

    if (removedCita || removedHistorial) {
        return ResponseEntity.ok("Cita eliminada");
    } else {
        return ResponseEntity.status(404).body("Cita no encontrada");
    }
}

@PutMapping("/modificar/{id}")
public ResponseEntity<String> modificarCita(@PathVariable String id, @RequestBody Map<String, String> datos) {

    for (Map<String, String> c : citas) {
        if (c.get("id").equals(id)) {

            // Validar si la nueva fecha y hora ya está ocupada por otra cita
            String nuevaFecha = datos.get("fecha");
            String nuevaHora = datos.get("hora");
            for (Map<String, String> otra : citas) {
                if (!otra.get("id").equals(id) &&
                    otra.get("fecha").equals(nuevaFecha) &&
                    otra.get("hora").equals(nuevaHora)) {
                    return ResponseEntity.status(409).body("⚠️ Fecha y hora ya ocupadas");
                }
            }

            // Actualizar datos de la cita
            c.putAll(datos);

            // Actualizar también en historial
            for (Historial h : historiales) {
                if (h.getId().equals(id)) {
                    h.setMascota(datos.getOrDefault("mascota", h.getMascota()));
                    h.setServicio(datos.getOrDefault("servicio", h.getServicio()));
                    h.setFecha(datos.getOrDefault("fecha", h.getFecha()));
                    h.setHora(datos.getOrDefault("hora", h.getHora()));
                    h.setVeterinario(datos.getOrDefault("veterinario", h.getVeterinario()));
                    h.setPeso(datos.getOrDefault("peso", h.getPeso()));
                    h.setVacunas(datos.getOrDefault("vacunas", h.getVacunas()));
                    h.setTratamientos(datos.getOrDefault("tratamientos", h.getTratamientos()));
                    h.setObservaciones(datos.getOrDefault("observaciones", h.getObservaciones()));
                    h.setDueno(datos.getOrDefault("dueno", h.getDueno()));
                    break;
                }
            }

            return ResponseEntity.ok("✅ Cita modificada correctamente");
        }
    }

    return ResponseEntity.status(404).body("Cita no encontrada");
}

 // Actualizar solo los datos clínicos de un historial médico
@PutMapping("/historial/actualizar/{id}")
public ResponseEntity<String> actualizarHistorial(@PathVariable String id, @RequestBody Map<String, String> datos) {

    for (Historial h : historiales) {
        if (h.getId().equals(id)) {

            // Actualiza únicamente los datos clínicos
            h.setPeso(datos.getOrDefault("peso", h.getPeso()));
            h.setVacunas(datos.getOrDefault("vacunas", h.getVacunas()));
            h.setTratamientos(datos.getOrDefault("tratamientos", h.getTratamientos()));
            h.setObservaciones(datos.getOrDefault("observaciones", h.getObservaciones()));

            return ResponseEntity.ok("✅ Historial clínico actualizado");
        }
    }

    return ResponseEntity.status(404).body("❌ No se encontró el historial con ese ID");
}

// Actualizar el estado de una cita
    @PostMapping("/estado")
    public ResponseEntity<String> actualizarEstado(@RequestBody Map<String, String> data) {

        String id = data.get("id");
        String estado = data.get("estado");

        for (Historial h : historiales) {
            if (h.getId().equals(id)) {
                h.setEstado(estado);
                return ResponseEntity.ok("Estado actualizado");
            }
        }

        return ResponseEntity.status(404).body("No existe la cita");
    }

    // Obtener historial médico de una mascota por su nombre
    @GetMapping("/historial/mascota/{nombre}")
public List<Historial> obtenerHistorialDeMascota(@PathVariable String nombre) {
    List<Historial> resultado = new ArrayList<>();

    for (Historial h : historiales) {
        if (h.getMascota().equalsIgnoreCase(nombre)) {
            resultado.add(h);
        }
    }

    return resultado;
}

// Eliminar un historial médico por ID
@DeleteMapping("/eliminar/historial/{id}")
public ResponseEntity<String> eliminarHistorial(@PathVariable String id) {
    boolean removedCita = citas.removeIf(c -> c.get("id").equals(id));
    boolean removedHistorial = historiales.removeIf(h -> h.getId().equals(id));

    if (removedCita || removedHistorial) {
        return ResponseEntity.ok("Historial eliminado");
    } else {
        return ResponseEntity.status(404).body("Historial no encontrado");
    }
}

// Agregar un nuevo historial médico
@PostMapping("/historialmedico/agregar")
public ResponseEntity<Map<String, String>> agregarHistorial(@RequestBody Map<String, String> datos) {
    String id = String.valueOf(contadorId++); // Generar ID único

    Historial h = new Historial(
        datos.getOrDefault("servicio", "Consulta"),
        datos.getOrDefault("veterinario", "Sin asignar"),
        datos.getOrDefault("mascota", "Sin nombre"),
        datos.getOrDefault("peso", "N/A"),
        datos.getOrDefault("vacunas", "No registradas"),
        datos.getOrDefault("tratamientos", "No registrados"),
        datos.getOrDefault("observaciones", "Sin observaciones"),
        datos.getOrDefault("fecha", "N/A"),
        datos.getOrDefault("hora", "N/A"),
        id,
        datos.getOrDefault("dueno", "Sin dueño")
    );

    historiales.add(h);

    return ResponseEntity.ok(Map.of("mensaje", "✅ Historial agregado correctamente", "id", id));
}

    
}
