    package com.example.demo.controller;

    import com.example.demo.model.Mascota;
import com.example.demo.model.RecomendacionAve;
import com.example.demo.model.RecomendacionGato;
import com.example.demo.model.RecomendacionGenerica;
import com.example.demo.model.RecomendacionMascota;
import com.example.demo.model.RecomendacionPerro;

import org.springframework.web.bind.annotation.*;

    import java.util.ArrayList;
    import java.util.List;


    // Controlador REST para gestionar mascotas
    @RestController
    @CrossOrigin(origins = "*")
    @RequestMapping("/mascotas")
    public class MascotaController {


        // Almacenamiento en memoria (simulación de base de datos)
        private List<Mascota> mascotas = new ArrayList<>();
        private int idCounter = 1; // IDs autoincrementales

        // Crear mascota
        @PostMapping
        public Mascota crearMascota(@RequestBody Mascota mascota) {
            mascota.setId(idCounter++); // asignar ID automáticamente
            mascotas.add(mascota);
            return mascota;
        }

        // Listar todas
        @GetMapping
        public List<Mascota> listarMascotas() {
            return mascotas;
        }

        // Obtener una sola por ID
        @GetMapping("/{id}")
        public Mascota obtenerMascota(@PathVariable int id) {
            return mascotas.stream()
                    .filter(m -> m.getId() == id)
                    .findFirst()
                    .orElse(null);
        }

        // Editar
        @PutMapping("/{id}")
        public Mascota editarMascota(@PathVariable int id, @RequestBody Mascota nueva) {
            for (Mascota m : mascotas) {
                if (m.getId() == id) {
                    m.setNombre(nueva.getNombre());
                    m.setEspecie(nueva.getEspecie());
                    m.setRaza(nueva.getRaza());
                    m.setDueno(nueva.getDueno());
                    return m;
                }
            }
            return null;
        }

        // Eliminar
        @DeleteMapping("/{id}")
        public boolean eliminarMascota(@PathVariable int id) {
            return mascotas.removeIf(m -> m.getId() == id);
        }

        @PostMapping("/recomendacion")
public String verRecomendacion(@RequestBody Mascota mascota) {
    RecomendacionMascota recomendacion;

    if (mascota.getEspecie() == null) {
        return "La especie de la mascota es requerida.";
    }

    switch (mascota.getEspecie().toLowerCase()) {
        case "perro":
            recomendacion = new RecomendacionPerro(mascota.getNombre(), mascota.getDueno());
            break;
        case "gato":
            recomendacion = new RecomendacionGato(mascota.getNombre(), mascota.getDueno());
            break;
        case "ave":
            recomendacion = new RecomendacionAve(mascota.getNombre(), mascota.getDueno());
            break;
        default:
            recomendacion = new RecomendacionGenerica(mascota.getNombre(), mascota.getDueno());
            break;
    }

    return recomendacion.generarRecomendacion();
}


    }
